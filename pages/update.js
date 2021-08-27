import axios from "axios";
import { useState } from "react";

import { fireStore } from "@/components/firebase";

const Update = () => {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [dbLength, setDbLength] = useState(null);

  const updateDB = async () => {
    const batchArray = [];
    batchArray.push(fireStore.batch());
    let operationCounter = 0;
    let batchIndex = 0;

    setLoading(true);
    const { data } = await axios(
      "https://api.steamapis.com/market/apps?api_key=zSQo-hIrr3nUU5T__NbF8Bc_Y1w"
    );

    const gamesRef = fireStore.collection("games");
    setLoading(true);

    data.forEach(async (game) => {
      const { name, appID, is_free, price_overview } = game;
      const hasPriceOverview = price_overview || null;

      batchArray[batchIndex].set(gamesRef.doc(), {
        name,
        steamID: appID,
        is_free,
        hasPriceOverview,
      });
      operationCounter++;

      if (operationCounter === 499) {
        batchArray.push(fireStore.batch());
        batchIndex++;
        operationCounter = 0;
      }
    });

    try {
      batchArray.forEach(async (batch) => await batch.commit());
    } catch (error) {
      console.log(error);
    }

    setDbLength(data.length);
    setLoading(false);
    setComplete(true);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button onClick={updateDB}>Update master DB</button>
      {loading && <div>Loading...</div>}
      {complete && <div>Update finished! Now holding {dbLength} games.</div>}
    </div>
  );
};

export default Update;
