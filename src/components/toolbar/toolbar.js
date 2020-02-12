import React from 'react';
import classNames from 'classnames';

import './toolbar.scss';

class Toolbar extends React.PureComponent {
  render() {
    const { children, className, ...others } = this.props;

    return (
      <div className={classNames('s-toolbar', className)} {...others}>
        {children}
      </div>
    );
  }
}

export default Toolbar;
