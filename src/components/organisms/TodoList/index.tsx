import React from "react";
import style from "./style.scss";
import { taskObjectDB } from "types";
import { clickHandlerType } from "./types";
import {TodoListItem} from "../../molecules/TodoListItem";

export type TodoListType = {
  tasks: taskObjectDB[];
  title: string;
  isDayTask?: boolean;
  clickHandler?: clickHandlerType;
};


export const TodoList: React.FC<TodoListType> = ({
  tasks,
  isDayTask = false,
  title = "",
  clickHandler = () => {},
}) => {
  return (
    <>
      <h2 className={style.h2}>{title}</h2>
      <ul className={style.list}>
        {tasks.map((item, i) => {
          return (

            <TodoListItem key={i} item={item} clickHandler={clickHandler} isDayTask={isDayTask}/>

          );
        })}
      </ul>
    </>
  );
};
