import Head from "next/head";
import styles from "../styles/Home.module.css";

import { googleAuthProvider, auth } from "../components/firebase";

const signInWithGoogle = async () => {
  auth.signInWithPopup(googleAuthProvider);
};

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
        <h1 className={styles.title}>Welcome to GameUnder</h1>

        <p className={styles.description}>
          It's Game Over to paying ripoff prices
          {/* <code className={styles.code}>Go</code> */}
        </p>

        <div className={styles.grid}>
          <div href="" className={styles.card}>
            <h2>Login/Register &rarr;</h2>
            <button onClick={signInWithGoogle}>
              Use Google Auth to Login/Register
            </button>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>© GameUnder 2021</footer>
    </div>
  );
}
