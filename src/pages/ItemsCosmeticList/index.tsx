import React, { FunctionComponent } from "react";
import { IMainStore } from "../../stores";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { Header,Content,Page } from "../../components";
import styles from "./style.scss";
import { updateTaskAfterDeleteItem } from "../../utils/controlData";
import { EditButton } from "../../components/@decoration/EditButton/index";
import { RemoveButton } from "../../components/@decoration/RemoveButton/index";
import { CosmeticItemsModelDB } from "../../database";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const ItemsCosmeticList: FunctionComponent<IMainStore> = inject(
  "stores"
)(
  observer(({ stores }) => {
    const itemsCosmetic = stores!.ItemsCosmetic;
    const items = toJS(stores!.ItemsCosmetic.items);

    return (
      <Page>
        <Header />
        <Content>
          <h1 className={styles.h1}>Список косметики</h1>
          <Link to={'/create'}>Создать</Link>
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
                    Уведомление: <span>{item.dayOrEvening.text}</span>
                  </p>
                  <p>
                    Тип: <span>{item.type!.text}</span>
                  </p>
                  <div className={styles.buttonWrapper}>
                    <Link to={`/edit/${item.name}`}>
                      <EditButton />
                    </Link>
                  </div>
                  <div
                    className={styles.buttonWrapperRemove}
                    onClick={() => {
                      const confirm: any = window.confirm(
                        "Вы уверены, что хотите удалить этот элемент?"
                      );
                      if (confirm) {
                        CosmeticItemsModelDB.delete(item.name.trim())
                          .then(() => updateTaskAfterDeleteItem(item))
                          .then(() => itemsCosmetic.deleteItem(item.name));
                        alert('Успешно удалено')
                      }
                      return;
                    }}
                  >
                    <RemoveButton />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Content>
      </Page>
    );
  })
);
