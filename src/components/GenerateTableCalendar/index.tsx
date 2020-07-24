import React from "react";
import { isActuallyMonth } from "../../utils/dates";
import classNames from "classnames";
import { GenerateTableCalendarType, objectDateCalendar } from "~/types";
import { isIdenticalDays, dateСomparison } from "../../utils/dates";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import moment from "moment";
import style from "./style.scss";

const getFormatDate = (date: Date) => {
  return moment(date).format("L");
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
                  <Link
                    className={style.linkToList}
                    to={`/todolist/${getFormatDate(item.date)}`}
                  >
                    <div>
                      <span className={style.link}>{item.number}</span>
                    </div>
                  </Link>
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
                  <Link to={`/todolist/${getFormatDate(item.date)}`}>
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

                      <span className={style.link}>{item.number}</span>
                    </div>
                  </Link>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
