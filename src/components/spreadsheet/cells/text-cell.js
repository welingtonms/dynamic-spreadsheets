import React from 'react';
import { isNil } from 'ramda';
import { Input } from '../../input';

class TextCell extends React.PureComponent {
  render() {
    const { value = '' } = this.props;

    return <Input defaultValue={value} />;
  }
}

export default TextCell;
