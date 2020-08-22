import {
  AdditionalDB,
  COSMETIC_ITEMS,
  CosmeticItemsModelDB,
  DBNAME,
  SETTING,
  SettingDB,
  TASK,
  TaskDB,
  VERSION,
} from "../database";
import { openDB } from "idb";
import { ADDITIONAL } from "../database/config";
import stores from "../stores/store";

export const closeUpdateAlert = async () => {
  if (AdditionalDB) {
    AdditionalDB.set("alertUpdate", "false");
    stores.Additional.setAlert("false");
  }
}

export const createCollections = async () => {
  // Create database for the first boot
  const createDB = (db: any, name: string) => {
    const names = db.objectStoreNames;
    const isExist = Array.prototype.some.call(
      names,
      (item: string) => item === name
    );
    if (!isExist) {
      db.createObjectStore(name);
    }
  };
  return await openDB(DBNAME, VERSION, {
    upgrade(db) {
      createDB(db, TASK);
      createDB(db, COSMETIC_ITEMS);
      createDB(db, SETTING);
      createDB(db, ADDITIONAL);
    },
  });
};
export const openCollections = async () => {
  // Open databases in a closure DB
  const create = await TaskDB.open()
    .then(() => CosmeticItemsModelDB.open())
    .then(() => SettingDB.open())
    .then(() => AdditionalDB.open());
  return create;
};
