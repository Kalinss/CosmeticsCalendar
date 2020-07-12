import {ItemsCosmetic} from "./ItemsCosmetic";
import {CreateCosmetic} from './CreateCosmetic';

export interface IMainStore {
    stores?:{
        ItemsCosmetic:ItemsCosmetic;
        CreateCosmetic:CreateCosmetic;
    }
}

export class MainStore{
    ItemsCosmetic:ItemsCosmetic;
    CreateCosmetic:CreateCosmetic;
    constructor(){
        this.ItemsCosmetic = new ItemsCosmetic();
        this.CreateCosmetic = new CreateCosmetic();
    }
}