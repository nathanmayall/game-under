import nc from "next-connect";
import { onError, onNoMatch } from "../../controllers/errorHandlers";

import { fireStore } from "../../components/firebase";


const favouriteHandler = nc({
    attachParams: true,
    onError,
    onNoMatch,
  });

favouriteHandler.get(async (req, res) => {

  const { userId  } = req.params

  if(!userId) throw new Error("Unauthenticated")

  try {
    const resultsArray = [];
    const Favourites = fireStore.collection("favourites");
  
    const snapshot = await Favourites.where("uid", "==", user.uid).get();
    if (snapshot.empty) return;
  
    snapshot.forEach((doc) => {
      resultsArray.push(doc.data());
    });
  
    req.status(200).send(resultsArray)
  } catch (err) {
      throw new Error("Something went wrong")
  }
})