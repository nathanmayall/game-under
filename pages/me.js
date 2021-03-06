import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/components/firebase";

import axios from "axios";

import styles from "@/styles/me.module.css";
import FavouriteCard from "@/components/FavouriteCard";

const Me = () => {
  const [favourites, setFavourites] = useState([]);
  const [favError, setFavError] = useState(undefined);
  const [favLoading, setFavLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    getFavourites(user);
  }, [user, loading, error]);

  const getFavourites = async (user) => {
    setFavLoading(true);
    setFavError(undefined);

    if (!user) {
      setFavError("You must be logged in to view your favourites.");
      setFavLoading(false);
      return;
    } else {
      try {
        const { data } = await axios(`/api/users/favourites`, {
          headers: { authorization: `Bearer ${user.uid}` },
        });
        setFavourites(data);
        setFavLoading(false);
      } catch (error) {
        setFavError("No Favourites found");
        setFavLoading(false);
      }
    }
    return;
  };
  if ((!loading || !error) && user) {
    return (
      <div className={styles.main}>
        {!favLoading && favourites.length > 0 ? (
          <>
            Welcome, {user ? user.displayName : "Gamer"}, here&apos;s your
            favourites:
            {favourites.length > 0 &&
              favourites.map((f) => (
                <FavouriteCard key={f.appID} appID={f.appID} uid={user.uid} />
              ))}
          </>
        ) : (
          <div className={styles.main}>
            {favLoading && !favError && <p>Loading...</p>}
            {favError && !favLoading && <p>{favError}</p>}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={styles.main}>
        {loading && <div>Loading...</div>}
        {error && (
          <div className={styles.main}>Something went wrong, {error}</div>
        )}
        {!loading && !user && <div className={styles.main}>You must be logged in to view this page.</div>}
      </div>
    );
  }
};
export default Me;
