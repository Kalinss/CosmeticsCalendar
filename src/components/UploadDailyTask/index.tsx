import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { uploadDailyTaskProps } from "types";
import { toJS } from "mobx";
import { TaskDB } from "../../utils/database/taskDB";
import { dateСomparison } from "../../utils/dates/dates";
import { Task } from "../../stores/Task";
import moment from "moment";

export const UploadDailyTask: React.FunctionComponent<uploadDailyTaskProps> = inject(
  "stores"
)(
  observer(({ stores, children }) => {
    const [loading, setLoading] = useState(true);

    const currentTask = stores!.Task.getState();
    const items = toJS(stores!.ItemsCosmetic.items);

    const load = () => {
      const desiredDate = stores!.Setting.config.selectedDate;
      const key = moment(desiredDate);
      TaskDB.get(key.format("YYYYMMDD")).then((item) => {
        if (!item) {
          const itemsCosmetic = stores!.ItemsCosmetic.items;
          if (!itemsCosmetic) return false;

          const desiredDate = stores!.Setting.config.selectedDate;

          const arr = items.filter((item) => {
            return dateСomparison(
              stores!.Setting.config.selectedDate,
              item.date,
              item.timingDelay.value
            );
          });

          const key = moment(desiredDate);

          TaskDB.set(key.format("YYYYMMDD"), {
            task: arr.map((item) => ({ ...item, closed: false })),
            date: stores!.Setting.config.selectedDate,
          });

          stores!.Task.setState({
            task: arr.map((item) => ({ ...item, closed: false })),
            date: stores!.Setting.config.selectedDate,
          });

          // setLoading(false);
        } else {
          stores!.Task.setState({
            task: [...item.task],
            date: item.date,
          });

        }
      });
    };

    if (!currentTask.task) {
      load();
    }
    return <>{loading ? <p>123</p> : <p>123</p>}</>;
  })
);
