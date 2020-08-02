import {MainStore,IMainStore} from "./stores";
import React from "react";
import exp = require("constants");

export type objectDateCalendar = {
  date: Date;
  number: number;
  positionWeak: number;
};

export type getTwoDimensionalArrayType = any[][];

export type createArrayObjectDaysType = objectDateCalendar[];

export type expandedItemCosmeticField = {
  value?: string | number | Date;
  error?: string;
  text?: string;
};
export type expandedItemCosmeticFieldProps = {
  field: string;
};

export type expendedItemType = {
  name: expandedItemCosmeticField;
  description?: expandedItemCosmeticField;
  timingDelay: expandedItemCosmeticField;
  dayOrEvening: expandedItemCosmeticField;
  type?: expandedItemCosmeticField;
  date: expandedItemCosmeticField;
};

export type itemCosmeticPrimaryType = {
  // for db and state
  name: string;
  description?: string;
  timingDelay: {
    value: number;
    text: string;
  }; // 0 to N day
  dayOrEvening: {
    value: number;
    text: string;
  }; // 0 - all, 1 - day 2 - evening
  type?: {
    value: number;
    text: string;
  }; // priority item for filter
  date: Date;
};

export type GenerateTableCalendarType = {
  array: objectDateCalendar[][];
  actuallyDate: Date;
  allDisabled: boolean;
  itemsCosmetic: itemCosmeticPrimaryType[];
  settings:settingType[]
};

export interface taskObjectDB extends itemCosmeticPrimaryType {
  closed:  {
    day:boolean,
    evening:boolean
  };
}

export type taskDB = {
  task: taskObjectDB[];
  date: Date;
};
export type taskDBType = {
  task: taskObjectDB[];
  date: Date;
}
export type stateTask = {
  task: taskObjectDB;
};
export type uploadDailyTaskProps = {
   stores?:MainStore
  children:React.ReactNode
}
export type settingType = {
  name:string,
  key:string,
  value:boolean,
  sort:number
}
export type controlDataProps = {
  stores?:MainStore;
  props:any
}
export type controlDataFunctions = {
  saveInDBNewItemCosmetic?:(object:expendedItemType)=>void
}
export type controlDataObject = {
  controlFunction:controlDataFunctions
}
export interface createCosmeticComponentProps extends controlDataObject {
  stores?:MainStore,
}
export type settingComponentType = {
  stores?:MainStore,
}