import stores from "../stores/store";
import { SettingDB } from "../database";
import { settingType } from "types";
import { deepClone } from "../utils/other";
import { matchAmountProperty } from "../utils/other";

export const toggleSettingValueField = async (key: string) => {
  return stores.Setting.toggleValueFieldByKey(key)
    .then((_) => SettingDB.get(key))
    .then((item) => {
      item && SettingDB.set(key, { ...item, value: !item.value });
    });
};

export const uploadSetting = async () => {
  // upload new setting in DB
  const storesSetting = stores.Setting.config;
  const dbSetting = await SettingDB.getAll()
    .then((x) => x)
    .catch(console.log); // todo error processing

  const saveValueInStore = () => stores.Setting.setConfig([...dbSetting]);

  const isEqualAmountSetting = dbSetting
    ? storesSetting.length ===
      matchAmountProperty(dbSetting, storesSetting, "name")
    : false;

  const isNeededUpdate =
    !dbSetting ||
    !isEqualAmountSetting ||
    dbSetting.length !== storesSetting.length;

  const update = async () => {
    if (isNeededUpdate) {
      // If there are new ones then reset
      return await SettingDB.clear().then(() => {
        Promise.all(
          storesSetting.map((item) => SettingDB.set(item.key, deepClone(item)))
        );
      });
    }
  };
  return update().then(() => {
    saveValueInStore();
  });
};
