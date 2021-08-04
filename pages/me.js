import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fireStore } from "../components/firebase";
import styles from "../styles/me.module.css";

const Me = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [favourites, setFavourites] = useState([]);
  useEffect(async () => {
    const res = await getFavourites(user);

    setFavourites(res);

    console.log(favourites);
  }, []);
  return (
    <div>
      Welcome, {user ? user.displayName : "Gamer"}
      {favourites ? (
        favourites.map((f) => <p key={f.appID}>{f.appID}</p>)
      ) : (
        <p>No Favourites found</p>
      )}
    </div>
  );
};
export default Me;

const getFavourites = async (user) => {
  try {
    const resultsArray = [];
    const Favourites = fireStore.collection("favourites");

    const snapshot = await Favourites.where("uid", "==", user.uid).get();
    if (snapshot.empty) return;

    snapshot.forEach((doc) => {
      resultsArray.push(doc.data());
    });
    return resultsArray;
  } catch (error) {
    console.log(error);
    return { error: "Something Went Wrong" };
  }
};
