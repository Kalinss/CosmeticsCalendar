import React from "react";
import {
  Content,
  Header,
  Page,
  UploadDailyTask,
  TodoListContent,
} from "../../components";

import { IMainStore } from "../../stores";

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
