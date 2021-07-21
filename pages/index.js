import Head from "next/head";
import styles from "../styles/Home.module.css";

import { googleAuthProvider, auth } from "../components/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

const signInWithGoogle = async () => {
  auth.signInWithPopup(googleAuthProvider);
};

import SearchBar from "../components/SearchBar";

export default function Home() {
  const [user] = useAuthState(auth);

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
            <h2>{user ? "Sign Out" : "Sign In"} &rarr;</h2>
            {user ? (
              <button onClick={() => auth.signOut()}>Sign Out</button>
            ) : (
              <button onClick={signInWithGoogle}>
                Use Google Auth to Login/Register
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
