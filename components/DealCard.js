import Image from "next/image";
import Link from "next/link";

import styles from "../styles/DealCard.module.css";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

const DealCard = ({ deal, history }) => {
  const {
    gameID,
    name,
    steamAppID,
    salePrice,
    retailPrice,
    steamRatingText,
    steamRatingPercent,
    steamRatingCount,
    metacriticScore,
    metacriticLink,
    releaseDate,
    publisher,
    steamworks,
    storeInfo,
    dealLink,
    thumb,
  } = deal;

  const { price: cheapestEverPrice, date: cheapestEverDateStamp } = history;

  const formatDate = (date) => dayjs.unix(date).format("MMMM Do, YYYY");

  const { storeName, images } = storeInfo;

  return (
    <div className={styles.container}>
      <div>
        {cheapestEverPrice && (
          <div>
            Lowest: ${cheapestEverPrice} on {formatDate(cheapestEverDateStamp)}
          </div>
        )}
      </div>
      <div>
        {retailPrice === salePrice ? (
          <p>Now: ${retailPrice}</p>
        ) : (
          <p>
            Now: <del>${retailPrice}</del> ${salePrice}!
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
