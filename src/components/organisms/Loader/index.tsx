import React from "react";
import style from "./style.scss";
import { Loader } from "semantic-ui-react";

export const LoaderComponent = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.loaderWrapper}>
        <Loader active inline="centered" />
      </div>
    </div>
  );
};
