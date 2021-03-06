import Link from "next/link";
import axios from "axios";

import styles from "@/styles/Search.module.css";

import SearchBar from "@/components/SearchBar";

const Search = ({ searchResults, searchQuery, error }) => {
  if (!error) {
    return (
      <div className={styles.main}>
        <SearchBar search={searchQuery} />
        {searchResults.length > 0 ? (
          <p>Results are:</p>
        ) : (
          <p>No results found</p>
        )}
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
  } else {
    return (
      <div className={styles.main}>
        <SearchBar search={searchQuery} />
        <p>Error: {error}</p>
      </div>
    );
  }
};

export default Search;

export const getServerSideProps = async (context) => {
  try {
    if (!context.query.gameSearch)
      return {
        props: { searchResults: [], searchQuery: "" },
      };

    const searchQuery = context.query.gameSearch;

    const { data: searchResults } = await axios(
      `/api/search?gameSearch=${searchQuery}`
    );

    return {
      props: { searchResults, searchQuery },
    };
  } catch (error) {
    const searchQuery = context.query.gameSearch;
    if (error.response.status === 404) {
      return {
        props: { searchResults: [], searchQuery },
      };
    } else {
      return {
        props: { error: "Something Went Wrong" },
      };
    }
  }
};
