import {
  expendedItemType,
  getTwoDimensionalArrayType,
  itemCosmeticPrimaryType,
} from "types";
import { curry } from "lodash/fp";

export function deepClone(item: any) {
  if (!item) {
    return item;
  } // null, undefined values check

  let types = [Number, String, Boolean],
    result;

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach(function (type) {
    if (item instanceof type) {
      result = type(item);
    }
  });
  if (typeof result == "undefined") {
    if (Object.prototype.toString.call(item) === "[object Array]") {
      result = [];
      //@ts-ignore
      item.forEach(function (child, index, array) {
        //@ts-ignore
        result[index] = deepClone(child);
      });
    } else if (typeof item == "object") {
      // testing that this is DOM
      if (item.nodeType && typeof item.cloneNode == "function") {
        result = item.cloneNode(true);
      } else if (!item.prototype) {
        // check that this is a literal
        if (item instanceof Date) {
          result = new Date(item);
        } else {
          // it is an object literal
          result = {};
          for (var i in item) {
            deepClone;
            //@ts-ignore
            result[i] = deepClone(item[i]);
          }
        }
      } else {
        // depending what you would like here,
        // just keep the reference, or create new object
        if (false && item.constructor) {
          // would not advice to do that, reason? Read below
          result = new item.constructor();
        } else {
          result = item;
        }
      }
    } else {
      result = item;
    }
  }

  return result;
}

export const toPrimitiveCosmeticItemType = (
  item: expendedItemType
): itemCosmeticPrimaryType => {
  return {
    name:  `${item.name.value}`,
    description: `${item.description!.value}`,
    timingDelay: {
      value: Number(item.timingDelay.value!),
      text: `${item.timingDelay.text}`,
    },
    dayOrEvening: {
      value: Number(item.dayOrEvening.value!),
      text: `${item.dayOrEvening.text}`,
    },
    type: {
      value: Number(item.type!.value!) || 0,
      text: `${item.type!.text || ""}`,
    },
    date: item.date.value as Date,
  };
};

export const toExpandedCosmeticItemType = (
  item: itemCosmeticPrimaryType
): expendedItemType => {
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
};

export const matchAmountProperty = (
  object1: { [key: string]: any }[],
  object2: { [key: string]: any }[],
  field: string
) => {
  let match = 0;
  for (let i = 0; i < object1.length; i++) {
    for (let j = 0; j < object2.length; j++) {
      if (object1[i][`${field}`] === object2[j][`${field}`]) {
        ++match;
        break;
      }
    }
  }
  return match;
};

export const chunk = (
  array: any[],
  inCount: number
): getTwoDimensionalArrayType =>
  array.reduce(
    (acc, item, i, arr) =>
      i % inCount === 0 ? [...acc, arr.slice(i, i + inCount)] : [...acc],
    []
  );
