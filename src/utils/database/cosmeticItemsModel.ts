import { openDB } from "idb";
import { VERSION, COSMETIC_ITEMS, DBNAME } from "./config";

export interface CosmeticItemConstructor {
  name:string;
  description?: string;
  timingDelay: number;
  dayOrEvening: {
    value: number;
    text: string;
  };
  type: {
    value: number;
    text: string;
  };
}

export class CosmeticItemsModel {
  description?: string;
  timingDelay: number;
  name:string;
  dayOrEvening: {
    value: number;
    text: string;
  };
  type: {
    value: number;
    text: string;
  };
  timeCreate: Date;
  // todo any db
  static _dbPromise: any;

  constructor({
    name,
    description = "",
    timingDelay,
    dayOrEvening,
    type,
  }: CosmeticItemConstructor) {
    this.name = name;
    this.description = description;
    this.timingDelay = timingDelay;
    this.dayOrEvening = dayOrEvening;
    this.type = type;
    this.timeCreate = new Date();
  }

  static open() {
    return (this._dbPromise = openDB(DBNAME, VERSION, {
      upgrade(db) {
        db.createObjectStore(COSMETIC_ITEMS);
      },
    }));
  }

  static async get(key: string) {
    return (await this._dbPromise).get(COSMETIC_ITEMS, key);
  }

  static async set(key: string, val: any) {
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
