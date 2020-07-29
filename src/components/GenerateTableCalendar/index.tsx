import React from "react";
import classNames from "classnames";
import { GenerateTableCalendarType, objectDateCalendar } from "../../types";
import { isIdenticalDays, dateСomparison ,isActuallyMonth } from "../../utils/dates";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import moment from "moment";
import style from "./style.scss";
import stores from "../../stores/store";

const getFormatDate = (date: Date) => {
  return moment(date).format("L");
};

const dotsTask = () => {
  const field = stores.Setting.config.find(
    (item) => item.key === "dotsCalendar"
  );
  if (field && field.value) {
    return <b className={style.dot}></b>;
  }
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
                          ? classNames(style.active, style.wrap)
                          : style.wrap
                      }
                    >
                      {props.itemsCosmetic.some((cosmetic) =>
                        dateСomparison(
                          item.date,
                          cosmetic.date,
                          cosmetic.timingDelay.value
                        )
                      ) && dotsTask()}

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
