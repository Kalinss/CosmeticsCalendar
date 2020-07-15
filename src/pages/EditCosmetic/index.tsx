import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
  useReducer,
} from "react";
import { inject, observer } from "mobx-react";
import style from "./../CreateCosmetic/style.scss";
import { toJS } from "mobx";
import {
  Input,
  Form,
  TextArea,
  Select,
  Button,
  DropdownProps,
} from "semantic-ui-react";
import { CosmeticItemsModel } from "../../utils/database/cosmeticItemsModel";
import { IMainStore } from "../../stores/MainStore";

import { expendedItemType, itemCosmeticPrimaryType } from "~/types";
import { Header } from "../../components/Header/index";
import { Content } from "../../components/Content/index";
import { Page } from "../../components/Page/index";
import { dataFields } from "../CreateCosmetic/dataFields";

export const EditCosmetic: FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const [defaultValues, setDefaultValues] = useState<
      itemCosmeticPrimaryType | undefined
    >(undefined);

    const [disabled, setDisabled] = useState(true);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    const itemCosmetic = stores!.ItemsCosmetic;

    const location = window.location.pathname.split("/");
    const findItemName = decodeURIComponent(location[location.length - 1]);

    useEffect(() => {
      // load finded object
      itemCosmetic.findItemEdit(findItemName).then((item) => {
        if (item) {
          itemCosmetic.toCurrentItem(item);
          setDefaultValues(item);
        }
      });
    }, []);

    useEffect(() => {
      //deep equal prev state and now state
      if (
        JSON.stringify(defaultValues) !==
        JSON.stringify(itemCosmetic.currentItem)
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    });

    return (
      <Page>
        <Header />
        <Content>
          {!(defaultValues as itemCosmeticPrimaryType) && (
            <h1>Такой предмет не найден</h1>
          )}
          {defaultValues && (
            <>
              <h1>{defaultValues.name}</h1>
              <Form className={style.form}>
                <button
                  onClick={() => {
                    console.log(toJS(itemCosmetic.currentItem));
                  }}
                >
                  get state
                </button>
                <div className={style.inputWrapper}>
                  <label className={style.label}>Описание</label>
                  <TextArea
                    defaultValue={defaultValues!.description}
                    onBlur={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      itemCosmetic.setCurrentField({
                        field: "description",
                        value: e.target.value,
                      });
                      forceUpdate();
                    }}
                  />
                </div>

                <div className={style.inputWrapper}>
                  <label className={style.label}>{`Напоминать каждые`}</label>
                  <Select
                    placeholder="2 дня"
                    options={dataFields.days}
                    fluid
                    selection
                    defaultValue={defaultValues!.timingDelay.value}
                    onChange={(e, data) => {
                      itemCosmetic.setCurrentField({
                        field: "timingDelay",
                        value: data.value as number,
                        text: (e.target as HTMLDivElement).innerText,
                      });
                      forceUpdate();
                    }}
                  />
                </div>

                <div className={style.inputWrapper}>
                  <label className={style.label}>{`Время дня:`}</label>
                  <Select
                    placeholder="День и вечер"
                    options={dataFields.dayTime}
                    defaultValue={defaultValues!.dayOrEvening.value}
                    onChange={(e, data) => {
                      itemCosmetic.setCurrentField({
                        field: "dayOrEvening",
                        value: data.value as number,
                        text: (e.target as HTMLDivElement).innerText,
                      });
                      forceUpdate();
                    }}
                  />
                </div>

                <div className={style.inputWrapper}>
                  <label className={style.label}>Тип косметики</label>
                  <Select
                    placeholder={dataFields.priority[0].text}
                    options={dataFields.priority}
                    defaultValue={defaultValues!.type!.value}
                    onChange={(e, data) => {
                      itemCosmetic.setCurrentField({
                        field: "type",
                        value: data.value as number,
                        text: (e.target as HTMLDivElement).innerText,
                      });
                      forceUpdate();
                    }}
                  />
                </div>
                <Button
                  secondary
                  disabled={disabled}
                  onClick={() => {
                    const current = itemCosmetic.toPrimitiveType(
                      itemCosmetic.currentItem as expendedItemType
                    );
                    CosmeticItemsModel.delete(defaultValues.name).then(() => {
                      CosmeticItemsModel.set(defaultValues.name, {
                        name: current.name,
                        description: current.description,
                        timingDelay: { ...current.timingDelay },
                        dayOrEvening: {
                          ...current.dayOrEvening,
                        },
                        type: { ...current.type },
                        date: current.date,
                      }).then(() => {
                        alert("Обьект успешно сохранен");
                        window.location = window.location;
                      });
                    });
                  }}
                >
                  Редактировать
                </Button>
              </Form>
            </>
          )}
        </Content>
      </Page>
    );
  })
);
