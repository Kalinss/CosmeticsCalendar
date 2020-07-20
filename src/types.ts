import { string } from "mobx-state-tree/dist/types/primitives";
import {MainStore} from "~/stores/MainStore";
import React from "react";

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
};

export interface taskObjectDB extends itemCosmeticPrimaryType {
  closed: boolean;
}

export type taskDB = {

  task: taskObjectDB[];
  date: Date;
};
export type stateTask = {
  task: taskObjectDB;
};
export type uploadDailyTaskProps = {
   stores?:MainStore
  children:React.ReactNode
}
export type settingType = {
  selectedDate:Date
}