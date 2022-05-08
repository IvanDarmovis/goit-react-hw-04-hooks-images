import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.modalListener);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.modalListener);
  }

  modalListener = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  onBackdropClick = e => {
    if (e.target === e.currentTarget) this.props.onClose();
  };

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.onBackdropClick}>
        <div className={s.modal}>
          <img src={this.props.src} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
