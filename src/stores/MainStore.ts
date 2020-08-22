import { ItemsCosmetic } from "./ItemsCosmetic";
import { Task } from "./Task";
import { Setting } from "./Setting";
import { Additional } from "./Additional";

export interface IMainStore {
  stores?: {
    ItemsCosmetic: ItemsCosmetic;
    Task: Task;
    Setting: Setting;
    Additional: Additional;
  };
  props?: any;
}

export class MainStore {
  ItemsCosmetic: ItemsCosmetic;
  Task: Task;
  Setting: Setting;
  Additional: Additional;

  constructor() {
    this.ItemsCosmetic = new ItemsCosmetic();
    this.Task = new Task();
    this.Setting = new Setting();
    this.Additional = new Additional();
  }
}
