import React from 'react';
import { isNil } from 'ramda';

class TextCell extends React.PureComponent {
  render() {
    const { value } = this.props;

    if (isNil(value)) {
      return '';
    }

    return value;
  }
}

export default TextCell;
