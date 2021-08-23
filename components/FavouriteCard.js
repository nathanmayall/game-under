import axios from "axios";
import { useEffect, useState } from "react";
import styles from "@/styles/FavouriteCard.module.css";
import priceFormatter from "@/utils/PriceFormatter";

import { useRouter } from "next/router";

import { fireStore } from "./firebase";

import Image from "next/image";

//use this while loading
import placeholder from "../public/placeholder.jpg";

import Link from "next/link";

const FavouriteCard = ({ appID, uid }) => {
  const [favData, setFavData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    getFavInfo(appID);
  }, [appID]);

  const getFavInfo = async (appID) => {
    setLoading(true);
    try {
      const {
        data: { result },
      } = await axios(`/api/games/${appID}`);
      setFavData(result);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };

  const removeFavourite = async () => {
    const favesRef = fireStore.collection("favourites");

    const alreadyInFaves = await favesRef
      .where("uid", "==", uid)
      .where("appID", "==", appID)
      .get();

    if (alreadyInFaves.empty) {
      console.log("not in faves");
    }

    alreadyInFaves.forEach(async (doc) => {
      console.log(doc.data());
      await favesRef.doc(doc.id).delete();
      router.reload();
    });
  };

  const { header_image, name, price_overview } = favData;

  return (
    <>
      {!error && !loading && header_image && favData ? (
        <div className={styles.card}>
          <Link href={`/games/${appID}`} passHref>
            <a>
              <Image
                src={header_image}
                alt="Favourite Card"
                layout="intrinsic"
                objectFit=""
                width={350}
                height={175}
                placeholder={blur}
                className={styles.image}
              />
            </a>
          </Link>
          <div className={styles.text}>
            <p>{name}</p>
            {price_overview && <h2>Price: {priceFormatter(price_overview)}</h2>}
            <small>{appID}</small>
          </div>
          <button onClick={removeFavourite} className={styles.fav}>
            Favourite
          </button>
        </div>
      ) : (
        <div className={styles.card}>Loading...</div>
      )}
    </>
  );
};

export default FavouriteCard;
