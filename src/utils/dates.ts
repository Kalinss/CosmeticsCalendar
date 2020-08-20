import moment from "moment";
import {createArrayObjectDaysType, objectDateCalendar,} from "types";


export const createArrayObjectDays = (
  date: Date
): createArrayObjectDaysType => {
  const firstDay = moment(date).startOf("month").format(); // first day of this month
  const firstDayNumberOfWeek = moment(firstDay).day() || 7; // day counter from 1 to 7 -> Monday - Sunday
  const array: objectDateCalendar[] = [];

  for (let i = 1 - firstDayNumberOfWeek; i <= 42 - firstDayNumberOfWeek; i++) {
    // create 42 calendar days
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

export const isNotSameMonth = (a: Date, b: Date): boolean =>
  moment(a).month() !== moment(b).month();

export const isIdenticalDates = (a: Date, b: Date): boolean => {
  const firstDate = moment(a);
  const secondDate = moment(b);
  firstDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  secondDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  return firstDate.diff(secondDate, "d") === 0;
};

//the function checks if a(date) the date that will be through (b + timeDelay * n (day))
export const compareDateAfterNDays = (
    actuallyPointDate: Date,
    startingPointDate: Date,
    timeDelay: number,
    everyDayDots: boolean = true
) => {
  const firstDate = moment(actuallyPointDate); // Date
  const secondDate = moment(startingPointDate); // starting point Date
  firstDate.set({ hour: 15, minute: 0, second: 0, millisecond: 0 });
  secondDate.set({ hour: 15, minute: 0, second: 0, millisecond: 0 });
  const diff = secondDate.diff(firstDate, "d");
  if (timeDelay === 1 && !everyDayDots) {
    return false;
  }
  if (diff === 0 && timeDelay === -1) {
    return true;
  }
  if (diff > 0 || timeDelay === -1) {
    return false;
  }
  return diff % timeDelay === 0;
};

export const isNeededUrlFormatDate = (str: string): boolean => // cc.cc.cccc format
  /\d{2}\.\d{2}\.\d{4}/g.test(str.trim());
