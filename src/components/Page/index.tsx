import React, { FunctionComponent, ReactElement } from "react";
import style from "./style.scss";

type props = {
  //todo any
  children: any;
};

export const Page: FunctionComponent<props> = (props) => (
  <div className={style.page}>
    <div className={style.wrapper}>{props.children}</div>
  </div>
);
