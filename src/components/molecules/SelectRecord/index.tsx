import React from "react";
import style from "./style.scss";
import { DropdownItemProps, DropdownProps, Select } from "semantic-ui-react";
import { dataFields } from "../../../utils/mocks/dataFields";
import { FormLabel } from "../../atoms/FormLabel";
import { StrictSelectProps } from "semantic-ui-react/dist/commonjs/addons/Select";

type typeSelectRecord = {
  label: string;
  placeholder: string;
  options: DropdownItemProps[];
  defaultValue?: string | number;
  changeHandler?: (
      e: React.SyntheticEvent<HTMLElement, Event>,
      data: DropdownProps
  ) => void;
  classComponent?: string;
};
export const SelectRecord: React.FC<typeSelectRecord> = ({
  label,
  defaultValue,
  placeholder,
  options,
  changeHandler = () => {},
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
