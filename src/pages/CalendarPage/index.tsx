import React from "react";
import { Calendar } from "./../../components/Calendar/index";
import { Page } from "../../components/Page/index";
import { Header } from "../../components/Header/index";
import { Content } from "../../components/Content";

export const CalendarPage = () => {
  return (
    <Page>
      <Header />
      <Content>
        <div>
          <h2>Календарь</h2>
          <Calendar />
        </div>
      </Content>
    </Page>
  );
};
