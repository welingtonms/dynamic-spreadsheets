import React from 'react';
import classNames from 'classnames';

const ModalFooter = ({ children, className, ...others }) => {
  return (
    <footer className={classNames('footer', className)} {...others}>
      {children}
    </footer>
  );
};

export default ModalFooter;
