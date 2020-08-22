import React, { useState } from "react";
import style from "./style.scss";
import { Button, DropdownProps, Form } from "semantic-ui-react";
import { dataFields } from "../../../utils/mocks/dataFields";
import moment from "moment";
import { formDataType } from "types";
import { MainStore } from "../../../stores";
import {
  DataRecord,
  InputRecord,
  SelectRecord,
  TextAreaRecord,
} from "../../molecules/index";

type typeFieldChangeHandler = (e: any, data: formDataType) => any;

type CreateCosmeticForm = {
  stores: MainStore;
  disabled: boolean;
  changeHandler?: typeFieldChangeHandler;
  error?: string;
  clickHandler: VoidFunction;
};
export const CreateCosmeticForm: React.FC<CreateCosmeticForm> = ({
  disabled,
  changeHandler = () => {},
  error = "",
  clickHandler = () => {},
}) => {
  const [currentName, setCurrentName] = useState("");

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
    <>
      <h1 className={style.h1}>Создание косметики</h1>
      <Form className={style.form}>
        <InputRecord
          label="Название"
          error={error}
          blurHandler={(e) => {
            setCurrentName(e.target.value);
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
    </>
  );
};
