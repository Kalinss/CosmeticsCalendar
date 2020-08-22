import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  useState,
} from "react";
import { IMainStore } from "../../../stores";
import { MainTemplate } from "../../templates";
import { inject, observer } from "mobx-react";
import moment from "moment";
import { TaskDB } from "../../../database";
import { deepClone } from "../../../utils/other";
import { LoaderComponent } from "../../organisms/Loader";
import {
  clickHandlerType as clickAddButton,
  closeTaskType,
} from "../TodoList/types";
import { Controller } from "../../../controller";
import { TASKKEY } from "../../../database";

export const Main: FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const alertUpdateShow = stores!.Additional.alertUpdate;
    const [loading, setLoading] = useState(true);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isOpenAlert, setOpenAlert] = useState(
      alertUpdateShow === "true" || false
    );

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
      task.toggleCloseTask(name, day);
      TaskDB.update(key, deepClone(task.taskState));
    };

    const closeAlert = (isNotShowMore: boolean) => {
      if (isNotShowMore) {
        Controller.closeUpdateAlert().then(() => {
          setOpenAlert(false);
        });
      }
      setOpenAlert(false);
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

    const load = async () => {
      const date = moment(new Date()).format("DD.MM.YYYY");
      Controller.onloadTaskForDate(date).then(() => {
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
        isOpenAlert={isOpenAlert}
        closeAlert={closeAlert}
      />
    );
  })
);
