import React, { FunctionComponent } from "react";
import { Page } from "../../components/Page/index";
import { Calendar } from "../../components/Calendar/index";
import { Header } from "../../components/Header/index";
import { Content } from "../../components/Content";
import { IMainStore } from "../../stores/MainStore";
import { TodayWidgetTodoList } from "../../components/TodayWidgetTodoList";
import {UploadDailyTask} from "../../components/UploadDailyTask";
import stores from '../../stores/store'
import {toJS} from 'mobx';

const getField =(key:string)=>stores.Setting.config.find((item)=>item.key === key);

const todayWidget = ()=>{
    const field = getField('todoListWidget');
    if(field && field.value){
        return (
            <UploadDailyTask>
                <TodayWidgetTodoList />
            </UploadDailyTask>
        )
    }
}

const calendar = ()=>{
    const field = getField('calendar');
    if(field && field.value){
        return <Calendar />
    }
}

export const Main: FunctionComponent<IMainStore> = () => {
  return (
    <Page>
      <Header />
      <Content>
          {
              todayWidget()
          }
          {
              calendar()
          }

      </Content>
    </Page>
  );
};
