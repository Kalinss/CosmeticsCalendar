import React, { SyntheticEvent } from "react";
import styles from "../../pages/ItemsCosmeticList/style.scss";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { EditButton, RemoveButton } from "../../atoms/index";
import { MainStore } from "../../../stores";
import { toJS } from "mobx";
import { Page } from "../Page";
import { Content } from "../Content";
import { itemCosmeticPrimaryType } from "types";
import { Alert } from "../../organisms/index";
import { Confirm } from "../../organisms/index";

type ItemsCosmeticTemplate = {
  stores: MainStore;
  alertHandler: VoidFunction;
  itemName: string;
  deleteHandler?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: itemCosmeticPrimaryType
  ) => void;
  confirmHandler: (e: SyntheticEvent<HTMLButtonElement, Event>) => void;
  isAlertOpen?: boolean;
  isConfirmOpen?: boolean;
};

export const ItemsCosmeticTemplate: React.FC<ItemsCosmeticTemplate> = ({
  stores,
  deleteHandler = () => {},
  alertHandler = () => {},
  confirmHandler = () => ({}),
  itemName = "",
  isAlertOpen = false,
  isConfirmOpen = false,
}) => {
  const itemsCosmetic = stores!.ItemsCosmetic;
  const items = toJS(stores!.ItemsCosmetic.items);

  return (
    <Page>
      <Content>
        <h1 className={styles.h1}>Список уходовых средств</h1>
        <div className={styles.buttonWrap}>
          <Button className={styles.buttonLink} color="black">
            <Link className={styles.link} to={"/create"}>
              Создать
            </Link>
          </Button>
        </div>
        <ul className={styles.list}>
          {items.map((item, i) => (
            <li key={i} className={styles.item}>
              <div>
                <p>
                  Название: <span>{item.name}</span>
                </p>
                {item.description && (
                  <p>
                    Описание: <span>{item.description}</span>
                  </p>
                )}
                <p>
                  Повторять каждые: <span>{item.timingDelay.text}</span>
                </p>
                <p>
                  Время использования: <span>{item.dayOrEvening.text}</span>
                </p>
                <p>
                  Тип: <span>{item.type!.text}</span>
                </p>
                <p>
                  Дата: <span>{moment(item.date).format("DD.MM.YYYY")}</span>
                </p>
                <div className={styles.buttonWrapper}>
                  <Link to={`/edit/${item.name}`}>
                    <EditButton />
                  </Link>
                </div>
                <div
                  className={styles.buttonWrapperRemove}
                  onClick={(e) => deleteHandler(e, item)}
                >
                  <RemoveButton />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Alert
          description="Успешно удалено"
          buttonName="Ок"
          title={itemName}
          clickHandler={alertHandler}
          isOpen={isAlertOpen}
        />
        <Confirm
          description={`Вы уверены что хотите удалить "${itemName}"?`}
          title={"Удаление"}
          isOpen={isConfirmOpen}
          clickHandler={confirmHandler}
        />
      </Content>
    </Page>
  );
};
