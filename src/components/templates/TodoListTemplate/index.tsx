import React from "react";
import style from "./style.scss";
import { Content } from "../Content";
import { TodoListContent } from "../../organisms/TodoListContent";
import { Page } from "../Page";

export const TodoListTemplate = () => {
  return (
    <Page>
      <Content>
        <TodoListContent />
      </Content>
    </Page>
  );
};
