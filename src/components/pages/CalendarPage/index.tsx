import React from "react";
import { Content, Page } from "../../index";
import { Calendar } from "../../organisms/Calendar";
import style from "./style.scss";
import { inject, observer } from "mobx-react";
import { IMainStore } from "../../../stores";

export const CalendarPage: React.FC<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    return (
      <Page>
        <Content>
          <div className={style.wrapper}>
            <h2>Календарь</h2>
            <Calendar stores={stores} />
          </div>
        </Content>
      </Page>
    );
  })
);
