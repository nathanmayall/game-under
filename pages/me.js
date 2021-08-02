import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/firebase";
import styles from "../styles/me.module.css";

const Me = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) router.push("/");
  }, []);
  return (
    <div>
      Welcome, {user ? user.displayName : "Gamer"}
      {/* {user.email && <div>{user.email}</div>} */}
    </div>
  );
};

export default Me;
