import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/DealCard.module.css";

const DealCard = ({ deal }) => {
  const { salePrice, normalPrice, storeInfo, dealLink } = deal;

  const { storeName, images } = storeInfo;

  return (
    <div className={styles.container}>
      <div>
        {normalPrice === salePrice ? (
          <p>${normalPrice}</p>
        ) : (
          <p>
            <del>${normalPrice}</del> ${salePrice}!
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
