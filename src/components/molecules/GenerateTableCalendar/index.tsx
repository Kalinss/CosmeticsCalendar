import React from "react";
import classNames from "classnames";
import { GenerateTableCalendarType, objectDateCalendar } from "types";
import {
  isIdenticalDays,
  dateСomparison,
  isActuallyMonth,
} from "../../../utils/dates";
import { CalendarTableCell } from "../../atoms/CalendarTableCell";

export const GenerateTableCalendar: React.FunctionComponent<GenerateTableCalendarType> = (
  props
) => {
  const dotsTask = () => {
    const field = props.settings.find((item) => item.key === "dotsCalendar");
    return field && field.value;
  };

  const setting = props.settings.find((item) => item.key === "everyDayDots");
  return (
    <table>
      <tbody>
        {props.array.map((week: any, i: number) => (
          <tr key={i}>
            {week.map((item: objectDateCalendar, z: number) => {
              return props.allDisabled ? (
                <CalendarTableCell
                  key={z}
                  date={item.date}
                  disabled={true}
                  value={item.number}
                />
              ) : isActuallyMonth(props.actuallyDate, item.date) ? (
                <CalendarTableCell
                  key={z}
                  date={item.date}
                  disabled={true}
                  value={item.number}
                />
              ) : (
                <CalendarTableCell
                  key={z}
                  date={item.date}
                  disabled={false}
                  value={item.number}
                  active={isIdenticalDays(item.date, props.actuallyDate)}
                  dot={props.itemsCosmetic.some(
                    (cosmetic) =>
                      dateСomparison(
                        item.date,
                        cosmetic.date,
                        cosmetic.timingDelay.value,
                        setting!.value
                      ) && dotsTask()
                  )}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
