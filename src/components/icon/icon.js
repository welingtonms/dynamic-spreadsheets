import React from 'react';
import classNames from 'classnames';

import mapping from './icon-mapping.json';

import './icon.scss';

const Icon = ({ name }) => {
  const id = mapping[name];
  return (
    <img
      alt="name"
      className={classNames('s-icon', id)}
      src={`${process.env.PUBLIC_URL}/icons/${id}.svg`}
    />
  );
};

export default Icon;
