import React from 'react';
import { omit } from 'ramda';

import { Button } from '../button';
import { KEYS, onKey } from '../../utils/keyboard';

const OMIT_PROPS = ['onClose'];

class ModalClose extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleKey = onKey({
      [KEYS.ESC]: this.handleClose
    });
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKey);
  }

  handleClose() {
    const { onClose } = this.props;

    onClose && onClose();
  }

  render() {
    return (
      <Button
        className="close"
        {...omit(OMIT_PROPS, this.props)}
        onClick={this.handleClose}
      >
        &times;
      </Button>
    );
  }
}

export default ModalClose;
