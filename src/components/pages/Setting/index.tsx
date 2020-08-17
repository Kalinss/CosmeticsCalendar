import React from "react";
import { Content, Page, Header } from "../../index";
import { Checkbox } from "semantic-ui-react";
import style from "./style.scss";
import { inject, observer } from "mobx-react";
import { settingComponentType , settingType } from "types";
import { toggleSettingField } from "../../../controller";
import { SettingDB } from "../../../database";

export const Setting: React.FunctionComponent<settingComponentType> = inject(
  "stores"
)(
  observer(({ stores }) => {
    const settingItem = ({ name, value, key }: settingType) => {
      return (
        <li className={style.item} key={key}>
          <Checkbox
            label={name}
            name={name}
            value={key}
            checked={value}
            onClick={(e) => {
              toggleSettingField(key);
            }}
          />
        </li>
      );
    };

    return (
      <Page>
        <Content>
          <h2>Настройки:</h2>
          <ul className={style.list}>
            {stores!.Setting.config
              .sort((a: settingType, b: settingType) => a.sort - b.sort)
              .map((item: any) => settingItem(item))}
          </ul>
          <br />
          <br />
          <p className={style.info}>
            Данное приложение не сохраняет никакую информацию о своих
            пользователях, а так же не передает информацию о пользователях 3
            лицам. Вся информация, введенная вами, сохраняется на ваших
            устройствах.
          </p>
          <p className={style.info}>
            Предложения по улучшению приложения, а также найденные вами ошибки присылайте на{" "}
            <a href="mailto:kalinss16@gmail.com">kalinss16@gmail.com</a>
          </p>
        </Content>
        {/*<button*/}
        {/*  onClick={() => {*/}
        {/*    SettingDB.getAll()*/}
        {/*      .then((x) => x)*/}
        {/*      .then((x) =>*/}
        {/*        Promise.all(x.map((item: any) => SettingDB.delete(item.key)))*/}
        {/*      )*/}
        {/*      .then(() => alert("Перезагрузите страницу"));*/}
        {/*  }}*/}
        {/*>*/}
        {/*  delete all setting*/}
        {/*</button>*/}
      </Page>
    );
  })
);
