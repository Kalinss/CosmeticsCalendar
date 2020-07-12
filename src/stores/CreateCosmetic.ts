import { observable, action, computed } from "mobx";
import { isNotEmpty } from "./../utils/validation";

type field = { value: string; error: string };

export class CreateCosmetic {
  @observable fields = {
    name: {
      value: "",
      error: "",
    },
    description: {
      value: "",
      error: "",
    },
    timingDelay: {
      value: "",
      error: "",
    },
    dayOrEvening: {
      value: "",
      error: "",
    },
    type: {
      value: "",
      error: "",
    },
  } as {[key:string]:field};

  @action setField(name: string, string: string) {
    this.fields[name].value = string;
  }
  @action setError(field: string, string: string) {
    this.fields[field].error = string;
  }
  @action getAll(){
     return this.fields
  }
}
