import stores from "../stores/store";
import { AdditionalDB } from "../database";

export const uploadAdditional = async () => {
  const additionalState = stores.Additional;
  const publicVersion = await AdditionalDB.get("version");
  const alertUpdate = await AdditionalDB.get("alertUpdate");
  if (!publicVersion || publicVersion !== additionalState.version) {
    const promise = Promise.all([
      AdditionalDB.set("version", additionalState.version),
      AdditionalDB.set("alertUpdate", additionalState.alertUpdate),
    ]);
    promise.then((x) => x).catch(console.log);
  } else {
    additionalState.setAlert(alertUpdate);
  }
};
