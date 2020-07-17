import React, { FunctionComponent, useEffect } from "react";
import { Main } from "./pages/Main/index";
import {toJS} from 'mobx';
import { CreateCosmetic } from "./pages/CreateCosmetic/index";
import { ItemsCosmeticList } from "./pages/ItemsCosmeticList/index";
import { EditCosmetic } from "./pages/EditCosmetic/index";
import "./styles/reset.scss";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "mobx-react";
import { MainStore } from "./stores/MainStore";
import { CosmeticItemsModelDB } from "./utils/database/cosmeticItemsModelDB";
import { Upload } from "./components/Upload/index";

CosmeticItemsModelDB.open();

const stores = new MainStore();

export const App: React.FunctionComponent = () => {
  return (
    <Provider stores={stores}>
      <button
      onClick ={()=>{
        console.log(toJS(stores.ItemsCosmetic.items))
      }}
      >
        123123
      </button>
      <Router>
        <Switch>
          <Upload>
            <Route path="/items">
              <ItemsCosmeticList />
            </Route>
            <Route path="/edit">
              <EditCosmetic />
            </Route>
            <Route path="/create">
              <CreateCosmetic />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Upload>
        </Switch>
      </Router>
    </Provider>
  );
};
