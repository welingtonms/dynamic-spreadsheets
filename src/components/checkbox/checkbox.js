import React from 'react';
import uuid from 'uuid/v4';
import classNames from 'classnames';

import './checkbox.scss';

class Checkbox extends React.PureComponent {
  constructor(props) {
    super(props);

    const { id } = this.props;
    this.id = id || uuid();
  }
  
  render() {
    const { children, className, ...others } = this.props;

    return (
      <label htmlFor={this.id} className={classNames('s-checkbox', className)}>
        {children}
        <input {...others} id={this.id} type="checkbox" />
        <span className="checkmark" />
      </label>
    );
  }
}

export default Checkbox;
