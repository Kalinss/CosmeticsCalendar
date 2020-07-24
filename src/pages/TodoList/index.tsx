import React from "react";
import {
  Content,
  Header,
  Page,
  UploadDailyTask,
  TodoListContent,
} from "../../components/index";
import style from "./style.scss";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { IMainStore } from "../../stores/MainStore";
import { TaskDB } from "../../utils/database/taskDB";
import { deepClone } from "../../utils/other";
import moment from "moment";
import { TASKKEY } from "../../utils/database/config";
import { getLastStringLocationPath } from "../../utils/string";

export const TodoList: React.FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const handleClose = (e: any, day: boolean) => {
      const task = stores!.Task;
      const name =
        e.target.dataset.name ||
        e.target.closest("div[data-name]").dataset.name;
      const key = moment(stores!.Task.taskState!.date).format(TASKKEY);
      task.toogleCloseTask(name, day);
      TaskDB.update(key, deepClone(task.taskState));
    };

    const getDayList = () => {
      const chosenDate = getLastStringLocationPath(location.pathname);
      const nowDate = new Date();
      return (moment(nowDate).format("L") === chosenDate)
        ? "сегодня"
        : chosenDate;
    };

    return (
      <UploadDailyTask>
        <Page>
          <Header />
          <Content>
            <h1>Список дел на {getDayList()}</h1>
            <div className={style.todoWrapper}>
              {stores!.Task.taskState && (
                <TodoListContent
                  closeTask={handleClose}
                  items={stores!.Task.taskState}
                />
              )}
            </div>
          </Content>
        </Page>
      </UploadDailyTask>
    );
  })
);
