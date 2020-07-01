import { openDB } from "idb";
import { VERSION, COSMETIC_ITEMS, DBNAME } from "./config";

interface CosmeticItemConstructor {
  name: string;
  description?: string;
  instruction?: string;
  timingDelay: number;
  morning: boolean;
}

export class CosmeticItemsModel {
  name: string;
  description: string;
  instruction: string;
  timingDelay: number;
  morning: boolean;
  // todo any db
  static _dbPromise: any;

  constructor({
    name,
    description = "",
    instruction = "",
    timingDelay,
    morning,
  }: CosmeticItemConstructor) {
    this.name = name;
    this.description = description;
    this.instruction = instruction;
    this.timingDelay = timingDelay;
    this.morning = morning;
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
