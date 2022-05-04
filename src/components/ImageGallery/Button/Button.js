import React from 'react';
import s from './Button.module.css';

export default function Button({ onClick, children }) {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      {children}
    </button>
  );
}
