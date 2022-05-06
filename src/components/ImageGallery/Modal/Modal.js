import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.modalListener);
    console.log('open');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.modalListener);
    console.log('closed');
  }

  modalListener = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  onBackdropClick = e => {
    console.log(e.target);
    console.log(e.currentTarget);
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
