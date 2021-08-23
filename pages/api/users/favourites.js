import nc from "next-connect";
import { onError, onNoMatch } from "@/controllers/errorHandlers";

import { fireStore } from "@/components/firebase";

const favouriteHandler = nc({
  attachParams: true,
  onError,
  onNoMatch,
});

favouriteHandler.get(async (req, res) => {
  const userId = req.headers.authorization.split(" ")[1];

  if (!userId) {
    res.status(401).send({ error: "Unauthenticated" });
  } else {
    try {
      const resultsArray = [];
      const Favourites = fireStore.collection("favourites");

      const snapshot = await Favourites.where("uid", "==", userId).get();
      if (snapshot.empty) {
        res.status(404).send({ error: "No favourites found" });
      } else {
        snapshot.forEach((doc) => {
          resultsArray.push(doc.data());
        });

        res.status(200).send(resultsArray);
      }
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong");
    }
  }
});

export default favouriteHandler;
