import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { taskObjectDB, uploadDailyTaskProps } from "types";
import { toJS } from "mobx";
import { TaskDB } from "../../utils/database/taskDB";
import { dateСomparison } from "../../utils/dates";
import { Task } from "../../stores/Task";
import { getLastStringLocationPath } from "../../utils/string";
import moment from "moment";

export const UploadDailyTask: React.FunctionComponent<uploadDailyTaskProps> = inject(
  "stores"
)(
  observer(({ stores, children }) => {
    const [loading, setLoading] = useState(true);
    const currentTask = stores!.Task.getState();

    const load = () => {
      const path = window.location.pathname.trim();
      const date = getLastStringLocationPath(path);
      const key = moment(date, "L");

      TaskDB.get(key.format("YYYYMMDD")).then((item) => {
        if (!item) {
          // if task not found => create task and save him in BD
          const itemsCosmetic = stores!.ItemsCosmetic.items;

          if (!itemsCosmetic) return false;

          const desiredDate = key.toDate();

          const arr = stores!.ItemsCosmetic.items.filter((item) => {
            return dateСomparison(
              desiredDate,
              item.date,
              item.timingDelay.value
            );
          });

          TaskDB.set(key.format("YYYYMMDD"), {
            task: arr.map((item) => ({
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
            task: arr.map((item) => ({
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

    return <>{loading ? <p>123</p> : children}</>;
  })
);
