import nc from "next-connect";
import axios from "axios";
import { fireStore } from "../../../components/firebase";

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

      res.status(200).send(result);
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
