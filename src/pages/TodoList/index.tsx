import React from "react";
import {
  Content,
  Header,
  Page,
  UploadDailyTask,
  TodoListContent,
} from "../../components/index";

import { IMainStore } from "../../stores/MainStore";

export const TodoList: React.FunctionComponent<IMainStore> = () => {
  return (
    <UploadDailyTask>
      <Page>
        <Header />
        <Content>
          <TodoListContent />
        </Content>
      </Page>
    </UploadDailyTask>
  );
};
