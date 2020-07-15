import React, { FunctionComponent, useState } from "react";
import { Page } from "../../components/Page/index";
import { Header } from "../../components/Header/index";
import { Content } from "../../components/Content";
import {
  Input,
  Form,
  TextArea,
  Select,
  Button,
  DropdownProps,
} from "semantic-ui-react";
import { inject, observer } from "mobx-react";
import moment from "moment";
import style from "./style.scss";
import { IMainStore } from "../../stores/MainStore";
import { dataFields } from "./dataFields";
import { CosmeticItemsModel } from "./../../utils/database/cosmeticItemsModel";
import {
  isNotEmpty,
  getErrorValidation,
  alreadyIdExistsInDB,
} from "../../utils/validation";

export const CreateCosmetic: FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const itemsCosmetic = stores!.ItemsCosmetic;
    const stateItemCreate = stores!.ItemsCosmetic.itemCreate;
    const [disabledButton, setDisabled] = useState(true);

    const handlerName = (e: React.SyntheticEvent) => {
      const value = (e.target as HTMLInputElement).value.trim();
      const empty = isNotEmpty(value);
      itemsCosmetic.setCreateItem({ field: "name", error: "" });

      if (empty) {
        itemsCosmetic.setCreateItem({
          field: "name",
          error: getErrorValidation(empty),
        });
        setDisabled(true);
        return;
      }

      alreadyIdExistsInDB(value).then((result) => {
        if (result) {
          itemsCosmetic.setCreateItem({
            field: "name",
            error: "Такое имя уже существует",
          });
          setDisabled(true);
          return;
        } else {
          itemsCosmetic.setCreateItem({
            field: "name",
            value: value,
            error: "",
          });
          setDisabled(false);
        }
      });
    };

    return (
      <Page>
        <Header />
        <Content>
          <h1 className={style.h1}>Создание косметики</h1>
          <Form className={style.form}>
            <div className={style.inputWrapper}>
              <label className={style.label}>Название</label>
              <Input
                placeholder={dataFields.name}
                className={stateItemCreate.name.error && style.error}
                onBlur={handlerName}
              />
              <span className={style.errorText}>
                {stateItemCreate.name.error}
              </span>
            </div>

            <div className={style.inputWrapper}>
              <label className={style.label}>Описание</label>
              <TextArea
                placeholder={dataFields.description}
                onBlur={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  itemsCosmetic.setCreateItem({
                    field: "description",
                    value: e.target.value,
                  });
                }}
              />
            </div>

            <div className={style.inputWrapper}>
              <label className={style.label}>{`Напоминать каждые`}</label>
              <Select
                placeholder="2 дня"
                options={dataFields.days}
                onChange={(e, data: DropdownProps) => {
                  itemsCosmetic.setCreateItem({
                    field: "timingDelay",
                    value: data.value as number,
                    text: (e.target as HTMLDivElement).innerText,
                  });
                }}
              />
            </div>

            <div className={style.inputWrapper}>
              <label className={style.label}>{`Время дня:`}</label>
              <Select
                placeholder="День и вечер"
                options={dataFields.dayTime}
                onChange={(e, data: DropdownProps) => {
                  itemsCosmetic.setCreateItem({
                    field: "dayOrEvening",
                    value: data.value as number,
                    text: (e.target as HTMLDivElement).innerText,
                  });
                }}
              />
            </div>

            <div className={style.inputWrapper}>
              <label className={style.label}>Тип косметики</label>
              <Select
                placeholder={dataFields.priority[0].text}
                options={dataFields.priority}
                onChange={(e, data: DropdownProps) => {
                  itemsCosmetic.setCreateItem({
                    field: "type",
                    value: data.value as number,
                    text: (e.target as HTMLDivElement).innerText,
                  });
                }}
              />
            </div>
            <div>
              <input
                type="date"
                onChange={(event: any) => {
                  itemsCosmetic.setCreateItem({
                    field: "date",
                    value: moment(event.target.value).set({hour:15}).toDate(),
                  });
                }}
              />
            </div>
            <Button
              secondary
              disabled={disabledButton}
              onClick={() => {
                itemsCosmetic.saveItem();

                const { name, ...data }: any = {
                  ...itemsCosmetic.getLastItem(),
                };
                CosmeticItemsModel.set(
                  // save in DB
                  name.trim(),
                  {
                    name: name.trim(),
                    description: data.description,
                    timingDelay: { ...data.timingDelay },
                    dayOrEvening: { ...data.dayOrEvening },
                    type: { ...data.type },
                    date: data.date,
                  }
                ).then(() => {
                  itemsCosmetic.clearCreateItem();
                  alert("Успешно добавленно");
                  window.location.href = window.location.href;
                });
              }}
            >
              Добавить
            </Button>
          </Form>
        </Content>
      </Page>
    );
  })
);
