import React from "react";
import style from "./style.scss";
import { Input } from "semantic-ui-react";
import classNames from "classnames";

type InputRecord = {
  label: string;
  blurHandler?: (e: any) => void;
  classComponent?: string;
  placeholder?: string;
  error?: string;
};

export const InputRecord: React.FC<InputRecord> = ({
  label,
  blurHandler,
  classComponent,
  placeholder,
  error = "",
}) => {
  return (
    <div className={classNames(classComponent)}>
      <label className={style.label}>{label}</label>
      <Input
        className={error && style.errorInput}
        placeholder={placeholder}
        onBlur={blurHandler}
      />
      <span className={style.errorText}>{error}</span>
    </div>
  );
};
