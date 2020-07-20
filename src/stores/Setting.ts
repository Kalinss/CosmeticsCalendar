import { settingType } from "types";
import {action, observable} from "mobx";

export class Setting {
  @observable config: settingType = {
    selectedDate: new Date(),
  };

  @action getConfig(){
      return {...this.config}
  }

  @action setConfig(object:settingType){
      this.config = {...object}
  }

  @action setDate(date:Date){
      this.setConfig({
          ...this.config,
          selectedDate:date
      })
  }
}
