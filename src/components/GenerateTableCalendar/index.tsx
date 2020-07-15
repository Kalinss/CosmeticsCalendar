import React from "react";
import { objectDateCalendar } from "./../../types";
import { isActuallyMonth } from "../../utils/dates/dates";
import classNames from "classnames";
import {itemCosmeticPrimaryType} from "~/types";
import { isIdenticalDays, dateСomparison } from "../../utils/dates/dates";
import moment from "moment";

import style from "./style.scss";

type GenerateTableCalendarType = {
  array: objectDateCalendar[][];
  actuallyDate: Date;
  allDisabled: boolean;
  itemsCosmetic: itemCosmeticPrimaryType[];
};

export const GenerateTableCalendar: React.FunctionComponent<GenerateTableCalendarType> = (
  props
) => {
  return (
    <table>
      <tbody>
        {props.array.map((week: any, i: number) => (
          <tr key={i}>
            {week.map((item: objectDateCalendar, z: number) => {
              return props.allDisabled ? (
                <td key={z} className={classNames(style.td, style.disabled)}>
                  <div>
                    <span>{item.number}</span>
                  </div>
                </td>
              ) : isActuallyMonth(props.actuallyDate, item.date) ? (
                <td key={z} className={classNames(style.td, style.disabled)}>
                  <div
                    className={
                      isIdenticalDays(item.date, props.actuallyDate)
                        ? style.active
                        : ""
                    }
                  >
                    <span>{item.number}</span>
                  </div>
                </td>
              ) : (
                <td key={z} className={style.td}>
                  <div
                    className={
                      isIdenticalDays(item.date, props.actuallyDate)
                        ? style.active
                        : ""
                    }
                  >
                    {props.itemsCosmetic.some((cosmetic) =>
                      dateСomparison(
                        item.date,
                        cosmetic.date,
                        cosmetic.timingDelay.value
                      )
                    ) && <span>Ю</span>}
                    <span>{item.number}</span>
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
