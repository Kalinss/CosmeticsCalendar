import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { IMainStore } from "../../stores/MainStore";
import style from "~/components/Page/style.scss";

export const Upload: React.FunctionComponent<IMainStore> = inject("stores")(
  observer(({ children, stores }) => {
    const [loading, setLoading] = useState(true);
    const itemsCosmetic = stores!.ItemsCosmetic;

    useEffect(() => {
      itemsCosmetic.loadAllItemsFromDB().then(() => setLoading(false));
    }, []);

    return <>{loading ? <p></p> : children}</>;
  })
);
