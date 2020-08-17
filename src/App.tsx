import React, { ReactNode, useState, useEffect } from "react";
import {
  CreateCosmetic,
  ItemsCosmeticList,
  EditCosmetic,
  Main,
  TodoList,
  Setting,
  CalendarPage,
} from "./components/pages/index";
import "./styles/reset.scss";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import stores from "./stores/store";
import { toJS } from "mobx";
import { Preloader } from "./components/organisms/Preloader";
import {
  uploadSetting,
  openCollections,
  createCollections,
  cleaningOldTask,
  uploadAdditional,
} from "./controller";
import { Header } from "./components/organisms/Header";
import config from "./config";
import { Alert } from "./components/organisms/Popup/Alert";

export const App: React.FunctionComponent = () => {
  const [loader, setLoader] = useState(true);

  type loaderType = {
    children: ReactNode;
  };
  const Loader: React.FC<loaderType> = ({ children }) => {
    return <>{loader ? <Preloader /> : children}</>;
    // Preloader ->children
  };
  useEffect(() => {
    createCollections()
      .then(() => openCollections())
      .then(() => uploadSetting())
      .then(() => uploadAdditional())
      .then(() => cleaningOldTask())
      .then(() => stores.ItemsCosmetic.loadAllItemsFromDB())
      .then(() => setTimeout(() => setLoader(false), config.preloadTime));
  }, []);

  return (
    <Provider stores={stores}>
      <Loader>
        <Router>
          <Header />
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
      </Loader>
    </Provider>
  );
};
