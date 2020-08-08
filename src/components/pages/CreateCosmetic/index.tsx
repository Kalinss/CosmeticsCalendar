import React, { FunctionComponent, useReducer, useState } from "react";
import { inject, observer } from "mobx-react";
import { IMainStore } from "../../../stores";
import { CreateCosmeticTemplate } from "../../templates/CreateCosmeticTemplate";
import {
  alreadyIdExistsInDB,
  getErrorValidation,
  isNotEmpty,
} from "../../../utils/validation";
import { expendedItemType, formDataType } from "types";
import {
  saveInDBNewItemCosmetic,
  updateTaskAfterNewItem,
} from "../../../controller";

export const CreateCosmetic: FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const itemsCosmetic = stores!.ItemsCosmetic;
    const [buttonFormDisabled, setButtonFormDisabled] = useState(true);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    const nameFieldChange = (e: React.SyntheticEvent) => {
      const value = (e.target as HTMLInputElement).value.trim();
      const empty = isNotEmpty(value);
      itemsCosmetic.setCurrentField({ field: "name", error: "" });

      if (empty) {
        itemsCosmetic.setCurrentField({
          field: "name",
          error: getErrorValidation(empty),
        });
        setButtonFormDisabled(true);
        forceUpdate();
        return;
      }

      alreadyIdExistsInDB(value).then((result: any) => {
        if (result) {
          itemsCosmetic.setCurrentField({
            field: "name",
            error: "Такое имя уже существует",
          });
          setButtonFormDisabled(true);
        } else {
          itemsCosmetic.setCurrentField({
            field: "name",
            value: value,
            error: "",
          });
          setButtonFormDisabled(false);
        }
        forceUpdate();
      });
    };

    const changeField = (e: any, data: formDataType) => {
      if (data.field === "name") {
        nameFieldChange(e);
        return;
      }
      itemsCosmetic.setCurrentField({
        ...data,
      });
      forceUpdate();
    };

    const buttonClick = () => {
      saveInDBNewItemCosmetic(itemsCosmetic!.currentItem as expendedItemType)
        .then(() => updateTaskAfterNewItem())
        .then(() => {
          itemsCosmetic.clearCurrentItem();
          alert("Успешно добавленно");
          window.location.href = "/items";
        });
    };

    return (
      <CreateCosmeticTemplate
        changeHandler={changeField}
        stores={stores!}
        disabledButton={buttonFormDisabled}
        error={itemsCosmetic.currentItem.name.error || ""}
        clickHandler={buttonClick}
      />
    );
  })
);
