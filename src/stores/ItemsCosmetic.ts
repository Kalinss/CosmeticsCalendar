import { observable, action, computed } from "mobx";
import {
  expandedItemCosmeticField,
  expandedItemCosmeticFieldProps,
  itemCosmeticPrimaryType,
  expendedItemType,
} from "../types";

import { CosmeticItemsModelDB } from "../database/cosmeticItemsModelDB";

export const expendedItemCosmeticInitialState = {
  name: {
    value: "",
    error: "",
    text: "",
  },
  description: {
    value: "",
    error: "",
    text: "",
  },
  timingDelay: {
    value: 2,
    error: "",
    text: "2 дня",
  },
  dayOrEvening: {
    value: 1,
    error: "",
    text: "День и вечер",
  },
  type: {
    value: 10,
    error: "",
    text: "Средство для снятия макияжа",
  },
  date: {
    value: new Date(),
    error: "",
    text: "",
  },
} as { [key: string]: expandedItemCosmeticField };

export class ItemsCosmetic {
  @observable items: itemCosmeticPrimaryType[] = []; // all itemsCosmetics

  @observable currentItem = { ...expendedItemCosmeticInitialState } as {
    [key: string]: expandedItemCosmeticField;
  };

  toPrimitiveType(item: expendedItemType): itemCosmeticPrimaryType {
    return {
      name: ("" + item.name.value).trim(),
      description: "" + item.description!.value,
      timingDelay: {
        value: +item.timingDelay.value!,
        text: "" + item.timingDelay.text,
      },
      dayOrEvening: {
        value: +item.dayOrEvening.value!,
        text: "" + item.dayOrEvening.text,
      },
      type: {
        value: +item.type!.value! || 0,
        text: "" + item.type!.text || "",
      },
      date: item.date.value as Date,
    };
  }

  toExpandedType(item:itemCosmeticPrimaryType):expendedItemType{
    return {
      name: {
        value: item.name,
        error: "",
        text: "",
      },
      description: {
        value: item.description,
        error: "",
        text: "",
      },
      timingDelay: {
        value: item.timingDelay.value,
        error: "",
        text: item.timingDelay.text,
      },
      dayOrEvening: {
        value: item.dayOrEvening.value,
        error: "",
        text: item.dayOrEvening.text,
      },
      type: {
        value: item.type!.value,
        error: "",
        text: item.type!.text,
      },
      date: {
        value: item.date,
        error: "",
        text: "",
      },
    };
  }

  @action getAll(): itemCosmeticPrimaryType[] {
    return [...this.items];
  }

  @action setCurrentField = (
    props: expandedItemCosmeticField & expandedItemCosmeticFieldProps
  ) => {
    this.currentItem[props.field] = {
      error: props.error || expendedItemCosmeticInitialState[props.field].error,
      value: props.value || expendedItemCosmeticInitialState[props.field].value,
      text: props.text || expendedItemCosmeticInitialState[props.field].text,
    };
  };

  @action findItemEdit(
    key: string
  ): Promise<itemCosmeticPrimaryType | undefined> {
    return new Promise((resolve, reject) => {
      const find: itemCosmeticPrimaryType | undefined = this.items.find(
        (item) => item.name === key
      );
      resolve(find as itemCosmeticPrimaryType);
    });
  }

  @action saveEditItem = (currentItem: itemCosmeticPrimaryType) => {
    const findIndexObject = this.items.findIndex(
      (item, i) => item.name === this.currentItem!.name
    );
    const itemsSave = this.items;
    itemsSave.splice(findIndexObject, 1, currentItem);
    this.items = itemsSave;
  };

  @action getLastItem() {
    return this.items[this.items.length - 1];
  }

  @action loadAllItemsFromDB = () => {
    // get all item
    return new Promise((resolve, reject) => {
      CosmeticItemsModelDB.getAll()
        .then((data) => {
          this.items = [...data];
          resolve(true);
        })
        .catch((err) => reject(err));
    });
  };

  @action deleteItem = (key: string) => {
    this.items = this.items.filter((item) => item.name !== key);
  };

  @action toCurrentItem = (item: itemCosmeticPrimaryType) => {
    // save standart Type object in currentItem
    this.currentItem = {...this.toExpandedType(item)} as {[key: string]: expandedItemCosmeticField} ;
  };

  @action saveItem = () => {
    // transform expanded itemCreate to the standart type, and save in item collection
    this.items.push(this.toPrimitiveType(this.currentItem as expendedItemType));
  };
  @action clearCurrentItem = () => {
    this.currentItem = { ...expendedItemCosmeticInitialState };
  };
}
