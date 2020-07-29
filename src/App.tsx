import React, { ReactNode, useState, useEffect } from "react";
import {
  CreateCosmetic,
  ItemsCosmeticList,
  EditCosmetic,
  Main,
  TodoList,
  Setting,
  CalendarPage,
} from "./pages/index";
import "./styles/reset.scss";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import { Upload } from "./components/index";
import stores from "./stores/store";
import {
  uploadSetting,
  openCollections,
  createCollections,
  cleaningOldTask,
} from "./utils/controlData";

export const App: React.FunctionComponent = () => {
  const [loader, setLoader] = useState(true);

  type loaderType = {
    children: ReactNode;
  };
  const Loader: React.FC<loaderType> = ({ children }) => {
    return <div>{loader ? <p>123</p> : children}</div>;
  };

  useEffect(() => {
    createCollections()
      .then(() => openCollections())
      .then(() => uploadSetting())
      .then(() => cleaningOldTask())
      .then(() => setLoader(false));
  }, []);

  return (
    <Provider stores={stores}>
      <Loader>
        <Upload>
          <Router>
            <Switch>
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
              <Route path="/calendar">
                <CalendarPage />
              </Route>
            </Switch>
          </Router>
        </Upload>
      </Loader>
    </Provider>
  );
};
