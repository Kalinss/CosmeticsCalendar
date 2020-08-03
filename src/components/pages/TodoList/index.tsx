import React, { useEffect, useState } from "react";
import {TodoListTemplate } from "../../templates";
import { IMainStore } from "../../../stores";
import { getLastStringLocationPath } from "../../../utils/string";
import moment from "moment";
import { TaskDB } from "../../../database";
import { dateСomparison } from "../../../utils/dates";
import { itemCosmeticPrimaryType } from "types";
import { inject, observer } from "mobx-react";
// todo refactoring
export const TodoList: React.FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const [loading, setLoading] = useState(true);
    const currentTask = stores!.Task.getState();
    const load = async () => {
      const path = window.location.pathname.trim();
      const date = getLastStringLocationPath(path);
      const checkDate = (date: string) =>
        /\d{2}\.\d{2}\.\d{4}/g.test(date.trim());
      const key = checkDate(date) ? moment(date, "L") : moment(new Date());

      await TaskDB.get(key.format("YYYYMMDD")).then((item) => {
        if (!item) {
          // if task not found => create task and save him in BD
          const itemsCosmetic = stores!.ItemsCosmetic.items;

          if (!itemsCosmetic) return false;

          const desiredDate = key.toDate();

          const arr = stores!.ItemsCosmetic.items.filter((item: any) => {
            return dateСomparison(
              desiredDate,
              item.date,
              item.timingDelay.value
            );
          });

          TaskDB.set(key.format("YYYYMMDD"), {
            task: arr.map((item: itemCosmeticPrimaryType) => ({
              name: item.name,
              description: item.description,
              timingDelay: { ...item.timingDelay },
              dayOrEvening: { ...item.dayOrEvening },
              type: { ...item.type! },
              date: item.date,
              closed: { day: false, evening: false },
            })),
            date: desiredDate,
          });

          stores!.Task.setState({
            task: arr.map((item: itemCosmeticPrimaryType) => ({
              ...item,
              closed: { day: false, evening: false },
            })),
            date: desiredDate,
          });

          setLoading(false);
        } else {
          stores!.Task.setState({
            task: [...item.task],
            date: item.date,
          });
          setLoading(false);
        }
      });
    };

    useEffect(() => {
      load();
    }, []);

    return loading ? (
      <p>123</p>
    ) : (
      <>
        <TodoListTemplate/>
      </>
    );
  })
);
