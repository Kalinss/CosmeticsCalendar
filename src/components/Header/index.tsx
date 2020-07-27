import React, { useState, useEffect, useRef } from "react";
import style from "./style.scss";
import { HamburgerButton } from "../HamburgerButton/index";
import { Menu } from "../Menu/index";

export const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [heightMenu, setHeightMenu] = useState("0px");
  const animationDuration = 0.5; //second
  const menu = useRef(null);

  useEffect(() => {
    setHeightMenu(`-${getComputedStyle(menu.current!).height}`);
  }, []);

  const open = () => setOpen(true);

  const close = () => setOpen(false);

  const toggleMenu = () => {
    if (isOpen) {
      close();
      setTimeout(() => setVisible(false), animationDuration * 1000);
    } else {
      setVisible(true);
      open();
    }
  };



  return (
    <header className={style.header}>
      <div
        className={style.field}
        style={{ display: isOpen ? "block" : "none" }}
        onClick={() => {
            toggleMenu()
        }}
      ></div>
      <div className={style.headerWrapper}>
        <div className={style.left}>
          <h1>Лого</h1>
        </div>
        <div className={style.right}>
          <button className={style.setting}>
            <div className={style.hamburgerWrapper}>
              <HamburgerButton handlerClick={toggleMenu} active={isOpen} />
            </div>
          </button>
        </div>
      </div>
      <div
        className={style.menuWrapper}
        style={{
          transform: `translateY(${isOpen ? "0px" : heightMenu})`,
          transition: `${animationDuration}s ease`,
          //@ts-ignore
          visibility: `${isVisible ? "visible" : "hidden"}`,
        }}
        ref={menu}
      >
        <Menu />
      </div>
    </header>
  );
};
