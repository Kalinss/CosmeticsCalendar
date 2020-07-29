import React from "react";
import { Calendar,Page,Header,Content } from "../../components/index";

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
