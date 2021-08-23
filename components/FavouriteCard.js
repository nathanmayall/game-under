import axios from "axios";
import { useEffect, useState } from "react";
import styles from "@/styles/FavouriteCard.module.css";
import priceFormatter from "@/utils/PriceFormatter";

import Image from "next/image";

//use this while loading
import placeholder from "../public/placeholder.jpg";

import Link from "next/link";

const FavouriteCard = ({ appID }) => {
  const [favData, setFavData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const {
    header_image,
    name,
    short_description,
    developers,
    publishers,
    platforms,
    price_overview,
    background,
  } = favData;

  return (
    <>
      {!error && !loading && header_image && favData ? (
        <div className={styles.card}>
          <Link href={`/games/${appID}`} passHref>
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
          </Link>
          <div className={styles.text}>
            <p>{name}</p>
            {price_overview && <h2>Price: {priceFormatter(price_overview)}</h2>}
            <small>{appID}</small>
          </div>
          <button className={styles.fav}>Favourite</button>
        </div>
      ) : (
        <div className={styles.card}>Loading...</div>
      )}
    </>
  );
};

export default FavouriteCard;
