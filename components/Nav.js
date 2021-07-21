import styles from "../styles/Nav.module.css";

import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./firebase";

const Nav = () => {
  const [user] = useAuthState(auth);

  let userFirstName;

  if (user) {
    userFirstName = user.displayName.split(" ", 1);
  }

  return (
    <nav className={styles.navBar}>
      Welcome, {user ? userFirstName : "Gamer"}
    </nav>
  );
};

export default Nav;
