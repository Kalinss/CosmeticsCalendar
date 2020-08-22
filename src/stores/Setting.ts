import { settingType } from "types";
import { action, observable } from "mobx";
import { filter, map } from "lodash";

export const filterExcludingName = (list: settingType[], name: string) =>
  filter(list, (item) => item.name !== name);

export const toggleValueFieldByKey = (list: settingType[], key: string) => {
  return map(list, (item) =>
    item.key === key
      ? {
          ...item,
          value: !item.value,
        }
      : item
  );
};

export class Setting {
  @observable config: settingType[] = [
    {
      name: "Показывать календарь на главной странице",
      key: "calendar",
      value: true,
      sort: 1,
    },
    {
      name: "Показывать виджет плана ухода на день на главной странице",
      key: "todoListWidget",
      value: true,
      sort: 2,
    },
    {
      name: "Показывать полный план ухода на день на главной странице",
      key: "todoListFull",
      value: false,
      sort: 3,
    },
    {
      name: "Отмечать точками напоминания в календаре",
      key: "dotsCalendar",
      value: true,
      sort: 4,
    },
    {
      name: `Отмечать точками на календаре срадства, используемые ежедневно`,
      key: "everyDayDots",
      value: false,
      sort: 5,
    },
    {
      name:
        "Очищать задачи, которые старше 30 дней (советуем включить эту настройку)",
      key: "clearOldTask",
      value: true,
      sort: 6,
    },
  ];

  @action getConfig() {
    return this.config;
  }

  @action
  async setConfig(data: settingType[]) {
    this.config = [...data];
  }

  @action deleteItemByName(name: string) {
    this.setConfig(filterExcludingName(this.config, name));
  }

  @action
  async toggleValueFieldByKey(key: string) {
    return await this.setConfig(toggleValueFieldByKey(this.config, key));
  }
}
