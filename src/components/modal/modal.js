import React from 'react';
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

import ModalBody from './modal-body';
import ModalClose from './modal-close';
import ModalFooter from './modal-footer';
import ModalHeader from './modal-header';

import './modal.scss';

class Modal extends React.PureComponent {
  handleClickOutside = e => {
    const { onClose } = this.props;

    onClose && onClose();
  };

  render() {
    const { className, onClose, open, children, ...others } = this.props;

    if (!open) {
      return null;
    }

    return (
      <div className="s-overlay">
        <OutsideClickHandler display="contents" onOutsideClick={this.handleClickOutside}>
          <section className={classNames('s-modal', className)} {...others}>
            <ModalClose onClose={onClose} />
            {children}
          </section>
        </OutsideClickHandler>
      </div>
    );
  }
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
