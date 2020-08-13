import React from "react";
import { MainStore } from "../../../stores/index";
import { Content, Page, TodayWidgetTodoList } from "../../index";
import { toJS } from "mobx";
import { TodoListTemplate } from "../TodoListTemplate";
import { Calendar } from "../../organisms/Calendar";
import { clickHandlerType as clickButtonHandler } from "../../organisms/AddTask/type";
import { taskDB } from "types";

type typeMainTemplate = {
  stores: MainStore;
  clickAddButtonTodoWidget: clickButtonHandler;
  todoTask: taskDB;
  closeTaskTodoWidget: (day: boolean) => (e: any) => void;
};

export const MainTemplate: React.FC<typeMainTemplate> = ({
  stores,
  clickAddButtonTodoWidget,
  closeTaskTodoWidget,
  todoTask,
}) => {
  stores!.Setting.config;
  const isViewField = (
    key: string // checks that store has a field
  ) => {
    const result = stores!.Setting.config.find((item) => item.key === key);
    if (!result) return false;
    return result.value;
  };

  const TodayWidgetWrap = () =>
    isViewField("todoListWidget") ? <TodayWidgetTodoList /> : <></>;

  const CalendarWrap = () =>
    isViewField("calendar") ? <Calendar stores={stores} /> : <></>;

  const fullTodoListWrap = () =>
    isViewField("todoListFull") && (
      <TodoListTemplate
        items={todoTask}
        clickHandler={clickAddButtonTodoWidget}
        clickTaskHandler={closeTaskTodoWidget}
      />
    );

  return (
    <Page>
      <Content>
        <TodayWidgetWrap></TodayWidgetWrap>
        <CalendarWrap></CalendarWrap>
        {fullTodoListWrap()}
      </Content>
    </Page>
  );
};
