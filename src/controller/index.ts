import { expendedItemType, itemCosmeticPrimaryType } from "types";
import { deepClone, toPrimitiveType } from "../utils/other";
import { CosmeticItemsModelDB, TaskDB, SettingDB } from "../database";
import stores from "../stores/store";
import { openDB } from "idb";
import { taskDBType } from "types";
import { dateСomparison } from "../utils/dates";
import moment from "moment";
import { urlFormatDate } from "../utils/dates";
import { addTaskOnDayMock } from "../utils/mocks/addTaskOnDay";
import { taskObjectDB } from "types";
import {
  TASKKEY,
  SETTING,
  DBNAME,
  TASK,
  COSMETIC_ITEMS,
  VERSION,
} from "../database/config";
import { Button } from "semantic-ui-react";
import React from "react";

export const updateTaskAfterUpdateItem = async (
  object: itemCosmeticPrimaryType
) => {
  const items = await TaskDB.getAll();
  const newItems = items.map((item: taskDBType) => {
    if (
      !dateСomparison(item.date, object.date as Date, object.timingDelay.value)
    ) {
      return {
        task: [...item.task.filter((x: any) => x.name !== object.name)],
        date: item.date,
      };
    } else {
      const exist = item.task.find((x) => x.name === object.name);
      if (exist) {
        return {
          task: [...item.task],
          date: item.date,
        };
      }
      return {
        task: [
          ...item.task,
          { ...object, closed: { day: false, evening: false } },
        ],
        date: item.date,
      };
    }
  });

  const promises = await Promise.all(
    newItems.map((item: taskDBType) => {
      const key = moment(item.date).format(TASKKEY);
      return TaskDB.update(key, deepClone(item)).then((x) => x);
    })
  );
  return promises;
};

export const updateTaskAfterDeleteItem = async (
  object: itemCosmeticPrimaryType
) => {
  const createDateItem = moment(object.date).format(TASKKEY);
  const items = await TaskDB.getAll();

  const needed = items.map((item: taskDBType) => {
    return {
      task: item.task.filter((itemTask) => itemTask.name !== object.name),
      date: item.date,
    };
  });
  const promises = await Promise.all(
    needed.map((item: taskDBType) => {
      const key = moment(item.date).format(TASKKEY);
      return TaskDB.update(key, deepClone(item)).then((x) => x);
    })
  );
  return promises;
};

export const updateTaskAfterNewItem = async () => {
  const items = await TaskDB.getAll();
  const newItem = toPrimitiveType(
    stores.ItemsCosmetic.currentItem as expendedItemType
  );
  const itemsNeeded = items.filter((item: taskDBType) =>
    dateСomparison(item.date, newItem.date as Date, newItem.timingDelay.value)
  );
  const updatePromises = await Promise.all(
    itemsNeeded.map((item: taskDBType) => {
      const newObject: taskDBType = { ...item };
      const key = moment(item.date).format(TASKKEY);
      newObject.task.push({
        ...newItem,
        closed: { day: false, evening: false },
      });
      return TaskDB.update(key, deepClone(newObject)).then((x) => x);
    })
  );
  return updatePromises;
};

export const saveInDBNewItemCosmetic = async (object: expendedItemType) => {
  const formDBObject = toPrimitiveType(object);
  const result = await CosmeticItemsModelDB.set(
    formDBObject.name.trim(),
    deepClone(formDBObject)
  );
};

export const toggleSettingField = async (key: string) => {
  stores.Setting.toggleValueItem(key);
  const item = await SettingDB.get(key);

  return SettingDB.set(key, { ...item, value: !item.value });
};

export const uploadSetting = async () => {
  // upload new setting in DB
  const storesSetting = stores.Setting.config;
  const SettingDBItems = await SettingDB.getAll()
    .then((x) => x)
    .catch(console.log);
  const saveValueInStore = () => {
    stores.Setting.setConfig([...SettingDBItems]);
  };
  if (SettingDBItems < storesSetting || !SettingDBItems) {
    // If there are new ones then reset
    const promise = await Promise.all(
      storesSetting.map((item) => SettingDB.set(item.key, deepClone(item)))
    );
    saveValueInStore();
    return;
  }
  return saveValueInStore();
};

