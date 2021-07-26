import styles from "../styles/Nav.module.css";

import { useAuthState } from "react-firebase-hooks/auth";

const signInWithGoogle = async () => {
  auth.signInWithPopup(googleAuthProvider);
};

import { googleAuthProvider, auth } from "./firebase";

const Nav = () => {
  const [user] = useAuthState(auth);

  let userFirstName;

  if (user) {
    userFirstName = user.displayName.split(" ", 1);
  }

  return (
    <nav className={styles.navBar}>
      Welcome, {user ? userFirstName : "Gamer"}
      <div className={styles.navAuth}>
        {user ? (
          <button onClick={() => auth.signOut()}>Sign Out</button>
        ) : (
          <button onClick={signInWithGoogle}>
            {user ? "Sign Out" : "Sign In"}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
