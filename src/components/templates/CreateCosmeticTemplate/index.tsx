import React from "react";
import { Page, Content } from "../index";
import style from "./style.scss";
import { CreateCosmeticForm } from "../../organisms/index";
import { MainStore } from "../../../stores";
import { formDataType } from "types";

type CreateCosmeticTemplate = {
  stores: MainStore;
  disabledButton: boolean;
  changeHandler: (e: any, data: formDataType) => void;
  error: string;
  clickHandler: VoidFunction;
};

export const CreateCosmeticTemplate: React.FC<CreateCosmeticTemplate> = ({
  stores,
  disabledButton,
  changeHandler,
  error,
  clickHandler,
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
      </Content>
    </Page>
  );
};
