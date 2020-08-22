import { expendedItemType, itemCosmeticPrimaryType } from "types";
import { deepClone, toPrimitiveCosmeticItemType } from "../utils/other";
import { CosmeticItemsModelDB } from "../database";
import { Controller } from "./index";
import stores from "../stores/store";

export const saveInDBNewItemCosmetic = async (object: expendedItemType) => {
  const formDBObject = toPrimitiveCosmeticItemType(object);
  return await CosmeticItemsModelDB.set(
    formDBObject.name.trim(),
    deepClone(formDBObject)
  );
};
export const deleteItemCosmetic = async (data: itemCosmeticPrimaryType) => {
  return await CosmeticItemsModelDB.delete(data.name.trim())
    .then(() => Controller.updateTaskAfterDeleteItem(data))
    .then(() => stores!.ItemsCosmetic.deleteItem(data.name));
};
