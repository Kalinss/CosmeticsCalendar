import React from "react";
import { MainStore } from "../../../stores/index";
import {
  Content,
  Page,
  TodayWidgetTodoList,
  TodoListContent,
} from "../../index";
import { Calendar } from "../../organisms/Calendar";
import {toJS} from 'mobx';

type typeMainTemplate = {
  stores: MainStore;
};

export const MainTemplate: React.FC<typeMainTemplate> = ({ stores }) => {
  stores!.Setting.config;
  console.log(toJS(stores!.Setting.config));
  const isViewField = (
    key: string // checks that store has a field
  ) => {
    const result = stores!.Setting.config.find((item) => item.key === key);
    if(!(result)) return false;
    return result.value
  };

  const TodayWidgetWrap = () =>
      isViewField("todoListWidget") ? <TodayWidgetTodoList /> : <></>;

  const CalendarWrap = () =>
      isViewField("calendar") ? <Calendar stores={stores} /> : <></>;

  const FullTodoListWrap = () =>isViewField("todoListFull") ? <TodoListContent /> : <></>;



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
