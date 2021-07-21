import Head from "next/head";
import styles from "../styles/Home.module.css";

import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>GameUnder</title>
        <meta
          name="description"
          content="It's Game Over to paying rip-off Prices!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>GameUnder</h1>

        <p className={styles.description}>
          It's <code className={styles.code}>GameOver</code> to paying ripoff
          prices
        </p>
        <SearchBar />

        <div className={styles.grid}>
          <div href="" className={styles.card}>
            <h2>Market 1</h2>
          </div>
          <div href="" className={styles.card}>
            <h2>Market 2</h2>
          </div>
          <div href="" className={styles.card}>
            <h2>Market 3</h2>
          </div>
        </div>
      </main>
    </div>
  );
}
