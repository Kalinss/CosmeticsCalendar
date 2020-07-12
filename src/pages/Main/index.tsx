import React, { FunctionComponent } from "react";
import { Page } from "../../components/Page/index";
import { Calendar } from "../../components/Calendar/index";
import { Header } from "../../components/Header/index";
import { Content } from "../../components/Content";
import { IMainStore } from "../../stores/MainStore";

export const Main: FunctionComponent<IMainStore> = () => {
  return (
    <Page>
      <Header />
      <Content>
        <Calendar />
      </Content>
    </Page>
  );
};
