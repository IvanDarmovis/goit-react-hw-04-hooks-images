import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ src, onClose }) {
  const modalListener = e => {
    if (e.code === 'Escape') onClose();
  };

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', modalListener);

    return () => window.removeEventListener('keydown', modalListener);
  });

  return createPortal(
    <div className={s.overlay} onClick={onBackdropClick}>
      <div className={s.modal}>
        <img src={src} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
