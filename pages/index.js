import axios from "axios";
import { fireStore } from "../components/firebase";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import styles from "../styles/Home.module.css";

import SearchBar from "../components/SearchBar";
import GameCard from "../components/GameCard";

dayjs.extend(advancedFormat);

export default function Home({ games, stats }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>GameUnder</h1>

      <p className={styles.description}>
        It's <code className={styles.code}>GameOver</code> to paying ripoff
        prices
      </p>
      <SearchBar />
      {stats && (
        <p>
          Currently tracking {stats.stats.totalApps.toLocaleString("en-GB")}{" "}
          games!
        </p>
      )}

      {games.length > 0 && (
        <div className={styles.suggestion}>
          <p>We suggest you check out:</p>
          <div className={styles.grid}>
            {games?.map((game) => (
              <GameCard
                key={game.appID + game.name + new Date().getTime()}
                game={game}
              />
            ))}
          </div>
        </div>
      )}
      {stats && (
        <small>
          Last updated: {dayjs(stats.updated_at).format("hh:mm, MMMM Do, YYYY")}
        </small>
      )}
    </main>
  );
}

export async function getServerSideProps() {
  const { data: stats } = await axios("/api/games/stats");

  const gamesRef = fireStore.collection("games");
  const randomKey = gamesRef.doc().id;
  const games = [];

  const snapshot = await gamesRef
    .where("__name__", ">=", randomKey)
    .limit(4)
    .get();

  if (snapshot.empty) {
    console.log("No Games");
  } else {
    snapshot.forEach((doc) => {
      games.push(doc.data());
    });
  }

  return {
    props: { games, stats }, // will be passed to the page component as props
  };
}
