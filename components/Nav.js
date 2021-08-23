import styles from "../styles/Nav.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuthState } from "react-firebase-hooks/auth";

const signInWithGoogle = async () => {
  auth.signInWithPopup(googleAuthProvider);
};

import { googleAuthProvider, auth, createUserDocument } from "./firebase";

const Nav = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  let userFirstName;

  if (user) {
    userFirstName = user.displayName.split(" ", 1);
    createUserDocument(user);
  }

  return (
    <nav className={styles.navBar}>
      <div className={styles.navAuth}>
        {user ? (
          <>
            <button className={styles.redButton} onClick={() => auth.signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <button className={styles.greenButton} onClick={signInWithGoogle}>
            Sign In
          </button>
        )}
        <p>Welcome, {user ? userFirstName : "Gamer"}</p>
      </div>
      {router.pathname !== "/" ? (
        <div className={styles.title}>
          <Link href={"/"} passHref>
            <h1>Game-Under</h1>
          </Link>
        </div>
      ) : (
        <p></p>
      )}
      {user && (
        <div className={styles.imageWrapper}>
          <Link href={`/me`} passHref>
            <div>
              <Image src={user.photoURL} height={75} width={75} alt="" />
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
