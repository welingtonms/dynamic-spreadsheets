import React from 'react';
import classNames from 'classnames';

import './input.scss';

class Input extends React.PureComponent {
  render() {
    const { className, type = 'text', ...others } = this.props;

    return (
      <input
        type={type}
        className={classNames('s-input', className)}
        {...others}
      />
    );
  }
}

export default Input;
