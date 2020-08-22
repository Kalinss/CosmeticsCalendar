import React, {
  FunctionComponent,
  SyntheticEvent,
  useReducer,
  useState,
} from "react";
import { IMainStore } from "../../../stores";
import { inject, observer } from "mobx-react";
import { ItemsCosmeticTemplate } from "../../templates";

import { itemCosmeticPrimaryType } from "types";
import { Controller } from "../../../controller";

export const ItemsCosmeticList: FunctionComponent<IMainStore> = inject(
  "stores"
)(
  observer(({ stores }) => {
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [
      itemDeleteData,
      setItemDeleteData,
    ] = useState<itemCosmeticPrimaryType | null>(null);

    const deleteConfirmation = () => {
      setAlertOpen(false);
      forceUpdate();
    };

    const confirmButtonHandler = (
      e: SyntheticEvent<HTMLButtonElement, Event>
    ) => {
      if (!(e.target instanceof HTMLButtonElement)) {
        return;
      }
      const result = Number(e.target.dataset.type);
      if (result) {
        setConfirmOpen(false);
        if (itemDeleteData) {
          Controller.deleteItemCosmetic(itemDeleteData).then(() => {
            setTimeout(() => {
              setAlertOpen(true);
            }, 200);
          });
        }
      }
      setConfirmOpen(false);
    };

    const deleteHandler = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      data: itemCosmeticPrimaryType
    ) => {
      setTimeout(() => {
        setConfirmOpen(true);
      }, 150);
      setItemDeleteData(data);
    };

    return (
      <ItemsCosmeticTemplate
        stores={stores!}
        deleteHandler={deleteHandler}
        alertHandler={deleteConfirmation}
        itemName={(itemDeleteData && itemDeleteData.name) || ""}
        isAlertOpen={isAlertOpen}
        isConfirmOpen={isConfirmOpen}
        confirmHandler={confirmButtonHandler}
      />
    );
  })
);
