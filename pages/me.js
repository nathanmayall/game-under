import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getFavourites } from "../components/firebase";
import styles from "../styles/me.module.css";
import FavouriteCard from "../components/FavouriteCard";

const Me = () => {
  const [favourites, setFavourites] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(async () => {
    const res = await getFavourites(user);
    setFavourites(res);
  }, [user]);

  return (
    <div className={styles.main}>
      Welcome, {user ? user.displayName : "Gamer"}
      {favourites.length > 0 ? (
        favourites.map((f) => {
          return <FavouriteCard key={f.appID} appID={f.appID} />;
        })
      ) : (
        <p>No Favourites found</p>
      )}
    </div>
  );
};
export default Me;
