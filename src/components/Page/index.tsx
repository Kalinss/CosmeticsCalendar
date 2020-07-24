import React, { FunctionComponent } from "react";
import style from "./style.scss";
import { IMainStore } from "../../stores/MainStore";

export const Page: FunctionComponent<IMainStore> = ({ children }) => {
  return (
    <>
      <div className={style.page}>
        <div className={style.wrapper}>{children}</div>
      </div>
    </>
  );
};
