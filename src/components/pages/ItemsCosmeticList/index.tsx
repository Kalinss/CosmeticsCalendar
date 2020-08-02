import React, { FunctionComponent } from "react";
import { IMainStore } from "../../../stores";
import { inject, observer } from "mobx-react";
import { ItemsCosmeticTemplate } from "../../templates";

export const ItemsCosmeticList: FunctionComponent<IMainStore> = inject(
  "stores"
)(
  observer(({ stores }) => <ItemsCosmeticTemplate stores={stores} />
  )
);
