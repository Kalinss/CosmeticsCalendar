import React, { useState } from "react";
import style from "./style.scss";
import classNames from "classnames";

type HamburgerButtonType = {
  handlerClick: () => void;
};

export const HamburgerButton: React.FunctionComponent<HamburgerButtonType> = ({
  handlerClick,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => {
        handlerClick();
        setOpen(!open);
      }}
      className={classNames(style.button, open ? style.open : false)}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
