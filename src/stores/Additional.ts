import { action, observable } from "mobx";
import appConfig from "./../config";

export class Additional {
  @observable version = appConfig.appPublicVersion;
  @observable alertUpdate = "true";

  @action setAlert = (x: "true" | "false") => (this.alertUpdate = x);
}
