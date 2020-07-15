import { string } from "mobx-state-tree/dist/types/primitives";

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
  field:string
}

export type expendedItemType ={
  name: expandedItemCosmeticField,
  description?: expandedItemCosmeticField;
  timingDelay: expandedItemCosmeticField
  dayOrEvening: expandedItemCosmeticField
  type?: expandedItemCosmeticField
  date:expandedItemCosmeticField
}

export type itemCosmeticPrimaryType = { // for db and state
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
  date:Date,
}