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
import { itemCosmeticType } from "../../stores/ItemsCosmetic";
import { Header } from "../../components/Header/index";
import { Content } from "../../components/Content/index";
import { Page } from "../../components/Page/index";
import { dataFields } from "../CreateCosmetic/dataFields";

export const EditCosmetic: FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const [defaultValues, setDefaultValues] = useState<
      itemCosmeticType | undefined
    >(undefined);
    const [disabled, setDisabled] = useState(true);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    const itemCosmetic = stores!.ItemsCosmetic;
    const location = window.location.pathname.split("/");
    const findItemName = decodeURIComponent(location[location.length - 1]);

    useEffect(() => {
      // load finded object
      itemCosmetic.findItemEdit(findItemName).then(() => {
        console.log(toJS(itemCosmetic.itemEdit));
        setDefaultValues(toJS(itemCosmetic.itemEdit) as itemCosmeticType);
      });
    }, []);

    useEffect(() => {
      //deep equal prev state and now state
      if (
        JSON.stringify(defaultValues) !== JSON.stringify(itemCosmetic.itemEdit)
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
          {!(defaultValues as itemCosmeticType) && (
            <h1>Такой предмет не найден</h1>
          )}
          {defaultValues && (
            <>
              <h1>{defaultValues.name}</h1>
              <Form className={style.form}>
                <button
                  onClick={() => {
                    console.log(toJS(itemCosmetic.itemEdit));
                  }}
                >
                  get state
                </button>
                <div className={style.inputWrapper}>
                  <label className={style.label}>Описание</label>
                  <TextArea
                    defaultValue={defaultValues!.description}
                    onBlur={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      itemCosmetic.setEditDescription(e.target.value);
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
                      itemCosmetic.setEditTimingDelay({
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
                      itemCosmetic.setEditDayOrEvening({
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
                      itemCosmetic.setEditType({
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
                    itemCosmetic.saveEditItem();
                    CosmeticItemsModel.delete(defaultValues.name).then(() => {
                      CosmeticItemsModel.set(defaultValues.name, {
                        name: itemCosmetic.itemEdit!.name,
                        description: itemCosmetic.itemEdit!.description,
                        timingDelay: { ...itemCosmetic.itemEdit!.timingDelay },
                        dayOrEvening: {
                          ...itemCosmetic.itemEdit!.dayOrEvening,
                        },
                        type: { ...itemCosmetic.itemEdit!.type },
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
