import React from 'react';

import ModalBody from './modal-body';
import ModalClose from './modal-close';
import ModalFooter from './modal-footer';
import ModalHeader from './modal-header';

import './modal.scss';

class Modal extends React.PureComponent {
  render() {
    const { onClose, open, children } = this.props;

    if (!open) {
      return null;
    }

    return (
      <div className="s-overlay">
        <section className="s-modal">
          <ModalClose onClose={onClose} />
          {children}
        </section>
      </div>
    );
  }
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
