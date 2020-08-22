import { closeUpdateAlert, createCollections, openCollections } from "./main";
import { uploadAdditional } from "./additional";
import { deleteItemCosmetic, saveInDBNewItemCosmetic } from "./itemsCosmetic";
import { toggleSettingValueField, uploadSetting } from "./setting";
import {
  addTask,
  cleaningOldTask,
  onloadTaskForDate,
  updateTask,
  updateTaskAfterDeleteItem,
  updateTaskAfterNewItem,
  updateTaskAfterUpdateItem,
} from "./task";

export class Controller {
  // main
  static closeUpdateAlert = closeUpdateAlert;
  static openCollections = openCollections;
  static createCollections = createCollections;

  //additional
  static uploadAdditional = uploadAdditional;

  //cosmeticItems
  static saveInDBNewItemCosmetic = saveInDBNewItemCosmetic;
  static deleteItemCosmetic = deleteItemCosmetic;

  //settings
  static toggleSettingValueField = toggleSettingValueField;
  static uploadSetting = uploadSetting;

  //tasks
  static updateTaskAfterUpdateItem = updateTaskAfterUpdateItem;
  static updateTask = updateTask;
  static updateTaskAfterDeleteItem = updateTaskAfterDeleteItem;
  static onloadTaskForDate = onloadTaskForDate;
  static addTask = addTask;
  static cleaningOldTask = cleaningOldTask;
  static updateTaskAfterNewItem = updateTaskAfterNewItem;
}
