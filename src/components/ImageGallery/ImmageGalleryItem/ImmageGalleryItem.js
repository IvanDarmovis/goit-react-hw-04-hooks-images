import React from 'react';
import PropTypes from 'prop-types';
import s from './ImmageGalleryItem.module.css';

export default function ImmageGalleryItem({ smallImg, largeImb, onClick }) {
  return (
    <li className={s.galleryItem}>
      <img
        className={s.galleryItemImage}
        src={smallImg}
        alt={largeImb}
        onClick={onClick}
      />
    </li>
  );
}

ImmageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  largeImb: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
