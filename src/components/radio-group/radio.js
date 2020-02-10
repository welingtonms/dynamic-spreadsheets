import React from 'react';
import classNames from 'classnames';

class Radio extends React.PureComponent {
  render() {
    const { children, className, ...others } = this.props;

    return (
      <label className={classNames('s-radio', className)}>
        {children}
        <input {...others} type="radio" />
        <span className="checkmark" />
      </label>
    );
  }
}

export default Radio;
