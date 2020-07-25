import React, { FunctionComponent } from "react";
import { Page } from "../../components/Page/index";
import { Calendar } from "../../components/Calendar/index";
import { Header } from "../../components/Header/index";
import { Content } from "../../components/Content";
import { IMainStore } from "../../stores/MainStore";
import { TodayWidgetTodoList } from "../../components/TodayWidgetTodoList";
import {UploadDailyTask} from "../../components/UploadDailyTask";

export const Main: FunctionComponent<IMainStore> = () => {
  return (
    <Page>
      <Header />
      <Content>
          <UploadDailyTask>
              <TodayWidgetTodoList />
          </UploadDailyTask>

        <Calendar />
      </Content>
    </Page>
  );
};
