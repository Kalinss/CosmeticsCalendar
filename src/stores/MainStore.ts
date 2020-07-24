import {ItemsCosmetic} from "./ItemsCosmetic";
import {Task} from "./Task";
import {Setting} from "./Setting";

export interface IMainStore {
    stores?:{
        ItemsCosmetic:ItemsCosmetic  ;
        Task:Task;
        Setting:Setting;
    }
    props?:any
}

export class MainStore{
    ItemsCosmetic:ItemsCosmetic;
    Task:Task;
    Setting:Setting;
    constructor(){
        this.ItemsCosmetic = new ItemsCosmetic();
        this.Task = new Task();
        this.Setting = new Setting();
    }
}