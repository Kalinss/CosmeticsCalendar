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
