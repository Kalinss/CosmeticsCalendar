import React, { FunctionComponent } from "react";
import { Main } from "./pages/Main/index";
import { CreateCosmetic} from './pages/CreateCosmetic/index'
import "./styles/reset.scss";
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "mobx-react";
import { MainStore } from "./stores/MainStore";
import {CosmeticItemsModel} from './utils/database/cosmeticItemsModel';
CosmeticItemsModel.open();


const stores = new MainStore();


export const App: FunctionComponent = () => {
  return (
    <Provider stores={stores}>
      <Router>
        <Switch>
          <Route path="/create">
            <CreateCosmetic/>
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};
