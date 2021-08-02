import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fireStore } from "../components/firebase";
import styles from "../styles/me.module.css";
import axios from "axios";

const Me = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) router.push("/");
  }, []);
  const [favourites, setFavourites] = useState([]);
  setFavourites(await getFavourites(user));
  return (
    <div>
      Welcome, {user ? user.displayName : "Gamer"}
      {favourites.map((f) => {
        return <p>{f.appID}</p>;
      })}
    </div>
  );
};
export default Me;

const getFavourites = async (user) => {
  try {
    const Favourites = fireStore.collection("favourites");

    const snapshot = await Favourites.where("uid", "==", user.uid).get();

    const resultsArray = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      resultsArray.push(data);
    });
    console.log(resultsArray);
    return {
      props: { favourites: resultsArray },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { error: "Something Went Wrong" },
    };
  }
};
