import React, { useEffect, useRef, useState } from "react";
import style from "./style.scss";
import { HeaderContent, Menu } from "../../molecules";

export const Header = () => {
  const [isVisible, setVisible] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [heightMenu, setHeightMenu] = useState("0px");
  const animationDuration = 0.5; //second
  const menu = useRef(null);

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

  const clickMenu = () => {
    close();
    setTimeout(() => setVisible(false), animationDuration * 1000);
  };

  useEffect(() => {
    setHeightMenu(`-${getComputedStyle(menu.current!).height}`);
  }, []);

  return (
    <header className={style.header}>
      <div
        className={style.field}
        style={{ display: isOpen ? "block" : "none" }}
        onClick={() => {
          toggleMenu();
        }}
      />
      <HeaderContent hamburgerClickHandler={toggleMenu} isOpen={isOpen} />
      <div
        className={style.menuWrapper}
        style={{
          transform: `translateY(${isOpen ? "0px" : heightMenu})`,
          transition: `${animationDuration}s ease`,
          visibility: isVisible ? "visible" : "hidden",
        }}
        ref={menu}
      >
        <Menu clickHandler={clickMenu} />
      </div>
    </header>
  );
};
