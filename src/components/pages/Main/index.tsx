import React, {
  FunctionComponent,
  useEffect,
  useState,
  useReducer,
} from "react";
import { IMainStore } from "../../../stores";
import { MainTemplate } from "../../templates";
import { inject, observer } from "mobx-react";
import moment from "moment";
import { TaskDB } from "../../../database/taskDB";
import { deepClone } from "../../../utils/other";
import { addTask, onloadTaskForDate } from "../../../controller";
import { LoaderComponent } from "../../organisms/Loader";
import { closeTaskType } from "../TodoList/types";
import { TASKKEY } from "../../../database";
import { toJS } from "mobx";
import { clickHandlerType as clickAddButton } from "../TodoList/types";

export const Main: FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const [loading, setLoading] = useState(true);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const date = new Date();
    const key = moment(date).format(TASKKEY);
    const todoTask = stores!.Task.taskState;
    stores!.Setting.config;

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

    const load = async () => {
      const date = moment(new Date()).format("DD.MM.YYYY");
      onloadTaskForDate(date).then(() => {
        setLoading(false);
      });
    };

    useEffect(() => {
      load();
    }, []);

    return loading ? (
      <LoaderComponent />
    ) : (
      <MainTemplate
        closeTaskTodoWidget={closeTask}
        todoTask={todoTask!}
        clickAddButtonTodoWidget={clickAddButton(date, key)}
        stores={stores!}
      />
    );
  })
);
