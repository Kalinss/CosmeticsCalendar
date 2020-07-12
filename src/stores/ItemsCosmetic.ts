import { observable, action, computed } from "mobx";

export type typeItemCosmetic = {
  name: string;
  description?: string;
  timingDelay: number;
  dayOrEvening: number;
  type?: number;
};

export class ItemsCosmetic {
  @observable items:typeItemCosmetic[] = [
    {
      name: "123",
      description: "",
      timingDelay: 0, // 0 to N day
      dayOrEvening: 0, // 0 - all, 1 - day 2 - evening
      type: 0, // priority item for filter
    },
  ];

  @computed get all():typeItemCosmetic[] {
    return this.items;
  }

  @action addItem = (props:typeItemCosmetic) => {
    this.items.push({
      name: props.name,
      description: props.description || "",
      timingDelay: props.timingDelay,
      type: props.type || 99,
      dayOrEvening: props.dayOrEvening,
    });
  };
}
