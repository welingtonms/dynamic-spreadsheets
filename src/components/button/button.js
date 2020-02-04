import React from 'react';
import classNames from 'classnames';

import './button.scss';

const Button = ({
  type = 'button',
  children,
  className,
  primary = false,
  ...others
}) => {
  return (
    <button
      type={type}
      className={classNames('s-button', { '-primary': primary }, className)}
      {...others}
    >
      {children}
    </button>
  );
};

export default Button;
