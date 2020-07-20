import React from "react";
import { Content, Header, Page, UploadDailyTask,TodoListContent } from "../../components/index";
import style from "./style.scss";

import { inject, observer } from "mobx-react";
import { IMainStore } from "../../stores/MainStore";

export const TodoList: React.FunctionComponent<IMainStore> = inject("stores")(
  observer(({ stores }) => {
    return (
      <UploadDailyTask>
        <Page>
          <Header />
          <Content>
            <h1>Список дел на сегодня / "дата"</h1>
            <div className={style.todoWrapper}>
              <TodoListContent/>
              {/*<div className={style.top}>*/}
              {/*  /!*презентационный компонент создания*!/*/}
              {/*  /!*При нажатии закрывается*!/*/}
              {/*  <h2 className={style.h2}>День</h2>*/}
              {/*  <ul className={style.list}>*/}
              {/*    <li className={style.item}>*/}
              {/*      <p className={style.closed}></p>*/}
              {/*      <div className={style.closeWrapper}>*/}
              {/*        <div className={style.close}></div>*/}
              {/*      </div>*/}
              {/*    </li>*/}
              {/*    <li className={style.item}>*/}
              {/*      <p>123444</p>*/}
              {/*      <div className={style.closeWrapper}>*/}
              {/*        <div className={style.close}></div>*/}
              {/*      </div>*/}
              {/*    </li>*/}
              {/*    <li className={style.item}>*/}
              {/*      <p>123444</p>*/}
              {/*      <div className={style.closeWrapper}>*/}
              {/*        <div className={style.close}></div>*/}
              {/*      </div>*/}
              {/*    </li>*/}
              {/*    <li className={style.item}>*/}
              {/*      <p>123444</p>*/}
              {/*      <div className={style.closeWrapper}>*/}
              {/*        <div className={style.close}></div>*/}
              {/*      </div>*/}
              {/*    </li>*/}
              {/*  </ul>*/}
              {/*</div>*/}
              {/*<div className={style.bottom}>*/}
              {/*  <h2 className={style.h2}>Вечер</h2>*/}
              {/*  <ul className={style.list}>*/}
              {/*    <li className={style.item}>*/}
              {/*      <p className={style.closed}>*/}
              {/*        123444 k jaslkdj akls djlkasjldk jask djajs dkjk 123444 k*/}
              {/*        jaslkdj akls djlkasjldk jask djajs dkjk 123444 k jaslkdj*/}
              {/*        akls djlkasjldk jask djajs dkjk 123444 k jaslkdj akls*/}
              {/*        djlkasjldk jask djajs dkjk*/}
              {/*      </p>*/}
              {/*      <div className={style.closeWrapper}>*/}
              {/*        <div className={style.close}></div>*/}
              {/*      </div>*/}
              {/*    </li>*/}
              {/*    <li className={style.item}>*/}
              {/*      <p>123444</p>*/}
              {/*      <div className={style.closeWrapper}>*/}
              {/*        <div className={style.close}></div>*/}
              {/*      </div>*/}
              {/*    </li>*/}
              {/*    <li className={style.item}>*/}
              {/*      <p>123444</p>*/}
              {/*      <div className={style.closeWrapper}>*/}
              {/*        <div className={style.close}></div>*/}
              {/*      </div>*/}
              {/*    </li>*/}
              {/*    <li className={style.item}>*/}
              {/*      <p>123444</p>*/}
              {/*      <div className={style.closeWrapper}>*/}
              {/*        <div className={style.close}></div>*/}
              {/*      </div>*/}
              {/*    </li>*/}
              {/*  </ul>*/}
              {/*</div>*/}
            </div>
          </Content>
        </Page>
      </UploadDailyTask>
    );
  })
);
