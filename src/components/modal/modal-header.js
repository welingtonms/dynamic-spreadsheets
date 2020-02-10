import React from 'react';
import classNames from 'classnames';

const ModalHeader = ({ children, className, ...others }) => {
  return (
    <header className={classNames('header', className)} {...others}>
      {children}
    </header>
  );
};

export default ModalHeader;
