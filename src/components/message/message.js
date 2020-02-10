import React from 'react';
import classNames from 'classnames';

import { ICON, TYPE } from './constants';
import { Icon } from '../icon';

import './message.scss';

const Message = ({ type, children, className }) => {
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
        className
      )}
    >
      <Icon name={ICON[type]} />

      {children}
    </p>
  );
};

export default Message;
