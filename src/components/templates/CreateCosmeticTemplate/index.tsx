import React from "react";
import { Content, Page } from "../index";
import { Alert, CreateCosmeticForm } from "../../organisms/index";
import { MainStore } from "../../../stores";
import { formDataType } from "types";

type CreateCosmeticTemplate = {
  stores: MainStore;
  disabledButton: boolean;
  changeHandler: (e: any, data: formDataType) => void;
  error: string;
  clickHandler: VoidFunction;
  isOpenAlert?: boolean;
  popupHandler?: VoidFunction;
  cosmeticName?: string;
};

export const CreateCosmeticTemplate: React.FC<CreateCosmeticTemplate> = ({
  stores,
  disabledButton,
  changeHandler,
  error,
  clickHandler,
  popupHandler,
  isOpenAlert,
  cosmeticName,
}) => {
  return (
    <Page>
      <Content>
        <CreateCosmeticForm
          disabled={disabledButton}
          stores={stores}
          changeHandler={changeHandler}
          error={error}
          clickHandler={clickHandler}
        />
        <Alert
          buttonName="Ок"
          description="Успешно добавлено"
          title={cosmeticName || "Новая косметика"}
          isOpen={isOpenAlert}
          clickHandler={popupHandler}
        />
      </Content>
    </Page>
  );
};
