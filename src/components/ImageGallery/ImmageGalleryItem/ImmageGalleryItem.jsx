import React from 'react';
import s from './ImmageGalleryItem.module.css';

export default function ImmageGalleryItem({ smallImg, largeImb }) {
  return (
    <li className={s.galleryItem}>
      <img className={s.galleryItemImage} src={smallImg} alt={largeImb} />
    </li>
  );
}
