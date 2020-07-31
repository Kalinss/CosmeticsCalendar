import React from "react";
import { Calendar,Page,Header,Content } from "../../components/index";
import style from './style.scss'
export const CalendarPage = () => {
  return (
    <Page>
      <Header />
      <Content>
        <div className={style.wrapper} >
          <h2>Календарь</h2>
          <Calendar />
        </div>
      </Content>
    </Page>
  );
};
