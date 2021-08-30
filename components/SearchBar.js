import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { fireStore } from "./firebase";

import styles from "../styles/SearchBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ search }) => {
  const router = useRouter();
  const [gameSearch, setGameSearch] = useState(search || "");
  const [results, setResults] = useState([]);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (gameSearch.trim() === "" || gameSearch.length === 0) {
      setGameSearch("");
      setResults([]);
      return;
    }
    if (router.pathname === "/") searchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameSearch]);

  const searchGames = async () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        try {
          const gamesRef = fireStore.collection("games");

          const snapshot = await gamesRef
            .where("name", ">=", gameSearch)
            .where("name", "<=", gameSearch + "\uf8ff")
            .limit(6)
            .get();

          if (snapshot.empty) {
            setResults([]);
            return;
          }
          const resultsArray = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            resultsArray.push(data);
          });
          setResults(resultsArray);
        } catch (err) {
          console.log(err);
        }
      }, 250)
    );
  };

  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      router.push(`/search?gameSearch=${gameSearch}`);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <input
          type="text"
          placeholder="Save me some coins"
          value={gameSearch}
          onChange={(e) => setGameSearch(e.target.value)}
          className={styles.input}
          onSubmit={() => router.push(`/search?gameSearch=${gameSearch}`)}
          onKeyPress={handleKeyPress}
        />
        <span
          onClick={() => router.push(`/search?gameSearch=${gameSearch}`)}
          className={styles.icon}
        >
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      {results.length > 0 && router.pathname === "/" ? (
        <>
          <div className={styles.results}>
            {results?.map((r) => (
              <Link key={r.steamID} href={`/games/${r.steamID}`} passHref>
                <div className={styles.singleResult}>
                  <p>{r.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SearchBar;
