import { useState } from "react";

import { fireStore } from "../components/firebase";
import axios from "axios";

const Update = () => {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [dbLength, setDbLength] = useState(null);

  const updateDB = async () => {
    const { data } = await axios(
      "https://api.steamapis.com/market/apps?api_key=zSQo-hIrr3nUU5T__NbF8Bc_Y1w"
    );

    data.forEach(async (game) => {
      setLoading(true);
      const { name, appID, is_free, price_overview } = game;
      const hasPriceOverview = price_overview || null;

      await fireStore
        .collection("games")
        .add({
          steamID: appID,
          name,
          is_free,
          hasPriceOverview,
        })
        .catch((error) => console.log("Error adding document: ", error));
    });
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

export default update;
