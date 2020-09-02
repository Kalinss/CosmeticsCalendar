import React, { ReactNode, useEffect, useState } from "react";
import {
  CalendarPage,
  CreateCosmetic,
  EditCosmetic,
  ItemsCosmeticList,
  Main,
  Setting,
  TodoList,
} from "./components/pages/index";
import "./styles/reset.scss";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "mobx-react";
import stores from "./stores/store";
import { Preloader } from "./components/organisms/Preloader";
import { Controller } from "./controller";
import { Header } from "./components/organisms/Header";
import config from "./config";

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
    Controller.createCollections()
      .then(() => Controller.openCollections())
      .then(() => Controller.uploadSetting())
      .then(() => Controller.uploadAdditional())
      .then(() => Controller.cleaningOldTask())
      .then(() => stores.ItemsCosmetic.loadAllItemsFromDB())
      .then(() => Controller.controlFirstEntry())
      .then(() => setTimeout(() => setLoader(false), config.preloadTime));
  }, []);

  return (
    <Provider stores={stores}>
      <Loader>
        <Router>
          <Header />
          <Switch>
            <Route path={`${config.baseHref}/items`}>
              <ItemsCosmeticList />
            </Route>
            <Route path={`${config.baseHref}/edit`}>
              <EditCosmetic />
            </Route>
            <Route path={`${config.baseHref}/create`}>
              <CreateCosmetic />
            </Route>
            <Route exact path={`${config.baseHref}/`}>
              <Main />
            </Route>
            <Route path={`${config.baseHref}/todolist`}>
              <TodoList />
            </Route>
            <Route path={`${config.baseHref}/setting`}>
              <Setting />
            </Route>
            <Route path={`${config.baseHref}/calendar`}>
              <CalendarPage />
            </Route>
          </Switch>
        </Router>
      </Loader>
    </Provider>
  );
};
