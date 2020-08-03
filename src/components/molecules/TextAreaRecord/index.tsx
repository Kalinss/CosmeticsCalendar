import React, { ChangeEvent } from "react";
import style from "./style.scss";
import { TextArea } from "semantic-ui-react";
import { FormLabel } from "../../atoms/FormLabel";

type typeTextAreaRecord = {
  label: string;
  defaultValue?: string;
  blurHandler?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  classComponent?: string;
  placeholder?: string;
};
export const TextAreaRecord: React.FC<typeTextAreaRecord> = ({
  label,
  defaultValue,
  blurHandler = () => {},
  classComponent = "",
  placeholder=''
}) => {
  return (
    <div className={classComponent}>
      <FormLabel text={label} />
      <TextArea
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={blurHandler}
      />
    </div>
  );
};
