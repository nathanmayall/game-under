import axios from "axios";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "@/styles/FavouriteCard.module.css";
import loadingStyles from "@/styles/loading.min.module.css";
import priceFormatter from "@/utils/PriceFormatter";
import placeholder from "@/public/placeholder.jpg";

import { fireStore } from "./firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

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
                className={styles.imagePlaceHolder}
              />
            </a>
          </Link>
          <div className={styles.text}>
            <h2>{name}</h2>
            {price_overview && <p>Price: {priceFormatter(price_overview)}</p>}
            <small>{appID}</small>
          </div>
          <button className={styles.favButton} onClick={removeFavourite}>
            <FontAwesomeIcon
              icon={faHeartSolid}
              className={styles.favouriteIcon}
              size="3x"
            />
          </button>
        </div>
      ) : (
        <div className={styles.card}>
          <Image
            src={placeholder}
            alt="Favourite Card"
            objectFit="cover"
            width={350}
            height={175}
            placeholder={blur}
            className={`${styles.image} ${loadingStyles.ld} ${loadingStyles["ld-fade"]}`}
          />
          Loading...
        </div>
      )}
    </>
  );
};

export default FavouriteCard;
