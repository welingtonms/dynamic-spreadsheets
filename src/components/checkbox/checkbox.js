import React from 'react';
import classNames from 'classnames';

import './checkbox.scss';

class Checkbox extends React.PureComponent {
  render() {
    const { children, className, ...others } = this.props;

    return (
      <label className={classNames('s-checkbox', className)}>
        {children}
        <input {...others} type="checkbox" />
        <span className="checkmark" />
      </label>
    );
  }
}

export default Checkbox;
