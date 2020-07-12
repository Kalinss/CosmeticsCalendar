import moment from "moment";
import {
  objectDateCalendar,
  getTwoDimensionalArrayType,
  createArrayObjectDaysType,
} from "../../types";

export const getTwoDimensionalArray = (
  array: any[],
  inCount: number
): getTwoDimensionalArrayType => {
  if (inCount == 0) return array;

  const arr = array
    .map((_, i: number) =>
      i % inCount === 0 ? array.slice(i, i + inCount) : []
    )
    .filter((item) => item[0]);

  return arr;
};

export const createArrayObjectDays = (
  month: Date
): createArrayObjectDaysType => {
  const firstDay = moment(month).startOf("month").format(); // first day of this month
  const firstDayNumberOfWeek = moment(firstDay).day() || 7; // day counter from 1 to 7 -> Monday - Sunday
  const array: objectDateCalendar[] = [];

  for (let i = 1 - firstDayNumberOfWeek; i <= 42 - firstDayNumberOfWeek; i++) {
    // create 35 calendar days
    const day =
      i >= 0
        ? moment(firstDay).add(i, "d")
        : moment(firstDay).subtract(-1 * i, "d");

    array.push({
      date: day.toDate(),
      number: +day.format("DD"),
      positionWeak: day.weekday() || 7,
    });
  }

  return array;
};

export const isActuallyMonth = (a: Date, b: Date): boolean => moment(a).month() !== moment(b).month();
