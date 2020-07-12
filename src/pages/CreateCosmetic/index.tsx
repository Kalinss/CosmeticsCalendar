import React, { FunctionComponent, useState, useRef } from "react";
import { Page } from "../../components/Page/index";
import { Header } from "../../components/Header/index";
import { Content } from "../../components/Content";
import { Input, Form, TextArea, Select, Button } from "semantic-ui-react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import style from "./style.scss";
import data from "./data";
import { IMainStore } from "../../stores/MainStore";
import {
  isNotEmpty,
  getErrorValidation,
  alreadyIdExistsInDB,
} from "../../utils/validation";

export const CreateCosmetic: FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const createCosmetic = stores!.CreateCosmetic;
    const nameField = createCosmetic.fields.name;
    const descriptionField = createCosmetic.fields.description;
    const timingDelay = createCosmetic.fields.timingDelay;
    const dayOrEvening = createCosmetic.fields.dayOrEvening;
    const type =

    const [disabledButton, setDisabled] = useState(true);
    const handlerClick = ()=>{

    };
    const handlerName = (e: React.SyntheticEvent) => {
      const value = (e.target as HTMLInputElement).value.trim();
      const empty = isNotEmpty(value);
      nameField.error = "";
      if (empty) {
        nameField.error = getErrorValidation(empty);
        setDisabled(true);
        return;
      }
      alreadyIdExistsInDB(value).then((result) => {
        if (result) {
          nameField.error = "Такое имя уже существует";
          setDisabled(true);
          return;
        } else {
          nameField.value = value;
          setDisabled(false);
        }
      });
    };

    return (
      <Page>
        <Header />
        <Content>
          <h1 className={style.h1}>Создание косметики</h1>
          <Form className={style.form}>
            <div className={style.inputWrapper}>
              <label className={style.label}>Название</label>
              <Input
                onBlur={handlerName}
                placeholder={data.name}
                className={nameField.error && style.error}
              />
              <span className={style.errorText}>{nameField.error}</span>
            </div>

            <div className={style.inputWrapper}>
              <label className={style.label}>Описание</label>
              <TextArea placeholder={data.description} />
            </div>

            <div className={style.inputWrapper}>
              <label className={style.label}>Напоминать каждые</label>
              <Select placeholder="2 дня" options={data.days} />
            </div>

            <div className={style.inputWrapper}>
              <label className={style.label}>Время дня</label>
              <Select placeholder="День и вечер" options={data.dayTime} />
            </div>

            <div className={style.inputWrapper}>
              <label className={style.label}>Тип косметики</label>
              <Select placeholder="0" options={data.priority} />
            </div>

            <Button secondary disabled={disabledButton}>
              Добавить
            </Button>
          </Form>
        </Content>
      </Page>
    );
  })
);
