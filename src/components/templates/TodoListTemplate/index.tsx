import React from "react";
import style from "./style.scss";
import { Content } from "../Content";
import { Page } from "../Page";
import { clickHandlerType as clickButtonHandler } from "../../organisms/AddTask/type";
import { getLastStringLocationPath } from "../../../utils/string";
import moment from "moment";
import { AddTask } from "../../organisms/AddTask";
import { TodoList } from "../../organisms/TodoList";
import { closeTaskType } from "../../pages/TodoList/types";
import { taskDB } from "types";

type TodoListTemplateType = {
  items: taskDB;
  clickHandler: clickButtonHandler;
  clickTaskHandler: closeTaskType;
};

export const TodoListTemplate: React.FC<TodoListTemplateType> = ({
  items,
  clickHandler,
  clickTaskHandler,
}) => {
  const getDayList = () => {
    const chosenDate = getLastStringLocationPath(location.pathname);
    const nowDate = new Date();
    return moment(nowDate).format("L") === chosenDate ? "сегодня" : chosenDate;
  };

  const dayTask = items!.task.filter(
    (item) => item.dayOrEvening.value == 1 || item.dayOrEvening.value == 2
  );
  const eveningTask = items!.task.filter(
    (item) => item.dayOrEvening.value == 1 || item.dayOrEvening.value == 3
  );

  dayTask.sort((a, b) => a.type!.value! - b.type!.value!);
  eveningTask.sort((a, b) => a.type!.value! - b.type!.value);

  const closeDayTaskHandler = clickTaskHandler(true);
  const closeEveningTaskHandler = clickTaskHandler(false);

  return (
    <Page>
      <Content>
        <div className={style.todoList}>
          <h1>План ухода на {getDayList() || "сегодня"}</h1>
          <div className={style.todoWrapper}>
            {dayTask[0] || eveningTask[0] ? (
              <div className={style.content}>
                <div className={style.top}>
                  {dayTask[0] && (
                    <TodoList
                      isDayTask={true}
                      title={"Утро:"}
                      tasks={dayTask}
                      clickHandler={closeDayTaskHandler}
                    />
                  )}
                </div>

                <div className={style.bottom}>
                  {eveningTask[0] && (
                    <TodoList
                      isDayTask={false}
                      title={"Вечер:"}
                      tasks={eveningTask}
                      clickHandler={closeEveningTaskHandler}
                    />
                  )}
                </div>
                <AddTask clickHandler={clickHandler} />
              </div>
            ) : (
              <p>На сегодня задач нету</p>
            )}
          </div>
        </div>
      </Content>
    </Page>
  );
};
