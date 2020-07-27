import React, { useState } from "react";
import style from "./style.scss";
import classNames from "classnames";

type HamburgerButtonType = {
  handlerClick: () => void;
  active: boolean;
};

export const HamburgerButton: React.FunctionComponent<HamburgerButtonType> = ({
  handlerClick,
  active,
}) => {
  return (
    <div
      onClick={() => {
        handlerClick();
      }}
      className={classNames(style.button, active ? style.open : false)}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
