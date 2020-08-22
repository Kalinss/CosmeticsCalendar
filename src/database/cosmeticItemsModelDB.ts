import { IDBPDatabase, openDB } from "idb";
import { COSMETIC_ITEMS, DBNAME, VERSION } from "./config";
import { itemCosmeticPrimaryType } from "types";

export type ICosmeticDB = {
  key: string;
  value: {
    name: string;
    description?: string;
    timingDelay: {
      value: number;
      text: string;
    };
    dayOrEvening: {
      value: number;
      text: string;
    };
    type?: {
      value: number;
      text: string;
    };
    date: Date;
  };
};

export class CosmeticItemsModelDB {
  static _dbPromise: Promise<IDBPDatabase<ICosmeticDB>>;

  static open() {
    return (this._dbPromise = openDB<ICosmeticDB>(DBNAME, VERSION, {
      upgrade(db) {
        db.createObjectStore(COSMETIC_ITEMS);
      },
    }));
  }

  static async get(key: string) {
    return (await this._dbPromise).get(COSMETIC_ITEMS, key);
  }

  static async set(key: string, val: itemCosmeticPrimaryType) {
    return (await this._dbPromise).put(COSMETIC_ITEMS, val, key);
  }

  static async delete(key: string) {
    return (await this._dbPromise).delete(COSMETIC_ITEMS, key);
  }

  static async keys() {
    return (await this._dbPromise).getAllKeys(COSMETIC_ITEMS);
  }

  static async getAll() {
    return (await this._dbPromise).getAll(COSMETIC_ITEMS);
  }

  static async db() {
    return this._dbPromise;
  }
}
