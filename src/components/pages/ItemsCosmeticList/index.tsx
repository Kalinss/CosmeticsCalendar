import React, { FunctionComponent, useReducer } from "react";
import { IMainStore } from "../../../stores";
import { inject, observer } from "mobx-react";
import { ItemsCosmeticTemplate } from "../../templates";
import { CosmeticItemsModelDB } from "../../../database";
import {
  updateTaskAfterDeleteItem,
  deleteItemCosmetic,
} from "../../../controller";
import { itemCosmeticPrimaryType } from "types";

export const ItemsCosmeticList: FunctionComponent<IMainStore> = inject(
  "stores"
)(
  observer(({ stores }) => {
    const deleteHandler = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      data: itemCosmeticPrimaryType
    ) => {
      const confirm: any = window.confirm(
        "Вы уверены, что хотите удалить этот элемент?"
      );
      if (confirm) {
        deleteItemCosmetic(data).then(() => {
          alert("Успешно удалено");
          forceUpdate();
        });
      }
      return;
    };
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    return (
      <ItemsCosmeticTemplate stores={stores!} deleteHandler={deleteHandler} />
    );
  })
);
