import React from "react";
import style from "./style.scss";
import classNames from "classnames";

type typeHamburger = {
  handlerClick?: () => void;
  active: boolean;
};

export const Hamburger: React.FC<typeHamburger> = ({
  active,
  handlerClick = () => {},
}) => {
  return (
    <div
      onClick={() => {
        handlerClick();
      }}
      className={classNames(style.button, active ? style.open : false)}
    >
      <span />
      <span />
      <span />
    </div>
  );
};
