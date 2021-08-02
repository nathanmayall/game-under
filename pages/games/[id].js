import axios from "axios";
import styles from "../../styles/GamePage.module.css";

const GamesPage = ({ game, error }) => {
  const {
    header_image,
    name,
    short_description,
    developers,
    publishers,
    platforms,
    appID,
  } = game;

  return (
    <div className={styles.main}>
      <img src={header_image} />
      <h1 className={styles.bold}>{name}</h1>
      <div>
        <h3>Description:</h3>
        <p>{short_description}</p>
      </div>
      <div className={styles.developers}>
        <h3>Developers:</h3>
        <ul>
          {developers.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <div className={styles.platforms}>
        <h3>Platforms:</h3>
        <ul>
          {Object.keys(platforms).map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>{appID}</h3>
      </div>
    </div>
  );
};

export default GamesPage;

export const getServerSideProps = async (context) => {
  try {
    if (!context.params.id) return;
    const appID = context.params.id;
    const { data: game } = await axios(
      `https://api.steamapis.com/market/app/${appID}?api_key=${process.env.STEAM_API_KEY}`
    );
    return {
      props: { game },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { error: "Something Went Wrong" },
    };
  }
};
