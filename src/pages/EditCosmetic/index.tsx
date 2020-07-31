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
import { Form, TextArea, Select, Button } from "semantic-ui-react";
import { CosmeticItemsModelDB } from "../../database/index";
import { IMainStore } from "../../stores/index";
import { deepClone } from "../../utils/other";
import { expendedItemType, itemCosmeticPrimaryType } from "../../types";
import { Header, Content, Page } from "../../components";
import { dataFields } from "../CreateCosmetic/dataFields";
import { updateTaskAfterUpdateItem } from "../../utils/controlData";
import moment from "moment";
import { toPrimitiveType } from "../../utils/other";

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
      //deep equal prev state and now state
      if (
        JSON.stringify(defaultValues) !==
        JSON.stringify(
          toPrimitiveType(itemCosmetic.currentItem as expendedItemType)
        )
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    });

    useEffect(() => {
      // load finded object
      itemCosmetic.findItemEdit(findItemName).then((item) => {
        if (item) {
          itemCosmetic.toCurrentItem(item);
          setDefaultValues(item);
        }
      });
    }, []);

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
                  <label className={style.label}>{`Повторять каждые`}</label>
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
                    placeholder="Утро и вечер"
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
                <div className={style.inputWrapper}>
                  <label className={style.label}>Дата</label>
                  <input
                    defaultValue={moment(defaultValues.date).format(
                      "YYYY-MM-DD"
                    )}
                    type="date"
                    onChange={(event: any) => {
                      itemCosmetic.setCurrentField({
                        field: "date",
                        value: moment(event.target.value)
                          .set({ hour: 15 })
                          .toDate(),
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
                    updateTaskAfterUpdateItem(current)
                      .then(() => {
                        return CosmeticItemsModelDB.delete(defaultValues.name);
                      })
                      .then(() => {
                        return CosmeticItemsModelDB.set(
                          defaultValues.name,
                          deepClone(current)
                        );
                      })
                      .then(() => {
                        alert("Обьект успешно сохранен");
                        window.location.href = "/items";
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
