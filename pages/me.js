import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fireStore } from "../components/firebase";
import styles from "../styles/me.module.css";
import FavouriteCard from "../components/FavouriteCard";

const Me = () => {
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(undefined);
  const [user] = useAuthState(auth);

  useEffect(() => {
    getFavourites(user);
  }, [user]);

  const getFavourites = async (user) => {
    try {
      const resultsArray = [];
      const Favourites = fireStore.collection("favourites");

      const snapshot = await Favourites.where("uid", "==", user.uid).get();
      if (snapshot.empty) return;

      snapshot.forEach((doc) => {
        resultsArray.push(doc.data());
      });
      setFavourites(resultsArray);
    } catch (error) {
      console.log(error);
      return setError({ error: "Something Went Wrong" });
    }
  };

  return (
    <div className={styles.main}>
      Welcome, {user ? user.displayName : "Gamer"}
      {!error && favourites.length > 0 ? (
        favourites.map((f) => {
          return <FavouriteCard key={f.appID} appID={f.appID} />;
        })
      ) : (
        <p>No Favourites found</p>
      )}
      {error && <p>Something went wrong</p>}
    </div>
  );
};
export default Me;
