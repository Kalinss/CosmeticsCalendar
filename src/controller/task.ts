import {
  expendedItemType,
  itemCosmeticPrimaryType,
  taskDBType,
  taskObjectDB,
} from "types";
import moment from "moment";
import { CosmeticItemsModelDB, SettingDB, TaskDB, TASKKEY } from "../database";
import { deepClone, toPrimitiveCosmeticItemType } from "../utils/other";
import stores from "../stores/store";
import { compareDateAfterNDays, isNeededUrlFormatDate } from "../utils/dates";
import { addTaskOnDayMock } from "../utils/mocks/addTaskOnDay";

export const updateTaskAfterUpdateItem = async (
  object: itemCosmeticPrimaryType
) => {
  const items = await TaskDB.getAll();
  stores.ItemsCosmetic.editItem();
  const newItems = items.map((item: taskDBType) => {
    if (
      !compareDateAfterNDays(
        item.date,
        object.date as Date,
        object.timingDelay.value
      )
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

  return await Promise.all(
    newItems.map((item: taskDBType) => {
      const key = moment(item.date).format(TASKKEY);
      return TaskDB.update(key, deepClone(item)).then((x) => x);
    })
  );
};

export const updateTaskAfterDeleteItem = async (
  object: itemCosmeticPrimaryType
) => {
  const items = await TaskDB.getAll();

  const needed = items.map((item: taskDBType) => {
    return {
      task: item.task.filter((itemTask) => itemTask.name !== object.name),
      date: item.date,
    };
  });
  return await Promise.all(
    needed.map((item: taskDBType) => {
      const key = moment(item.date).format(TASKKEY);
      return TaskDB.update(key, deepClone(item)).then((x) => x);
    })
  );
};

export const updateTaskAfterNewItem = async () => {
  const items = await TaskDB.getAll();
  const newItem = toPrimitiveCosmeticItemType(
    stores.ItemsCosmetic.currentItem as expendedItemType
  );
  const itemsNeeded = items.filter((item: taskDBType) =>
    compareDateAfterNDays(
      item.date,
      newItem.date as Date,
      newItem.timingDelay.value
    )
  );
  stores.ItemsCosmetic.saveItem();
  return await Promise.all(
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
};

export const updateTask = async (
  key: string,
  data: itemCosmeticPrimaryType
) => {
  return await CosmeticItemsModelDB.delete(key).then(() =>
    CosmeticItemsModelDB.set(key, deepClone(data))
  );
};

export const cleaningOldTask = async () => {
  const setting = await SettingDB.get("clearOldTask");
  if (setting && !setting.value) return;
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
  const key = isNeededUrlFormatDate(keyData)
    ? moment(keyData, "L")
    : moment(new Date());

  return await TaskDB.get(key.format("YYYYMMDD")).then((item) => {
    if (!item) {
      // if task not found => create task and save him in BD
      const itemsCosmetic = stores!.ItemsCosmetic.items;

      if (!itemsCosmetic) return false;

      const desiredDate = key.toDate();

      const arr = stores!.ItemsCosmetic.items.filter((item: any) => {
        return compareDateAfterNDays(
          desiredDate,
          item.date,
          item.timingDelay.value
        );
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
