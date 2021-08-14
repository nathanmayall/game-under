import nc from "next-connect";
import { fireStore } from "../../components/firebase";

import { onError, onNoMatch } from "../../controllers/errorHandlers";

const searchHandler = nc({
  attachParams: true,
  onError,
  onNoMatch,
});

searchHandler.get(async (req, res) => {
  const { gameSearch } = req.query;
  const results = [];

  if (!gameSearch) throw new Error("No search query");

  try {
    const gamesRef = fireStore.collection("games");

    const snapshot = await gamesRef
      .where("name", ">=", gameSearch)
      .where("name", "<=", gameSearch + "\uf8ff")
      .get();

    if (snapshot.empty) {
      res.status(404).send("No games found");
    } else {
      snapshot.forEach((doc) => {
        const data = doc.data();
        results.push(data);
      });
      res.status(200).send(results);
    }
  } catch (err) {
    console.log("no games found");
  }
});

export default searchHandler;
