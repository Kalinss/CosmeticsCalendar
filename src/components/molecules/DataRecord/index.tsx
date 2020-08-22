import React, { ChangeEvent } from "react";
import moment from "moment";
import { FormLabel } from "../../atoms/FormLabel";

type typeDataRecord = {
  label: string;
  defaultValue: Date;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  classComponent?: string;
};
export const DataRecord: React.FC<typeDataRecord> = ({
  label,
  defaultValue,
  changeHandler,
  classComponent = "",
}) => {
  return (
    <div className={classComponent}>
      <FormLabel text={label} />
      <input
        defaultValue={moment(defaultValue).format("YYYY-MM-DD")}
        type="date"
        onChange={changeHandler}
      />
    </div>
  );
};