export const createCollections = async () => {
  // Create database for the first boot
  const create = await openDB(DBNAME, VERSION, {
    upgrade(db) {
      db.createObjectStore(TASK);
      db.createObjectStore(COSMETIC_ITEMS);
      db.createObjectStore(SETTING);
    },
  });
  return create;
};

export const openCollections = async () => {
  // Open databases in a closure DB
  const create = await TaskDB.open()
    .then(() => CosmeticItemsModelDB.open())
    .then(() => SettingDB.open());
  return create;
};

export const deleteItemCosmetic = async (data: itemCosmeticPrimaryType) => {
  return await CosmeticItemsModelDB.delete(data.name.trim())
    .then(() => updateTaskAfterDeleteItem(data))
    .then(() => stores!.ItemsCosmetic.deleteItem(data.name));
};

export const updateTask = async (
  key: string,
  data: itemCosmeticPrimaryType
) => {
  const result = await CosmeticItemsModelDB.delete(key).then(() =>
    CosmeticItemsModelDB.set(key, deepClone(data))
  );
  return result;
};

export const cleaningOldTask = async () => {
  const setting = await SettingDB.get("clearOldTask");
  if (!setting.value) return;
  const allTask = await TaskDB.getAll().then((x) => x);
  if (!allTask) return;
  const nowDate = moment(new Date());
  const neededTask = allTask.filter(
    (item: taskDBType) => nowDate.diff(moment(item.date), "days") > 30
  );
  if (!neededTask) return;
  const needKeys = neededTask.map((item: taskDBType) =>
    moment(item.date).format(TASKKEY)
  );
  if (!needKeys) return;
  return Promise.all(
    needKeys.map((item: string) => TaskDB.delete(item).then((x) => x))
  );
};

export const onloadTaskForDate = async (keyData: string) => {
  //  DD.MM.YYYY format
  const key = urlFormatDate(keyData) ? moment(keyData, "L") : moment(new Date());

  return await TaskDB.get(key.format("YYYYMMDD")).then((item) => {
    if (!item) {
      // if task not found => create task and save him in BD
      const itemsCosmetic = stores!.ItemsCosmetic.items;

      if (!itemsCosmetic) return false;

      const desiredDate = key.toDate();

      const arr = stores!.ItemsCosmetic.items.filter((item: any) => {
        return dateСomparison(desiredDate, item.date, item.timingDelay.value);
      });

      TaskDB.set(key.format("YYYYMMDD"), {
        task: arr.map((item: itemCosmeticPrimaryType) =>
          deepClone({
            ...item,
            closed: { day: false, evening: false },
          })
        ),
        date: desiredDate,
      });

      stores!.Task.setState({
        task: arr.map((item: itemCosmeticPrimaryType) => ({
          ...item,
          closed: { day: false, evening: false },
        })),
        date: desiredDate,
      });
    } else {
      stores!.Task.setState({
        task: [...item.task],
        date: item.date,
      });
    }
  });
};

export const addTask = async (
  key: string,
  {
    valueName,
    valueDayOrEvening,
    date,
  }: { valueName: string; valueDayOrEvening: number; date: Date }
) => {
  return TaskDB.get(key)
    .then((items) => {
      const newCollection = items;
      const newItem = deepClone(addTaskOnDayMock);

      newCollection.task.push({
        ...newItem,
        name: valueName,
        dayOrEvening: {
          value: valueDayOrEvening,
          text: "",
        },
        date: date,
      });

      return newCollection;
    })
    .then((data) => {
      const momentDate = moment(date);
      const item = data.task.find(
        (item: taskObjectDB) => item.name === valueName
      );
      return TaskDB.delete(momentDate.format(TASKKEY))
        .then(() => TaskDB.set(momentDate.format(TASKKEY), data))
        .then(() => {
          stores!.Task.taskState!.task.push(item);
        });
    });
};
