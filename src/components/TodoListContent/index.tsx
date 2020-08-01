import React, { useRef, useState } from "react";
import style from "./style.scss";
import { taskDB, taskObjectDB } from "types";
import moment from "moment";
import { toJS } from "mobx";
import { ArrowCheck } from "../@decoration/ArrowCheck";
import classNames from "classnames";
import { TASKKEY, TaskDB } from "../../database/index";
import { inject, observer } from "mobx-react";
import { deepClone } from "../../utils/other";
import { getLastStringLocationPath } from "../../utils/string";
import { MainStore } from "../../stores/index";
import { Button, Dropdown, DropdownProps, Select } from "semantic-ui-react";
import { addTask } from "../../utils/controlData";
import { dataFields } from "../../pages/CreateCosmetic/dataFields";
import { urlFormatDate } from "../../utils/dates";

type todoListContentProps = {
  stores?: MainStore;
};

export const TodoListContent: React.FunctionComponent<todoListContentProps> = inject(
  "stores"
)(
  observer(({ stores }) => {
    const items = stores!.Task.taskState;
    const pathname = getLastStringLocationPath(location.pathname);
    const [selectValue, setSelectValue] = useState(1);
    const refInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const refSelect = useRef() as React.MutableRefObject<HTMLDivElement>;
    const date = urlFormatDate(pathname)
      ? moment(pathname, "DD.MM.YYYY")
      : moment(new Date());
    const closeTask = (e: any, day: boolean) => {
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
      return moment(nowDate).format("L") === chosenDate
        ? "сегодня"
        : chosenDate;
    };
    const dayTask = items!.task.filter(
      (item) => item.dayOrEvening.value == 1 || item.dayOrEvening.value == 2
    );
    const eveningTask = items!.task.filter(
      (item) => item.dayOrEvening.value == 1 || item.dayOrEvening.value == 3
    );

    dayTask.sort((a, b) => a.type!.value! - b.type!.value!);
    eveningTask.sort((a, b) => a.type!.value! - b.type!.value);

    const classText = (item: taskObjectDB) =>
      classNames(style.text, item.closed.day ? style.closed : "");
    const classCloseLineDay = (item: taskObjectDB) =>
      classNames(style.closeLine, item.closed.day ? style.active : "");
    const classCloseLineEvening = (item: taskObjectDB) =>
      classNames(style.closeLine, item.closed.evening ? style.active : "");

    const handlerCloseDay = (e: React.SyntheticEvent) => closeTask(e, true);
    const handlerCloseEvening = (e: React.SyntheticEvent) =>
      closeTask(e, false);

    return (
      <div className={style.todoList}>
        <h1>План ухода на {getDayList() || "сегодня"}</h1>
        <div className={style.todoWrapper}>
          {dayTask[0] || eveningTask[0] ? (
            <div className={style.content}>
              <div className={style.top}>
                {dayTask[0] && (
                  <>
                    <h2 className={style.h2}>Утро:</h2>
                    <ul className={style.list}>
                      {dayTask.map((item, i) => {
                        return (
                          <li
                            key={i}
                            className={style.item}
                            data-type={item.type!.value}
                          >
                            <p className={classText(item)}>
                              <span className={classCloseLineDay(item)}></span>
                              {item.name}
                            </p>

                            <div
                              className={style.closeWrapper}
                              data-name={item.name}
                              data-key={moment(item.date).format(TASKKEY)}
                              onClick={handlerCloseDay}
                            >
                              <div className={style.close}>
                                <ArrowCheck
                                  check={item.closed.day}
                                  componentClass={style.arrow}
                                />
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>

              <div className={style.bottom}>
                {eveningTask[0] && (
                  <>
                    <h2 className={style.h2}>Вечер:</h2>
                    <ul className={style.list}>
                      {eveningTask.map((item, i) => {
                        return (
                          <li
                            key={i + "1"}
                            className={style.item}
                            data-type={item.type!.value}
                          >
                            <p className={classText(item)}>
                              <span
                                className={classCloseLineEvening(item)}
                              ></span>
                              {item.name}
                            </p>

                            <div
                              className={style.closeWrapper}
                              data-name={item.name}
                              data-key={moment(item.date).format(TASKKEY)}
                              onClick={handlerCloseEvening}
                            >
                              <div className={style.close}>
                                <ArrowCheck
                                  check={item.closed.evening}
                                  componentClass={style.arrow}
                                />
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
              <div className={style.addTask}>
                <h2 className={style.h2}>Новая задача на сегодня:</h2>
                <div className={style.addTaskWrapper}>
                  <input
                    type="text"
                    placeholder="Новая задача"
                    className={style.inputAdd}
                    ref={refInput}
                  />
                  <div className={style.selectWrapper} ref={refSelect}>
                    <Select
                      size="mini"
                      className={style.selectAdd}
                      placeholder="Утро и вечер"
                      options={dataFields.dayTime}
                      defaultValue={1}
                      onChange={(e, data) => {
                        setSelectValue(data.value as number);
                      }}
                    />
                    <Button
                      color="green"
                      onClick={(e) => {
                        TaskDB.get(date.format(TASKKEY))
                          .then((x) => {
                            const newCollection = x;
                            const text = refInput!.current!.value;
                            const value = selectValue;
                            newCollection.task.push({
                              name: text,
                              description: "",
                              timingDelay: {
                                value: -1,
                                text: "",
                              },
                              dayOrEvening: {
                                value: value,
                                text: "",
                              },
                              type: {
                                value: 9999,
                                text: "",
                              },
                              date: date.toDate(),
                              closed: {
                                day: false,
                                evening: false,
                              },
                            });
                            return newCollection;
                          })
                          .then((data) => {
                            const item = data.task.find(
                              (item: taskObjectDB) =>
                                item.name === refInput!.current!.value
                            );
                            TaskDB.delete(date.format(TASKKEY))
                              .then(() =>
                                TaskDB.set(date.format(TASKKEY), data)
                              )
                              .then(() => {
                                stores!.Task.taskState!.task.push(item);
                              });
                          });
                      }}
                    >
                      Добавить
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>На сегодня задач нету</p>
          )}
        </div>
      </div>
    );
  })
);
