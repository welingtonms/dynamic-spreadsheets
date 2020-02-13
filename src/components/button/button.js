import React from 'react';
import classNames from 'classnames';

import './button.scss';

const Button = ({
  type = 'button',
  children,
  className,
  highlighted = false,
  ...others
}) => {
  return (
    <button
      type={type}
      className={classNames(
        's-button',
        { '-highlighted': highlighted },
        className
      )}
      data-test="c-button"
      {...others}
    >
      {children}
    </button>
  );
};

export default Button;
