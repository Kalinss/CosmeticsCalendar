import React from "react";
import { Content, Page } from "../../index";
import { Checkbox } from "semantic-ui-react";
import style from "./style.scss";
import { inject, observer } from "mobx-react";
import { settingType } from "types";
import { MainStore } from "../../../stores";
import { Controller } from "../../../controller";

export type SettingType = {
  stores?: MainStore;
};

export const Setting: React.FunctionComponent<SettingType> = inject("stores")(
  observer(({ stores }) => {
    const settingItem = ({ name, value, key }: settingType) => {
      return (
        <li className={style.item} key={key}>
          <Checkbox
            label={name}
            name={name}
            value={key}
            checked={value}
            onClick={() => {
              Controller.toggleSettingValueField(key);
            }}
          />
        </li>
      );
    };

    const settingItemsCollection = stores!.Setting.config
      .sort((a: settingType, b: settingType) => a.sort - b.sort)
      .map((item: any) => settingItem(item));

    return (
      <Page>
        <Content>
          <h2>Настройки:</h2>
          <ul className={style.list}>{settingItemsCollection}</ul>
          <br />
          <br />
          <p className={style.info}>
            Данное приложение не сохраняет никакую информацию о своих
            пользователях, а так же не передает информацию о пользователях 3
            лицам. Вся информация, введенная вами, сохраняется на ваших
            устройствах.
          </p>
          <p className={style.info}>
            Предложения по улучшению приложения, а также найденные вами ошибки
            присылайте на{" "}
            <a href="mailto:kalinss16@gmail.com">kalinss16@gmail.com</a>
          </p>
        </Content>
      </Page>
    );
  })
);
