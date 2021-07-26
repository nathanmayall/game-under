import { fireStore } from "../components/firebase";

import dummyData from "../AllSteamApps.json";

const update = ({ dummyData }) => {
  const updateDB = () => {
    dummyData.forEach(async (game) => {
      const { name, appID, is_free, price_overview } = game;
      const hasPriceOverview = price_overview || null;

      await fireStore
        .collection("games")
        .add({
          steamID: appID,
          name,
          is_free,
          hasPriceOverview,
        })
        .catch((error) => console.log("Error adding document: ", error));
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button onClick={updateDB}>Update master DB</button>
    </div>
  );
};

export default update;

export async function getServerSideProps() {
  return {
    props: { dummyData }, // will be passed to the page component as props
  };
}
