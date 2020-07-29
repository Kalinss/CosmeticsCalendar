import {settingType} from "../types";
import {openDB} from "idb";
import {SETTING, DBNAME, VERSION} from "./config";

export class SettingDB{
    static _dbPromise:any;

    static open() {
        return (this._dbPromise = openDB(DBNAME, VERSION, {
            upgrade(db) {
                db.createObjectStore(SETTING);
            },
        }));
    }

    static async get(key: string) {
        return (await this._dbPromise).get(SETTING, key);
    }

    static async set(key: string, val: settingType) {
        return (await this._dbPromise).put(SETTING, val, key);
    }

    static async delete(key: string) {
        return (await this._dbPromise).delete(SETTING, key);
    }

    static async keys() {
        return (await this._dbPromise).getAllKeys(SETTING);
    }

    static async getAll() {
        return (await this._dbPromise).getAll(SETTING);
    }

    static async db() {
        return this._dbPromise;
    }
}