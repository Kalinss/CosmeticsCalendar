import { settingType } from "types";
import { action, observable } from "mobx";

export class Setting {
  @observable config: settingType[] = [
    {
      name: "Показывать календарь на главной странице",
      key: "calendar",
      value: true,
      sort:1
    },
    {
      name: "Показывать виджет плана ухода на день на главной странице",
      key: "todoListWidget",
      value: true,
      sort:2
    },
    {
      name: "Показывать полный план ухода на день на главной странице",
      key: "todoListFull",
      value: false,
      sort:3
    },
    {
      name: "Отмечать точками напоминания в календаре",
      key: "dotsCalendar",
      value: true,
      sort:4
    },
    {
      name: `Отмечать точками на календаре срадства, используемые ежедневно`,
      key: "everyDayDots",
      value: false,
      sort:5
    },
    {
      name: "Очищать задачи, которые старше 30 дней (советуем включить эту настройку)",
      key: "clearOldTask",
      value: true,
      sort:6
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
