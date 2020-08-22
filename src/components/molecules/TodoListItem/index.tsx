import React from "react";
import style from "./style.scss";
import { taskObjectDB } from "types";
import classNames from "classnames";
import { TASKKEY } from "../../../database";
import { ArrowCheck } from "../../atoms/ArrowCheck";
import moment from "moment";
import { clickHandlerType } from "../../organisms/TodoList/types";

type TodoListItem = {
  isDayTask?: boolean;
  item: taskObjectDB;
  clickHandler: clickHandlerType;
};

const classText = (item: taskObjectDB) =>
  classNames(style.text, item.closed.day ? style.closed : "");
const classCloseLineDay = (item: taskObjectDB) =>
  classNames(style.closeLine, item.closed.day ? style.active : "");
const classCloseLineEvening = (item: taskObjectDB) =>
  classNames(style.closeLine, item.closed.evening ? style.active : "");

export const TodoListItem: React.FC<TodoListItem> = React.memo(
  ({ item, clickHandler, isDayTask = true }) => {
    return (
      <li className={style.item} data-type={item.type!.value}>
        <p className={classText(item)}>
          {isDayTask ? (
            <span className={classCloseLineDay(item)} />
          ) : (
            <span className={classCloseLineEvening(item)} />
          )}
          {item.name}
        </p>

        <div
          className={style.closeWrapper}
          data-name={item.name}
          data-key={moment(item.date).format(TASKKEY)}
          onClick={clickHandler}
        >
          <div className={style.close}>
            <ArrowCheck
              check={isDayTask ? item.closed.day : item.closed.evening}
              componentClass={style.arrow}
            />
          </div>
        </div>
      </li>
    );
  }
);
