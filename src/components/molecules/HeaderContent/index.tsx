import React, { useState } from "react";
import style from "./style.scss";
import { Logo, Hamburger } from "../../atoms/index";

type typeHeaderContent = {
  isOpen: boolean;
  hamburgerClickHandler?: () => void;
};

export const HeaderContent: React.FC<typeHeaderContent> = ({
  isOpen,
  hamburgerClickHandler = () => {},
}) => {
  return (
    <div className={style.headerContent}>
      <div className={style.left}>
        <Logo />
      </div>
      <div className={style.right}>
        <button className={style.setting}>
          <div className={style.hamburgerWrapper}>
            <Hamburger handlerClick={hamburgerClickHandler} active={isOpen} />
          </div>
        </button>
      </div>
    </div>
  );
};
