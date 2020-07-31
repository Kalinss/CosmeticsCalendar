import React, { FunctionComponent, useState } from "react";
import { Content, Header, Page } from "../../components/index";
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
import { IMainStore } from "../../stores/index";
import { dataFields } from "./dataFields";

import {
  isNotEmpty,
  getErrorValidation,
  alreadyIdExistsInDB,
} from "../../utils/validation";
import {
  saveInDBNewItemCosmetic,
  updateTaskAfterNewItem,
} from "../../utils/controlData";
import { expendedItemType } from "types";

export const CreateCosmetic: FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    const itemsCosmetic = stores!.ItemsCosmetic;
    const stateItem = stores!.ItemsCosmetic.currentItem;
    const [disabledButton, setDisabled] = useState(true);

    const handlerName = (e: React.SyntheticEvent) => {
      const value = (e.target as HTMLInputElement).value.trim();
      const empty = isNotEmpty(value);
      itemsCosmetic.setCurrentField({ field: "name", error: "" });

      if (empty) {
        itemsCosmetic.setCurrentField({
          field: "name",
          error: getErrorValidation(empty),
        });
        setDisabled(true);
        return;
      }

      alreadyIdExistsInDB(value).then((result:any) => {
        if (result) {
          itemsCosmetic.setCurrentField({
            field: "name",
            error: "Такое имя уже существует",
          });
          setDisabled(true);
          return;
        } else {
          itemsCosmetic.setCurrentField({
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
                className={stateItem.name.error && style.error}
                onBlur={handlerName}
              />
              <span className={style.errorText}>{stateItem.name.error}</span>
            </div>

            <div className={style.inputWrapper}>
              <label className={style.label}>Описание</label>
              <TextArea
                placeholder={dataFields.description}
                onBlur={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  itemsCosmetic.setCurrentField({
                    field: "description",
                    value: e.target.value,
                  });
                }}
              />
            </div>

            <div className={style.inputWrapper}>
              <label className={style.label}>{`Повторять каждые`}</label>
              <Select
                placeholder="2 дня"
                options={dataFields.days}
                onChange={(e, data: DropdownProps) => {
                  itemsCosmetic.setCurrentField({
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
                placeholder="Утро и вечер"
                options={dataFields.dayTime}
                onChange={(e, data: DropdownProps) => {
                  itemsCosmetic.setCurrentField({
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
                  itemsCosmetic.setCurrentField({
                    field: "type",
                    value: data.value as number,
                    text: (e.target as HTMLDivElement).innerText,
                  });
                }}
              />
            </div>
            <div className={style.inputWrapper}>
                <label className={style.label}>Дата</label>
              <input
                defaultValue={moment(new Date()).format('YYYY-MM-DD')}
                type="date"
                onChange={(event: any) => {
                  itemsCosmetic.setCurrentField({
                    field: "date",
                    value: moment(event.target.value)
                      .set({ hour: 15 })
                      .toDate(),
                  });
                }}
              />
            </div>
            <Button
              secondary
              disabled={disabledButton}
              onClick={() => {
                saveInDBNewItemCosmetic(
                  itemsCosmetic!.currentItem as expendedItemType
                )
                  .then(() => updateTaskAfterNewItem())
                  .then(() => {
                    itemsCosmetic.clearCurrentItem();
                    alert("Успешно добавленно");
                    window.location.href = '/items';
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
