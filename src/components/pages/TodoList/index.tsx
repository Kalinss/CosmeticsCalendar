import React, { useEffect, useState, useReducer } from "react";
import { TodoListTemplate } from "../../templates";
import { IMainStore } from "../../../stores";
import { getLastStringLocationPath } from "../../../utils/string";
import moment from "moment";
import { TaskDB, TASKKEY } from "../../../database";
import { urlFormatDate } from "../../../utils/dates";
import { inject, observer } from "mobx-react";
import { LoaderComponent } from "../../organisms/Loader";
import { addTask } from "../../../controller";
import { clickHandlerType as clickAddButton } from "./types";
import { closeTaskType } from "./types";
import { deepClone } from "../../../utils/other";
import { onloadTaskForDate } from "../../../controller";

export const TodoList: React.FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const [loading, setLoading] = useState(true);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    const items = stores!.Task.taskState;
    const pathname = getLastStringLocationPath(location.pathname);
    const date = urlFormatDate(pathname)
      ? moment(pathname, "DD.MM.YYYY")
      : moment(new Date());
    const key = date.format(TASKKEY);

    const load = async () => {
      const date = getLastStringLocationPath(pathname);
      onloadTaskForDate(date).then(() => {
        setLoading(false);
      });
    };

    const closeTask: closeTaskType = (day: boolean) => (e: any) => {
      const task = stores!.Task;
      const name =
        e.target.dataset.name ||
        e.target.closest("div[data-name]").dataset.name;
      const key = moment(task.taskState!.date).format(TASKKEY);
      task.toogleCloseTask(name, day);
      TaskDB.update(key, deepClone(task.taskState));
    };

    const clickAddButton: clickAddButton = (date, key) => (
      inputValue,
      selectValue
    ) => {
        addTask(key, {
        valueName: inputValue,
        valueDayOrEvening: selectValue,
        date: date,
      }).then(() => forceUpdate());
    };

    useEffect(() => {
      load();
    }, []);

    return loading ? (
      <LoaderComponent />
    ) : (
      <>
        <TodoListTemplate
          items={items!}
          clickHandler={clickAddButton(date.toDate(), key)}
          clickTaskHandler={closeTask}
        />
      </>
    );
  })
);
