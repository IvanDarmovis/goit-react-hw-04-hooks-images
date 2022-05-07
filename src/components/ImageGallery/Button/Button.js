import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ onClick, children }) {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
