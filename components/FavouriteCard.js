import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/FavouriteCard.module.css";

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
  } = favData;

  return (
    <div className={styles.card}>
      {favData && (
        <>
          <img src={header_image} alt="" />
          <p>{name}</p>
        </>
      )}
      <small>{appID}</small>
    </div>
  );
};

export default FavouriteCard;
