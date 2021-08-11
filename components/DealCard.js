import Image from "next/image";
import Link from "next/link";

import styles from "../styles/DealCard.module.css";

const DealCard = ({ deal }) => {
  console.log(deal);

  const {
    gameID,
    name,
    steamAppID,
    salePrice,
    retailPrice,
    steamRatingText,
    steamRatingPercent,
    steamRatingCount31,
    metacriticScore,
    metacriticLink,
    releaseDate,
    publisher,
    steamworks,
    storeInfo,
    cheapestPrice,
    dealLink,
    thumb,
  } = deal;

  const { storeName, images } = storeInfo;

  return (
    <div className={styles.container}>
      Cheapest Deal:
      <div>
        {retailPrice === salePrice ? (
          <p>${retailPrice}</p>
        ) : (
          <p>
            <del>${retailPrice}</del> ${salePrice}!
          </p>
        )}
      </div>
      <p>{storeName}</p>
      <Link href={dealLink} passHref>
        <a target="_blank">
          <Image
            src={`https://cheapshark.com${images.logo}`}
            height={50}
            width={50}
            alt=""
            className={styles.link}
          />
        </a>
      </Link>
    </div>
  );
};

export default DealCard;

// <del>${retailPrice}</del> ${salePrice}
