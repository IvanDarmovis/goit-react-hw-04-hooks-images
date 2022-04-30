import React from 'react';

export default function ImmageGalleryItem({ smallImg, largeImb }) {
  return (
    <li className="gallery-item">
      <img src={smallImg} alt={largeImb} />
    </li>
  );
}
