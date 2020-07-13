import {ItemsCosmetic} from "./ItemsCosmetic";


export interface IMainStore {
    stores?:{
        ItemsCosmetic:ItemsCosmetic  ;
    }
}

export class MainStore{
    ItemsCosmetic:ItemsCosmetic;
    constructor(){
        this.ItemsCosmetic = new ItemsCosmetic();
    }
}