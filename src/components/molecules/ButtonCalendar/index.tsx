import React from "react";
import style from "./style.scss";
import { ArrowCalendar } from "../../atoms/ArrowCalendar";
import classNames from "classnames";

type typeButtonCalendar = {
  disabled?: boolean;
  clickHandler?: VoidFunction;
  bottom?: boolean;
};

export const ButtonCalendar: React.FC<typeButtonCalendar> = ({
  clickHandler = () => {},
  disabled = false,
  bottom = false,
}) => {
  const classButton = classNames(style.button, bottom && style.bottom);

  return (
    <button className={classButton} onClick={clickHandler} disabled={disabled}>
      <div className={style.svgWrapper}>
        <ArrowCalendar />
      </div>
    </button>
  );
};
