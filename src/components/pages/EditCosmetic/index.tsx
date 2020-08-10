import React, {
  FunctionComponent,
  useEffect,
  useState,
  useReducer,
} from "react";
import { inject, observer } from "mobx-react";
import { IMainStore } from "../../../stores";
import { EditCosmeticTemplate } from "../../templates/EditCosmeticTemplate";
import { expendedItemType } from "types";
import {
  expandedItemCosmeticField,
  formDataType,
  itemCosmeticPrimaryType,
} from "types";
import { updateTask } from "../../../controller";
import { deepClone, toPrimitiveType } from "../../../utils/other";
import { updateTaskAfterUpdateItem } from "../../../controller";

export const EditCosmetic: FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const itemCosmeticStore = stores!.ItemsCosmetic;
    const currentItemCosmetic = itemCosmeticStore.currentItem;

    const [isOpenAlert, setOpenAlert] = useState(false);
    const [disabledEditButton, setDisabledEditButton] = useState(true);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const [defaultValues, setDefaultValues] = useState<
      itemCosmeticPrimaryType | undefined
    >(undefined);

    const location = window.location.pathname.split("/");
    const findItemName = decodeURIComponent(location[location.length - 1]);

    const popupConfirmation = () => {
      setOpenAlert(false);
      window.location.href = "/items";
    };
    const clickButton = () => {
      setOpenAlert(true);
      const current = itemCosmeticStore.toPrimitiveType(
        currentItemCosmetic as expendedItemType
      );
      updateTaskAfterUpdateItem(current)
        .then((_) => updateTask(defaultValues!.name, current))
        .then((_) => popupConfirmation);
    };

    const changeField = (e: any, data: formDataType) => {
      itemCosmeticStore.setCurrentField({
        ...data,
      });
      forceUpdate();
    };

    useEffect(() => {
      // load default values
      // load finded object
      itemCosmeticStore.findItemEdit(findItemName).then((item) => {
        if (item) {
          itemCosmeticStore.toCurrentItem(item);
          setDefaultValues(item);
        }
      });
    }, []);

    useEffect(() => {
      // button disabled
      //deep equal prev state and now state
      if (
        JSON.stringify(defaultValues) !==
        JSON.stringify(
          toPrimitiveType(itemCosmeticStore.currentItem as expendedItemType)
        )
      ) {
        setDisabledEditButton(false);
      } else {
        setDisabledEditButton(true);
      }
    });
    return (
      <EditCosmeticTemplate
        changeHandler={changeField}
        defaultValues={defaultValues!}
        disabled={disabledEditButton}
        clickHandler={clickButton}
        isOpenAlert={isOpenAlert}
        popupHandler={popupConfirmation}
      />
    );
  })
);
