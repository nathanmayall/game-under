import styles from "../styles/GameCard.module.css";

const gameCard = ({ game }) => {
  const { name, steamID, is_free, hasPriceOverview } = game;

  const formattedPrice =
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: hasPriceOverview?.currency || "USD",
    }).format(hasPriceOverview?.final / 100) || null;

  return (
    <div className={styles.card}>
      <h2>{name}</h2>
      <p>Price: {is_free ? "Free ✔!" : formattedPrice}</p>
      <small>Steam ID: {steamID}</small>
    </div>
  );
};

export default gameCard;
