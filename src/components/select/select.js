import React from 'react';
import classNames from 'classnames';

import './select.scss';

class Select extends React.PureComponent {
  render() {
    const { className, ...others } = this.props;

    return (
      <select
        className={classNames('s-select', className)}
        data-test="c-select"
        {...others}
      />
    );
  }
}

export default Select;
