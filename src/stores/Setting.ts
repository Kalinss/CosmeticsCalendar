import { settingType } from "types";
import { action, observable } from "mobx";

export class Setting {
  @observable config: settingType[] = [
    {
      name: "Виджет задач на главной странице",
      key: "todoListWidget",
      value: true,
    },
    {
      name: "Календарь на главной странице",
      key: "calendar",
      value: true,
    },
    {
      name: "Точки задач на календаре",
      key: "dotsCalendar",
      value: true,
    },
    {
      name: "Полный лист задач на главной странице",
      key: "todoListFull",
      value: false,
    },
  ];

  @action getConfig() {
    return this.config;
  }

  @action setConfig(data: settingType[]) {
    this.config = [...data];
  }

  @action deleteItem(key: string) {
    this.config = [
      ...this.config.filter((item: settingType) => item.name !== key),
    ];
  }

  @action toggleValueItem(key: string) {
    this.config = [
      ...this.config.map((item) =>
        item.key === key
          ? {
              ...item,
              value: !item.value,
            }
          : item
      ),
    ];
  }
}
