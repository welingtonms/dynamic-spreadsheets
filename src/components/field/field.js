import React from 'react';
import classNames from 'classnames';

import {
  getRequiredMessage,
  getRequiredIndicator
} from '../../utils/validation';
import './field.scss';

const Field = ({ className, children, label, required = false, ...others }) => (
  <fieldset className={classNames('s-field', '', className)} {...others}>
    {label && (
      <legend className="label" title={getRequiredMessage(label)}>
        {label}
        {required && getRequiredIndicator()}
      </legend>
    )}
    {children}
  </fieldset>
);

export default Field;
