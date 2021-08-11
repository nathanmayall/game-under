import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/FavouriteCard.module.css";
import priceFormatter from "../utils/PriceFormatter";

const FavouriteCard = ({ appID }) => {
  const [favData, setFavData] = useState({});

  useEffect(() => {
    getFavInfo(appID);
  }, [appID]);

  const getFavInfo = async (appID) => {
    const { data } = await axios(
      `https://api.steamapis.com/market/app/${appID}?api_key=zSQo-hIrr3nUU5T__NbF8Bc_Y1w`
    );
    setFavData(data);
  };

  const {
    header_image,
    name,
    short_description,
    developers,
    publishers,
    platforms,
    price_overview,
  } = favData;

  return (
    <div className={styles.card}>
      {favData && (
        <>
          <img src={header_image} alt="" className={styles.image} />

          <div className={styles.text}>
            <p>{name}</p>
            {price_overview && <h2>price: {priceFormatter(price_overview)}</h2>}
            <small>{appID}</small>
          </div>
          <button className={styles.fav}>Favourite</button>
        </>
      )}
    </div>
  );
};

export default FavouriteCard;
