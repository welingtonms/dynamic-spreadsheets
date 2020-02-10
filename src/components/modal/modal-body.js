import React from 'react';
import classNames from 'classnames';

const ModalBody = ({ children, className, ...others }) => {
  return (
    <div className={classNames('body', className)} {...others}>
      {children}
    </div>
  );
};

export default ModalBody;
