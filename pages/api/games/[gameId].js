import nc from "next-connect";
import axios from "axios";
// import { fireStore } from "../../../components/firebase";

import { onError, onNoMatch } from "../../../controllers/errorHandlers";

const gameHandler = nc({ attachParams: true, onNoMatch, onError });

const findOneGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    if (!gameId) throw new Error("Game ID is required");

    try {
      const { data: result } = await axios.get(
        `https://api.steamapis.com/market/app/${gameId}?api_key=${process.env.STEAM_API_KEY}`
      );

      //retrieve deal results
      const { data: deals } = await axios.get(
        `https://www.cheapshark.com/api/1.0/games?title=${result.name}&limit=60&exact=0`
      );
      if (deals.length === 0) {
        res.status(200).send({ result });
      } else {
        const { data: cheapestDeal } = await axios.get(
          `https://www.cheapshark.com/api/1.0/deals?id=${deals[0].cheapestDealID}`
        );

        const { data: storeInfo } = await axios.get(
          "https://www.cheapshark.com/api/1.0/stores"
        );

        const storeNumber = parseInt(cheapestDeal.gameInfo.storeID) - 1;

        const storeName = storeInfo[storeNumber];

        cheapestDeal.gameInfo.storeInfo = storeName;
        cheapestDeal.gameInfo.dealLink = `https://www.cheapshark.com/redirect?dealID=${deals[0].cheapestDealID}`;

        res.status(200).send({ result, deals: cheapestDeal });
      }
    } catch (err) {
      res.status(404).send();
    }
  } catch (error) {
    throw error;
  }
};

gameHandler.get("/api/games/:gameId", findOneGame);

export default gameHandler;

export const config = {
  externalResolver: true,
};
