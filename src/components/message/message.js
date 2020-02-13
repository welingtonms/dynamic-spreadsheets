import React from 'react';
import classNames from 'classnames';

import { ICON, TYPE } from './constants';
import { Icon } from '../icon';

import './message.scss';

const Message = ({
  type,
  borderless,
  children,
  className,
  mode = 'light',
  ...others
}) => {
  const icon = ICON[type];

  return (
    <p
      role="status"
      aria-live="polite"
      className={classNames(
        's-message',
        {
          '-info': type === TYPE.INFO,
          '-success': type === TYPE.SUCCESS,
          '-error': type === TYPE.ERROR,
          '-warn': type === TYPE.WARN
        },
        {
          '-light': mode === 'light',
          '-dark': mode === 'dark'
        },
        {
          'u-is-borderless': borderless
        },
        className
      )}
      {...others}
    >
      {icon && <Icon name={icon} />}

      {children}
    </p>
  );
};

export default Message;
