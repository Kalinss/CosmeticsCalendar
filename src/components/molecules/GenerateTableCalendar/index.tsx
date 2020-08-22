import React from "react";
import { GenerateTableCalendarType, objectDateCalendar } from "types";
import {
  compareDateAfterNDays,
  isIdenticalDates,
  isNotSameMonth,
} from "../../../utils/dates";
import { CalendarTableCell } from "../../atoms/CalendarTableCell";

export const GenerateTableCalendar: React.FunctionComponent<GenerateTableCalendarType> = (
  props
) => {
  const isShowDotsTask = () => {
    const field = props.settings.find((item) => item.key === "dotsCalendar");
    return field && field.value;
  };

  const isShowDotsEveryDayTask = () => {
    const everyDayTaskObject = props.settings.find(
      (item) => item.key === "everyDayDots"
    );
    return everyDayTaskObject!.value;
  };

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
              ) : isNotSameMonth(props.actuallyDate, item.date) ? (
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
                  active={isIdenticalDates(item.date, props.actuallyDate)}
                  dot={props.itemsCosmetic.some(
                    (cosmetic) =>
                      compareDateAfterNDays(
                        item.date,
                        cosmetic.date,
                        cosmetic.timingDelay.value,
                        isShowDotsEveryDayTask()
                      ) && isShowDotsTask()
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
