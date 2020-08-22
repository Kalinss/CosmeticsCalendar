import { taskObjectDB } from "types";
import { IDBPDatabase, openDB } from "idb";
import { DBNAME, TASK, VERSION } from "./config";

export type ITaskDBValue = {
  task: taskObjectDB[];
  date: Date;
};
export type ITaskDB = {
  key: string;
  value: ITaskDBValue;
};

export class TaskDB {
  static _dbPromise: Promise<IDBPDatabase<ITaskDB>>;

  static open() {
    return (this._dbPromise = openDB<ITaskDB>(DBNAME, VERSION, {
      upgrade(db) {
        db.createObjectStore(TASK);
      },
    }));
  }

  static async get(key: string) {
    return (await this._dbPromise).get(TASK, key);
  }

  // key - moment.format('YYYYMMDD')
  static async set(key: string, val: { task: taskObjectDB[]; date: Date }) {
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

  static async update(key: string, val: { task: taskObjectDB[]; date: Date }) {
    return await this.delete(key)
      .then(() => {
        return this.set(key, { ...val });
      })
      .catch(console.log) // todo error handler
      .then((x) => x);
  }

  static async db() {
    return this._dbPromise;
  }
}
