import React from "react";
import style from "./style.scss";
import { inject, observer } from "mobx-react";
import { MainStore } from "../../../stores";
import classNames from "classnames";
import { taskObjectDB } from "types";
import { Link } from "react-router-dom";
import { ITaskDBValue } from "../../../database/taskDB";
import moment from "moment";
import { deepClone } from "../../../utils/other";
import config from "../../../config";

type todayWidgetTodoList = {
  stores?: MainStore;
};

const isDay = (date: Date) => moment(date).get("hours") >= 16;

const getNeededTask = (task: taskObjectDB[], type: 1 | 2 | 3) =>
  task.filter((item) => item.dayOrEvening.value === type);

const getActuallyTask = (task: taskObjectDB[], day: boolean) =>
  !day
    ? [...getNeededTask(task, 1), ...getNeededTask(task, 2)]
    : [...getNeededTask(task, 1), ...getNeededTask(task, 3)];

const getItemsTask = (stateTask: ITaskDBValue) => {
  let task = deepClone(stateTask.task);
  const now = new Date();
  task = getActuallyTask(task, isDay(now));
  task.sort(
    (a: taskObjectDB, b: taskObjectDB) => a.type!.value - b.type!.value
  );
  if (task.length > 4) {
    task.length = 4;
    return task;
  }
  return task;
};

export const TodayWidgetTodoList: React.FunctionComponent<todayWidgetTodoList> = inject(
  "stores"
)(
  observer(({ stores }) => {
    const todayTask = stores!.Task.taskState!;
    const formatDate = moment(todayTask.date).format("L");
    const taskItems = getItemsTask(todayTask);
    const now = new Date();

    const getActuallyTimeClass = (item: taskObjectDB) =>
      isDay(now) ? item.closed.evening : item.closed.day;

    const itemClass = (item: taskObjectDB) =>
      classNames(style.item, getActuallyTimeClass(item) && style.closed);

    const lastItem = () => classNames(style.item, style.last);

    return (
      <Link to={`${config.baseHref}/todolist/${formatDate}`}>
        <div className={style.widget}>
          <h2 className={style.h2}>Cегодня</h2>
          <ul className={style.container}>
            {taskItems!.map((item: taskObjectDB, i: number) => (
              <li className={itemClass(item)} key={i}>
                {item.name}
              </li>
            ))}
            <li className={lastItem()}>
              <span>. . .</span>
            </li>
          </ul>
        </div>
      </Link>
    );
  })
);
