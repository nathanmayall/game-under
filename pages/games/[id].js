import axios from "axios";
import Image from "next/image";
import styles from "../../styles/GamePage.module.css";

import DOMPurify from "isomorphic-dompurify";

import { priceFormatter } from "../../utils/PriceFormatter";

const GamesPage = ({ game, error }) => {
  const {
    header_image,
    name,
    short_description,
    detailed_description,
    developers,
    publishers,
    platforms,
    appID,
    price_overview,
  } = game;

  return (
    <div className={styles.main}>
      <Image src={header_image} alt="" width={460} height={215} />
      <h1 className={styles.bold}>{name}</h1>
      <div>
        <h3>Description:</h3>
        <div className={styles.description}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(detailed_description),
            }}
          />
          {price_overview && <h2>{priceFormatter(price_overview)}</h2>}
        </div>
      </div>
      <div className={styles.developers}>
        <h3>{developers.length > 1 ? "Developers:" : "Developer:"}</h3>
        <ul>
          {developers.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <div className={styles.platforms}>
        <h3>
          {Object.keys(platforms).length > 1 ? "Platforms:" : "Platform:"}
        </h3>
        <ul>
          {Object.keys(platforms).map((p, isOnPlatform) => {
            if (isOnPlatform) return <li key={p}>{p}</li>;
          })}
        </ul>
      </div>
      <div className={styles.publishers}>
        <h3>{publishers.length > 1 ? "Publishers:" : "Publisher:"}</h3>
        <ul>
          {publishers.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>{appID}</h3>
      </div>
    </div>
  );
};

export default GamesPage;

export const getServerSideProps = async (context) => {
  try {
    if (!context.params.id) return;
    const appID = context.params.id;
    const { data: game } = await axios(
      `https://api.steamapis.com/market/app/${appID}?api_key=${process.env.STEAM_API_KEY}`
    );
    console.log(game);
    return {
      props: { game },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { error: "Something Went Wrong" },
    };
  }
};
