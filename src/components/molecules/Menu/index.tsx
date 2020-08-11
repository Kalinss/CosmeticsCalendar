import React from "react";
import style from "./style.scss";
import { Link } from "react-router-dom";

type Menu ={
  clickHandler:VoidFunction
}
export const Menu:React.FC<Menu> = ({clickHandler}) => {
  return (
    <nav className={style.menu}>
      <ul className={style.list} onClick={clickHandler}>
        <li className={style.item}>
          <Link to="/">
            <div>
              <span>Главная страница</span>
            </div>
          </Link>
        </li>
        <li className={style.item}>
          <Link to="/calendar">
            <div>
              <span>Календарь</span>
            </div>
          </Link>
        </li>
        <li className={style.item}>
          <Link to="/items">
            <div>
              <span>Каталог</span>
            </div>
          </Link>
        </li>
        <li className={style.item}>
          <Link to="/setting">
            <div>
              <span>Настройки</span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
