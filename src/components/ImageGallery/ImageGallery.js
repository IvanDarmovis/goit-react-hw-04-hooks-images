import React from 'react';
import ImmageGalleryItem from './ImmageGalleryItem';

import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const galleryClasses = `gallery ${s.gallery}`;

export default function ImageGallery({ status, images, onClick }) {
  if (status === 'iddle')
    return (
      <div className={s.start}>
        <p>No images loaded</p>
      </div>
    );

  if (status === 'error')
    return (
      <div className={s.start}>
        <p>Something went wrong. Try again!</p>
      </div>
    );

  if (status === 'resolved' || 'pending')
    return (
      <div className={s.container}>
        <ul className={galleryClasses}>
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <ImmageGalleryItem
              onClick={onClick}
              key={id}
              smallImg={webformatURL}
              largeImb={largeImageURL}
            />
          ))}
        </ul>
      </div>
    );
}

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
