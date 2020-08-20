import { observable, action, computed } from "mobx";
import {
  expandedItemCosmeticField,
  expandedItemCosmeticFieldProps,
  itemCosmeticPrimaryType,
  expendedItemType,
} from "../types";
import {
  toExpandedCosmeticItemType,
  toPrimitiveCosmeticItemType,
} from "../utils/other";
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

  @action getItemFromCollection = async (
    key: string
  ): Promise<itemCosmeticPrimaryType | undefined> => {
    return this.items.find((item) => item.name === key);
  };

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

  @action loadAllItemsFromDB = async () => {
    // get all item
    return await CosmeticItemsModelDB.getAll()
        .then((data) => {
          this.items = [...data];
        })
        .catch(console.log); // todo handle errors
  };

  @action deleteItem = (key: string) => {
    this.items = this.items.filter((item) => item.name !== key);
  };

  @action toCurrentItem = (item: itemCosmeticPrimaryType) => {
    // save standart Type object in currentItem
    this.currentItem = { ...toExpandedCosmeticItemType(item) } as {
      [key: string]: expandedItemCosmeticField;
    };
  };
  @action setItems = (items: itemCosmeticPrimaryType[]) => {
    this.items = [...items];
  };

  @action saveItem = () => {
    // transform expanded itemCreate to the standart type, and save in item collection
    this.items.push(
      toPrimitiveCosmeticItemType(this.currentItem as expendedItemType)
    );
  };
  @action editItem = () => {
    const items = this.getAll();
    const needed = toPrimitiveCosmeticItemType(
      this.currentItem as expendedItemType
    );
    const newItems = items.filter((item) => item.name !== needed.name);
    this.setItems([...newItems, needed]);
  };
  @action clearCurrentItem = () => {
    this.currentItem = { ...expendedItemCosmeticInitialState };
  };
}
