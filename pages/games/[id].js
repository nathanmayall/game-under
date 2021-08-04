import axios from "axios";
import Image from "next/image";
import styles from "../../styles/GamePage.module.css";

import { useAuthState } from "react-firebase-hooks/auth";

import { fireStore, auth } from "../../components/firebase";

import DOMPurify from "isomorphic-dompurify";

import priceFormatter from "../../utils/PriceFormatter";

const GamesPage = ({ game, error }) => {
  const [user] = useAuthState(auth);

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
    release_date,
  } = game;

  const addOrRemoveFavourite = async (user, appID) => {
    const favesRef = fireStore.collection("favourites");

    const alreadyInFaves = await favesRef
      .where("uid", "==", user.uid)
      .where("appID", "==", appID)
      .get();

    if (alreadyInFaves.empty) {
      await favesRef.add({ uid: user.uid, appID });
      console.log("fave added");
      return;
    }

    alreadyInFaves.forEach(async (doc) => await favesRef.doc(doc.id).delete());
  };

  return (
    <div className={styles.main}>
      <Image src={header_image} alt="" width={460} height={215} />
      <div className={styles.title}>
        <h1>{name}</h1>
        <button onClick={() => addOrRemoveFavourite(user, appID)}>
          Add To Favourites
        </button>
      </div>
      <div>
        {price_overview && <h1>{priceFormatter(price_overview)}</h1>}
        <h3>Description:</h3>
        <div className={styles.description}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(detailed_description),
            }}
          />
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
        {release_date && release_date.date && (
          <h3>Released: {release_date.date}</h3>
        )}
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
