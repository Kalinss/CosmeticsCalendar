import { settingType } from "../types";
import { openDB, DBSchema } from "idb";
import { SETTING, DBNAME, VERSION, ADDITIONAL } from "./config";

interface IAdditionalDB extends DBSchema {
  "additional": {
    key: string;
    value: string;
  };
}

export class AdditionalDB {
  static _dbPromise: any;

  static open() {
    return (this._dbPromise = openDB<IAdditionalDB>(DBNAME, VERSION, {
      upgrade(db) {
        db.createObjectStore(ADDITIONAL as 'additional');
      },
    }));
  }

  static async get(key: string) {
    return (await this._dbPromise).get(ADDITIONAL, key);
  }

  static async set(key: string, val: string) {
    return (await this._dbPromise).put(ADDITIONAL, val, key);
  }

  static async delete(key: string) {
    return (await this._dbPromise).delete(ADDITIONAL, key);
  }

  static async keys() {
    return (await this._dbPromise).getAllKeys(ADDITIONAL);
  }

  static async getAll() {
    return (await this._dbPromise).getAll(ADDITIONAL);
  }

  static async db() {
    return this._dbPromise;
  }
}
