import React from "react";
import { MainStore } from "../../../stores/index";
import {
  Content,
  Page,
  TodayWidgetTodoList,
  TodoListContent,
} from "../../index";
import { Calendar } from "../../organisms/Calendar";

type typeMainTemplate = {
  stores: MainStore;
};

export const MainTemplate: React.FC<typeMainTemplate> = ({ stores }) => {
  stores!.Setting.config;

  const getField = (
    key: string // checks that store has a field
  ) => stores!.Setting.config.find((item) => item.key === key);

  const TodayWidgetWrap = () =>
    getField("todoListWidget") ? <TodayWidgetTodoList /> : <></>;

  const CalendarWrap = () =>
    getField("calendar") ? <Calendar stores={stores} /> : <></>;

  const FullTodoListWrap = () =>
    getField("todoListFull") ? <TodoListContent /> : <></>;

  return (
    <Page>
      <Content>
        <TodayWidgetWrap></TodayWidgetWrap>
        <CalendarWrap></CalendarWrap>
        <FullTodoListWrap></FullTodoListWrap>
      </Content>
    </Page>
  );
};
