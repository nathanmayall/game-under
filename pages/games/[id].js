import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "@/styles/GamePage.module.css";

import { useAuthState } from "react-firebase-hooks/auth";

import { fireStore, auth, googleAuthProvider } from "@/components/firebase";

import DOMPurify from "isomorphic-dompurify";

import priceFormatter from "@/utils/PriceFormatter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

import DealCard from "@/components/DealCard";

const GamesPage = ({ result, status }) => {
  if (status === 404) return <div className={styles.main}>Game not found</div>;

  const [user] = useAuthState(auth);
  const [favourite, setFavourite] = useState(false);

  const {
    header_image,
    name,
    detailed_description,
    developers,
    publishers,
    platforms,
    appID,
    price_overview,
    release_date,
  } = result;

  useEffect(() => {
    if (user) getFavourite(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, favourite]);

  const getFavourite = async (user) => {
    const favesRef = fireStore.collection("favourites");

    const alreadyInFaves = await favesRef
      .where("uid", "==", user.uid)
      .where("appID", "==", appID)
      .get();

    if (!alreadyInFaves.empty) {
      setFavourite(true);
      return;
    }
    setFavourite(false);
    return;
  };

  const addOrRemoveFavourite = async (user, appID) => {
    const favesRef = fireStore.collection("favourites");

    const signInWithGoogle = async () => {
      auth.signInWithPopup(googleAuthProvider);
    };

    if (!user) return signInWithGoogle();

    const alreadyInFaves = await favesRef
      .where("uid", "==", user.uid)
      .where("appID", "==", appID)
      .get();

    if (alreadyInFaves.empty) {
      await favesRef.add({ uid: user.uid, appID });
      setFavourite(true);
      return;
    }

    alreadyInFaves.forEach(async (doc) => {
      await favesRef.doc(doc.id).delete();
      setFavourite(false);
    });
  };
  return (
    <div className={styles.main}>
      <Image
        src={header_image}
        alt=""
        width={460}
        height={215}
        className={styles.headerImage}
      />
      <div className={styles.title}>
        <h1>{name}</h1>
        <button
          onClick={() => addOrRemoveFavourite(user, appID)}
          className={styles.favButton}
        >
          <FontAwesomeIcon
            icon={favourite ? faHeartSolid : faHeart}
            className={styles.favouriteIcon}
            size="3x"
          />
        </button>
      </div>
      {game.deals && game.deals.length > 1 ? (
        game.deals.map((deal, i) => <DealCard deal={deal} key={i} />)
      ) : (
        <div className={styles.noDeal}>
          <p>No deals found, but check it out on Steam</p>

          <Link href={`https://store.steampowered.com/app/${appID}`} passHref>
            <a>
              <Image
                className={styles.noDealImage}
                src="https://cheapshark.com/img/stores/logos/0.png"
                alt="steamLogo"
                width={50}
                height={50}
              />
            </a>
          </Link>
        </div>
      )}
      <div>
        {price_overview && <h1>Steam: {priceFormatter(price_overview)}</h1>}
        <h3>Description:</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(detailed_description),
          }}
          className={styles.description}
        />
      </div>
      {developers && (
        <div className={styles.developers}>
          <h3>{developers.length > 1 ? "Developers:" : "Developer:"}</h3>
          <ul>
            {developers.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      )}
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
    const { data: game } = await axios(`/api/games/${appID}`);

    const result = game.result;

    return {
      props: { result },
    };
  } catch (error) {
    const status = error.response.status;

    return {
      props: { status },
    };
  }
};
