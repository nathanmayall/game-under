import styles from "../styles/GameCard.module.css";
import Link from "next/link";

import priceFormatter from "../utils/PriceFormatter";

const gameCard = ({ game }) => {
  const { name, steamID, is_free, hasPriceOverview } = game;
  let formattedPrice = undefined;
  if (hasPriceOverview) {
    formattedPrice = priceFormatter(hasPriceOverview);
  }

  return (
    <Link href={`/games/${steamID}`} passHref>
      <div className={styles.card}>
        <h2>{name}</h2>
        <p>Price: {is_free ? "Free ✔!" : formattedPrice}</p>
        <small>Steam ID: {steamID}</small>
      </div>
    </Link>
  );
};

export default gameCard;
