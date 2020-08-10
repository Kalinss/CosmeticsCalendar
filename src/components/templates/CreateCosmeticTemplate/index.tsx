import React from "react";
import { Page, Content } from "../index";
import style from "./style.scss";
import { CreateCosmeticForm } from "../../organisms/index";
import { MainStore } from "../../../stores";
import { formDataType } from "types";
import { Alert } from "../../organisms/index";

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
        ></Alert>
      </Content>
    </Page>
  );
};
