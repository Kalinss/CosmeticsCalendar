import React, { useState } from "react";
import style from "./style.scss";
import { Logo, Hamburger } from "../../atoms/index";
import LogoImage from '../../../media/svg/main-logo.svg'

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
        <Logo  src={LogoImage} alt={'logo'} />
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
