import React from "react";
import style from "./style.scss";
import { inject, observer } from "mobx-react";
import { MainStore } from "../../../stores";
import classNames from "classnames";
import { taskObjectDB } from "types";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { TaskDB } from "../../../database";
import moment from "moment";

type todayWidgetTodoList = {
  stores?: MainStore;
};

const getItemsTask = (stateTask: TaskDB) => {
  let task = stateTask.task;
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

    const itemClass = (item: taskObjectDB) =>
      classNames(style.item, item.closed.day && style.closed);
    const lastItem = () => classNames(style.item, style.last);

    return (
      <Link to={`/todolist/${formatDate}`}>
        <div className={style.widget}>
          <h2 className={style.h2}>Cегодня</h2>
          <ul className={style.container}>
            {taskItems!.map((item, i) => (
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
