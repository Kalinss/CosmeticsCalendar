import 'regenerator-runtime/runtime'
import ReactDOM from "react-dom";
import React from 'react'
import { App } from "./src/App";
import {
    BrowserRouter
} from "react-router-dom";

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById("root"));
