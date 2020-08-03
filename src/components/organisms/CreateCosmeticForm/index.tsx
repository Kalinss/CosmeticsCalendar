import React, { useState } from "react";
import style from "./style.scss";
import {
  alreadyIdExistsInDB,
  getErrorValidation,
  isNotEmpty,
} from "../../../utils/validation";
import { Page } from "../../templates/Page";
import { Content } from "../../templates/Content";
import {
  Button,
  DropdownProps,
  Form,
  Input,
  Select,
  TextArea,
} from "semantic-ui-react";
import { dataFields } from "../../pages/CreateCosmetic/dataFields";
import moment from "moment";
import {
  saveInDBNewItemCosmetic,
  updateTaskAfterNewItem,
} from "../../../utils/controlData";
import { expendedItemType, formDataType } from "types";
import { MainStore } from "../../../stores";
import {
  SelectRecord,
  DataRecord,
  TextAreaRecord,
  InputRecord,
} from "../../molecules/index";
import classNames from "classnames";
type typeFieldChangeHandler = (e: any, data: formDataType) => any;

type CreateCosmeticForm = {
  stores: MainStore;
  disabled: boolean;
  changeHandler?: typeFieldChangeHandler;
  error?: string;
  clickHandler: VoidFunction;
};
export const CreateCosmeticForm: React.FC<CreateCosmeticForm> = ({
  stores,
  disabled,
  changeHandler = () => {},
  error = "",
  clickHandler = () => {},
}) => {
  const itemsCosmetic = stores!.ItemsCosmetic!;
  const stateItem = stores!.ItemsCosmetic!.currentItem;

  const selectChangeHandler = (callback: typeFieldChangeHandler) => (
    field: string
  ) => (e: any, data: DropdownProps) => {
    const result = {
      field: field,
      value: data.value as number,
      text: (e.target as HTMLDivElement).innerText,
      error: "",
    };
    callback(e, result);
  };

  return (
    <Page>
      <Content>
        <h1 className={style.h1}>Создание косметики</h1>
        <Form className={style.form}>
          <InputRecord
            label="Название"
            error={error}
            blurHandler={(e) => {
              changeHandler(e, {
                field: "name",
                value: e.target.value,
                text: "",
                error: "",
              });
            }}
            classComponent={style.inputWrapper}
            placeholder={dataFields.name}
          />

          <TextAreaRecord
            label={"Описание"}
            classComponent={style.inputWrapper}
            placeholder={dataFields.description}
            blurHandler={(e) => {
              const data = {
                field: "description",
                value: e.target.value,
                text: "",
                error: "",
              };
              changeHandler(e, data);
            }}
          />

          <SelectRecord
            placeholder="2 дня"
            classComponent={style.inputWrapper}
            label="Повторять каждые"
            options={dataFields.days}
            changeHandler={selectChangeHandler(changeHandler)("timingDelay")}
          />

          <SelectRecord
            placeholder="Утро и вечер"
            classComponent={style.inputWrapper}
            label="Время дня:"
            options={dataFields.dayTime}
            changeHandler={selectChangeHandler(changeHandler)("dayOrEvening")}
          />
          <SelectRecord
            placeholder={dataFields.priority[0].text}
            classComponent={style.inputWrapper}
            label="Тип косметики"
            options={dataFields.priority}
            changeHandler={selectChangeHandler(changeHandler)("type")}
          />
          <DataRecord
            label="Дата"
            defaultValue={new Date()}
            classComponent={style.inputWrapper}
            changeHandler={(e) => {
              const result = {
                field: "date",
                value: moment(e.target.value).set({ hour: 15 }).toDate(),
                text: (e.target as HTMLDivElement).innerText,
                error: "",
              };
              changeHandler(e, result);
            }}
          />
          <Button secondary disabled={disabled} onClick={clickHandler}>
            Добавить
          </Button>
        </Form>
      </Content>
    </Page>
  );
};
