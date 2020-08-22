import React from "react";
import { Alert, EditCosmeticForm } from "../../organisms/index";
import { Content, Page } from "../index";
import { formDataType, itemCosmeticPrimaryType } from "types";

type typeEditCosmeticTemplate = {
  changeHandler: (e: any, data: formDataType) => any;
  defaultValues: itemCosmeticPrimaryType;
  clickHandler: VoidFunction;
  disabled?: boolean;
  isOpenAlert?: boolean;
  popupHandler?: VoidFunction;
};
export const EditCosmeticTemplate: React.FC<typeEditCosmeticTemplate> = ({
  changeHandler,
  defaultValues,
  clickHandler,
  disabled = true,
  isOpenAlert = false,
  popupHandler = () => {},
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
        <Alert
          description="Успешно изменено"
          buttonName="Ок"
          title={(defaultValues && defaultValues.name) || ""}
          isOpen={isOpenAlert}
          clickHandler={popupHandler}
        />
      </Content>
    </Page>
  );
};
