import React, { FunctionComponent, useEffect, useState } from "react";
import { IMainStore } from "../../../stores";
import { MainTemplate } from "../../templates";
import { inject, observer } from "mobx-react";
import { getLastStringLocationPath } from "../../../utils/string";
import moment from "moment";
import { TaskDB } from "../../../database/taskDB";
import { dateСomparison } from "../../../utils/dates";
import { itemCosmeticPrimaryType } from "types";
import { deepClone } from "../../../utils/other";
import {onloadTaskForDate} from "../../../controller";
import {LoaderComponent} from "../../organisms/Loader";

export const Main: FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const [loading, setLoading] = useState(true);
    const currentTask = stores!.Task.getState();
    stores!.Setting.config
    const load = async () => {
      const path = window.location.pathname.trim();
      const dateString = getLastStringLocationPath(path);

      onloadTaskForDate(dateString).then(()=>{
        console.log('я загрузился')
        setLoading(false);
      })

  };

    useEffect(() => {
      load();
    }, []);

    return loading ? <LoaderComponent/> : <MainTemplate stores={stores!} />;
  })
);
