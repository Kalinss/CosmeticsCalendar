import { expendedItemType, itemCosmeticPrimaryType } from "types";
import { deepClone, toPrimitiveType } from "../utils/other";
import { CosmeticItemsModelDB,TaskDB,SettingDB } from "../database";
import stores from "./../stores/store";
import { openDB } from "idb";
import { taskDBType } from "types";
import {  dateСomparison } from "../utils/dates";
import moment from "moment";

import {
  TASKKEY,
  SETTING,
  DBNAME,
  TASK,
  COSMETIC_ITEMS,
  VERSION,
} from "../database/config";

export const updateTaskAfterUpdateItem = async (
  object: itemCosmeticPrimaryType
) => {
  const createDateItem = moment(object.date).format(TASKKEY);
  const items = await TaskDB.getAll();
  let closedObject: { day: boolean; evening: boolean };

  const itemsNeeded: taskDBType[] = items.filter((item: taskDBType) =>
    dateСomparison(item.date, object.date as Date, object.timingDelay.value)
  );

  const newItems = itemsNeeded.map((item: taskDBType) => {
    return {
      task: [
        ...item.task.map((task) =>
          object.name === task.name ? { ...object, closed: task.closed } : task
        ),
      ],
      date: item.date,
    };
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
  const SettingDBItems = await SettingDB
    .getAll()
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
