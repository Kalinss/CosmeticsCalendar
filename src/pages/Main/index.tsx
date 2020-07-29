import React, { FunctionComponent } from "react";
import {
  Page,
  Calendar,
  Header,
  Content,
  UploadDailyTask,
  TodoListContent,
    TodayWidgetTodoList
} from "../../components";
import { IMainStore } from "../../stores";

import { toJS } from "mobx";
import { inject, observer } from "mobx-react";

export const Main: FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    stores!.Setting.config;
    const getField = (key: string) =>
      stores!.Setting.config.find((item) => item.key === key);

    const TodayWidgetWrap = () => {
      const field = getField("todoListWidget");
      if (field && field.value) {
        return (
          <UploadDailyTask>
            <TodayWidgetTodoList />
          </UploadDailyTask>
        );
      }
      return <></>;
    };

    const CalendarWrap = () => {
      const field = getField("calendar");
      if (field && field.value) {
        return <Calendar />;
      }
      return <></>;
    };

    const FullTodoListWrap = () => {
      const field = getField("todoListFull");
      if (field && field.value) {
        return (
          <UploadDailyTask>
            <TodoListContent />
          </UploadDailyTask>
        );
      }
      return <></>;
    };
    return (
      <Page>
        <Header />
        <Content>
          <TodayWidgetWrap></TodayWidgetWrap>
          <CalendarWrap></CalendarWrap>
          <FullTodoListWrap></FullTodoListWrap>
        </Content>
      </Page>
    );
  })
);
