import React from "react";
import { EditCosmeticForm } from "../../organisms/index";
import { Page, Content } from "../index";
import { MainStore } from "../../../stores";
import {
  expandedItemCosmeticField,
  formDataType,
  itemCosmeticPrimaryType,
} from "types";

type typeEditCosmeticTemplate = {
  changeHandler: (e: any, data: formDataType) => any;
  defaultValues: itemCosmeticPrimaryType;
  clickHandler: VoidFunction;
  disabled?: boolean;
};
export const EditCosmeticTemplate: React.FC<typeEditCosmeticTemplate> = ({
  changeHandler,
  defaultValues,
  clickHandler,
  disabled = true,
}) => {
  return (
    <Page>
      <Content>
        <EditCosmeticForm
          fieldChangeHandler={changeHandler}
          defaultValues={defaultValues}
          clickHandler={clickHandler}
          disabled={disabled}
        />
      </Content>
    </Page>
  );
};
