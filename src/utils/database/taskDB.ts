import { taskObjectDB, taskDB, itemCosmeticPrimaryType } from "types";
import { openDB } from "idb";
import { VERSION, TASK, DBNAME, COSMETIC_ITEMS } from "./config";
import { string } from "mobx-state-tree/dist/types/primitives";

export class TaskDB {
  task: taskObjectDB[];
  date: Date;
  // todo any db
  static _dbPromise: any;

  constructor(props: taskDB) {
    this.task = props.task;
    this.date = props.date;
  }

  static open() {
    return (this._dbPromise = openDB(DBNAME, VERSION, {
      upgrade(db) {
        db.createObjectStore(TASK);
      },
    }));
  }

  static async get(key: string) {
    return (await this._dbPromise).get(TASK, key);
  }

  // key - moment.format('YYYYMMDD')
  static async set(key: string, val: {task:taskObjectDB[],date:Date}) {
    return (await this._dbPromise).put(TASK, val, key);
  }

  static async delete(key: string) {
    return (await this._dbPromise).delete(TASK, key);
  }

  static async keys() {
    return (await this._dbPromise).getAllKeys(TASK);
  }

  static async getAll() {
    return (await this._dbPromise).getAll(TASK);
  }

  static async db() {
    return this._dbPromise;
  }
}
