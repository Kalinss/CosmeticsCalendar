import { openDB } from "idb";
import { VERSION, COSMETIC_ITEMS, DBNAME } from "./config";
import {itemCosmeticPrimaryType} from "~/types";
import {string} from "mobx-state-tree/dist/types/primitives";

export class CosmeticItemsModelDB {
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
  date:Date;
  // todo any db
  static _dbPromise: any;

  constructor({
    name,
    description = "",
    timingDelay,
    dayOrEvening,
    type,
  }: itemCosmeticPrimaryType) {
    this.name = name;
    this.description = description;
    this.timingDelay = timingDelay;
    this.dayOrEvening = dayOrEvening;
    this.type = type;
    this.date = new Date();
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
