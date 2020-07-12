import React from "react";
import { objectDateCalendar } from "./../../types";
import { isActuallyMonth } from "../../utils/dates/dates";
import classNames from "classnames";

import style from "./style.scss";
type GenerateTableCalendarType = {
  array: objectDateCalendar[][];
  actuallyDate: Date;
  allDisabled: boolean;
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
                  <div>
                    <span>{item.number}</span>
                  </div>
                </td>
              ) : (
                <td key={z} className={style.td}>
                  <div>
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
