import React from "react";
import style from './style.scss'
export const Menu =()=>{
    return(
        // todo links
        <nav className={style.menu}>
            <ul className={style.list}>
                <li className={style.item}><span>Главная страница</span></li>
                <li className={style.item}><span>Каталог</span></li>
                <li className={style.item}><span>Настройки</span></li>
            </ul>
        </nav>
    )
}