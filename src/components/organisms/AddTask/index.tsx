import React, { useState } from "react";
import style from "./style.scss";
import {Button, DropdownProps, Select} from "semantic-ui-react";
import { dataFields } from "../../../utils/mocks/dataFields";
import {clickHandlerType} from './type'

export type AddTaskType = {
  clickHandler: clickHandlerType;
};
export const AddTask: React.FC<AddTaskType> = ({ clickHandler }) => {

  const [valueInput, setValueInput] = useState("");
  const [valueSelect, setValueSelect] = useState(1);

  const changeInputHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setValueInput(e.target.value);
  };
  const changeSelectHandler = (e:React.SyntheticEvent,data:DropdownProps)=>{
      setValueSelect(data.value as number);
  }

  return (
    <div>
      <h2 className={style.h2}>Новая задача на сегодня:</h2>
      <div className={style.addTaskWrapper}>
        <input
          type="text"
          placeholder="Новая задача"
          className={style.inputAdd}
          onChange ={changeInputHandler}
          value={valueInput}
        />
        <div className={style.selectWrapper}>
          <Select
            size="mini"
            className={style.selectAdd}
            placeholder="Утро и вечер"
            options={dataFields.dayTime}
            defaultValue={1}
            onChange={(e,data)=>{changeSelectHandler(e,data)}}
          />
          <Button
            color="black"
            onClick={(e) => {
              clickHandler(valueInput,valueSelect);
              setValueInput('')
            }}
          >
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
};
