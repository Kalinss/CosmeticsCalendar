import React, { FunctionComponent, useEffect } from "react";
import { Main } from "./pages/Main/index";
import { toJS } from "mobx";
import { CreateCosmetic } from "./pages/CreateCosmetic/index";
import { ItemsCosmeticList } from "./pages/ItemsCosmeticList/index";
import { EditCosmetic } from "./pages/EditCosmetic/index";
import "./styles/reset.scss";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Provider } from "mobx-react";
import { MainStore } from "./stores/MainStore";
import { CosmeticItemsModelDB } from "./utils/database/cosmeticItemsModelDB";
import { Upload } from "./components/UploadItemsCosmetic/index";
import { TodoList } from "./pages/TodoList";
import { TaskDB } from "./utils/database/taskDB";
import { Setting } from "./pages/Setting/index";
import { settingDB } from "./utils/database/settingDB";
import stores from "./stores/store";
import { uploadSetting } from "./utils/controlData";

// todo удобную загрузку
CosmeticItemsModelDB.open();
TaskDB.open();
settingDB.open().catch(console.log).then(console.log);

uploadSetting();

export const App: React.FunctionComponent = () => {
  return (
    <Provider stores={stores}>
      <Upload>
        <Router>
          <Switch>
            {/*Перебрать маршруты*/}

            <Route path="/items">
              <ItemsCosmeticList />
            </Route>
            <Route path="/edit">
              <EditCosmetic />
            </Route>
            <Route path="/create">
              <CreateCosmetic />
            </Route>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/todolist">
              <TodoList />
            </Route>
            <Route path="/setting">
              <Setting />
            </Route>
          </Switch>
        </Router>
      </Upload>
    </Provider>
  );
};
