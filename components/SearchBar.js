import styles from "../styles/SearchBar.module.css";

const SearchBar = () => {
  return (
    <>
      <input className={styles.input} />
      <span className={styles.icon}>🔎</span>
    </>
  );
};

export default SearchBar;
