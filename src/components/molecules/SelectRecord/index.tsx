import React from "react";
import style from "./style.scss";
import { DropdownItemProps, DropdownProps, Select } from "semantic-ui-react";
import { dataFields } from "../../pages/CreateCosmetic/dataFields";
import { FormLabel } from "../../atoms/FormLabel";
import { StrictSelectProps } from "semantic-ui-react/dist/commonjs/addons/Select";

type typeSelectRecord = {
  label: string;
  defaultValue: string | number;
  changeHandler: (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => void;
  placeholder: string;
  options: DropdownItemProps[];
  classComponent?: string;
};
export const SelectRecord: React.FC<typeSelectRecord> = ({
  label,
  defaultValue,
  changeHandler,
  placeholder,
  options,
  classComponent = "",
}) => {
  return (
    <div className={classComponent}>
      <FormLabel text={label} />
      <Select
        placeholder={placeholder}
        options={options}
        fluid
        selection
        defaultValue={defaultValue}
        onChange={changeHandler}
      />
    </div>
  );
};
