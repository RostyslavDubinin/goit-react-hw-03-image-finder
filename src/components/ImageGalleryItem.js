import React from "react";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ webformatURL, largeImageURL, onOpenModal }) => {
  return (
    <li className={styles.imageGalleryItemImage}>
      <img
        className={styles.imageGalleryItemImage}
        src={webformatURL}
        alt=""
        data-source={largeImageURL}
        onClick={onOpenModal}
      />
    </li>
  );
};

export default ImageGalleryItem;
