import Link from "next/link";
import axios from "axios";

import styles from "../styles/Search.module.css";

import SearchBar from "../components/SearchBar";

const Search = ({ searchResults, searchQuery, error }) => {
  console.log(searchResults);
  return (
    <div className={styles.main}>
      <SearchBar search={searchQuery} />
      <p>Results are:</p>
      <div className={styles.results}>
        {searchResults?.map((r) => (
          <Link key={r.steamID} href={`/games/${r.steamID}`} passHref>
            <div className={styles.singleResult}>
              <p>{r.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  try {
    if (!context.query.gameSearch) return;
    const searchQuery = context.query.gameSearch;
    const { data: searchResults } = await axios(
      `/api/search?gameSearch=${searchQuery}`
    );
    return {
      props: { searchResults, searchQuery },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { error: "Something Went Wrong" },
    };
  }
};
