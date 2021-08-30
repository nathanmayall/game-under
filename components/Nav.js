import styles from "@/styles/Nav.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuthState } from "react-firebase-hooks/auth";

const signInWithGoogle = async () => {
  auth.signInWithPopup(googleAuthProvider);
};

import {
  googleAuthProvider,
  auth,
  createUserDocument,
} from "@/components/firebase";

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
          <button className={styles.redButton} onClick={() => auth.signOut()}>
            Sign Out
          </button>
        ) : (
          <button className={styles.greenButton} onClick={signInWithGoogle}>
            Sign In
          </button>
        )}
        <p className={styles.welcome}>
          Welcome, {user ? userFirstName : "Gamer"}
        </p>
      </div>
      {router.pathname !== "/" ? (
        <div className={styles.title}>
          <Link href={"/"} passHref>
            <h1>
              G<span className={styles.mobileTitle}>ame-</span>U
              <span className={styles.mobileTitle}>nder</span>
            </h1>
          </Link>
        </div>
      ) : (
        <p></p>
      )}
      {user && (
        <div className={styles.navImage}>
          <Link href={`/me`} passHref>
            <a>
              <Image
                src={user.photoURL}
                height={75}
                width={75}
                alt=""
                className={styles.imageWrapper}
              />
            </a>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
