import styles from "../styles/Home.module.css";

import { fireStore } from "../components/firebase";

import SearchBar from "../components/SearchBar";
import GameCard from "../components/GameCard";

import dummyData from "../AllSteamApps.json";

export default function Home({ games }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>GameUnder</h1>

      <p className={styles.description}>
        It's <code className={styles.code}>GameOver</code> to paying ripoff
        prices
      </p>
      <SearchBar />

      <div className={styles.grid}>
        {games?.map((game) => (
          <GameCard
            key={game.appID + game.name + new Date().getTime()}
            game={game}
          />
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const gamesRef = fireStore.collection("games");
  let games = [];

  const snapshot = await gamesRef.orderBy("name").limit(4).get();
  if (snapshot.empty) {
    console.log("No Games");
  } else {
    snapshot.forEach((doc) => {
      games.push(doc.data());
    });
  }

  return {
    props: { games }, // will be passed to the page component as props
  };
}
