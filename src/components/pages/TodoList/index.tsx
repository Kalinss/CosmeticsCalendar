import React, { useEffect, useReducer, useState } from "react";
import { TodoListTemplate } from "../../templates";
import { IMainStore } from "../../../stores";
import { getLastStringLocationPath } from "../../../utils/string";
import moment from "moment";
import { TaskDB, TASKKEY } from "../../../database";
import { isNeededUrlFormatDate } from "../../../utils/dates";
import { inject, observer } from "mobx-react";
import { LoaderComponent } from "../../organisms/Loader";
import { clickHandlerType as clickAddButton, closeTaskType } from "./types";
import { deepClone } from "../../../utils/other";
import { Controller } from "../../../controller";

export const TodoList: React.FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const [isLoading, setLoading] = useState(true);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    const taskItems = stores!.Task.taskState;
    const pathname = getLastStringLocationPath(location.pathname);
    const date = isNeededUrlFormatDate(pathname)
      ? moment(pathname, "DD.MM.YYYY")
      : moment(new Date());
    const key = date.format(TASKKEY);

    const load = async () => {
      Controller.onloadTaskForDate(pathname).then(() => {
        setLoading(false);
      });
    };

    const closeTask: closeTaskType = (day: boolean) => (e: any) => {
      const task = stores!.Task;
      const name =
        e.target.dataset.name ||
        e.target.closest("div[data-name]").dataset.name;
      const key = moment(task.taskState!.date).format(TASKKEY);
      task.toggleCloseTask(name, day);
      TaskDB.update(key, deepClone(task.taskState));
    };

    const clickAddButton: clickAddButton = (date, key) => (
      inputValue,
      selectValue
    ) => {
      Controller.addTask(key, {
        valueName: inputValue,
        valueDayOrEvening: selectValue,
        date: date,
      }).then(() => forceUpdate());
    };

    useEffect(() => {
      load();
    }, []);

    return isLoading ? (
      <LoaderComponent />
    ) : (
      <>
        <TodoListTemplate
          items={taskItems!}
          clickHandler={clickAddButton(date.toDate(), key)}
          clickTaskHandler={closeTask}
        />
      </>
    );
  })
);
