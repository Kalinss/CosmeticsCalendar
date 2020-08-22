import React from "react";
import style from "./style.scss";

export const Content: React.FunctionComponent = (props) => (
  <main className={style.content}>{props.children}</main>
);
