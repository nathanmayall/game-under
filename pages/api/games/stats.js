import nc from "next-connect";
import axios from "axios";

import { onError, onNoMatch } from "../../../controllers/errorHandlers";

const statsHandler = nc({ attachParams: true, onNoMatch, onError });

statsHandler.get(async (_, res) => {
  try {
    const { data } = await axios(
      `https://api.steamapis.com/market/stats?api_key=${process.env.STEAM_API_KEY}`
    );
    res.send(data);
  } catch (err) {
    throw err;
  }
});

export default statsHandler;
