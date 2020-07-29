import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import {itemCosmeticPrimaryType, uploadDailyTaskProps} from "../../types";
import { TaskDB } from "../../database/index";
import { dateСomparison } from "../../utils/dates";
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
      const checkDate = (date:string) => ((/\d{2}\.\d{2}\.\d{4}/g).test(date.trim()));
      const key = checkDate(date) ? moment(date, "L"): moment(new Date());


      TaskDB.get(key.format("YYYYMMDD")).then((item) => {
        if (!item) {
          // if task not found => create task and save him in BD
          const itemsCosmetic = stores!.ItemsCosmetic.items;

          if (!itemsCosmetic) return false;

          const desiredDate = key.toDate();

          const arr = stores!.ItemsCosmetic.items.filter((item:any) => {
            return dateСomparison(
              desiredDate,
              item.date,
              item.timingDelay.value
            );
          });

          TaskDB.set(key.format("YYYYMMDD"), {
            task: arr.map((item:itemCosmeticPrimaryType) => ({
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
            task: arr.map((item:itemCosmeticPrimaryType) => ({
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
