// Based on https://medium.com/@jaouad_45834/building-a-flash-message-component-with-react-js-6288da386d53

import React from 'react';
import uuid from 'uuid/v4';
import { append, tail } from 'ramda';

import { EVENT } from './constants';
import { Message } from '../message';
import { TYPE } from '../message/constants';
import EventManager from './event-manager';

import './alert.scss';

class AlertManager extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.handleAddMessage = this.handleAddMessage.bind(this);
  }

  componentDidMount() {
    EventManager.addListener(EVENT, this.handleAddMessage);
  }

  componentWillUnmount() {
    EventManager.removeListener(EVENT, this.handleAddMessage);
  }

  handleAddMessage({ message, type }) {
    this.setState(({ messages }) => {
      const id = uuid();

      return {
        messages: append(
          {
            id,
            message,
            type
          },
          messages
        )
      };
    }, this.handleRemoveMessage);
  }

  handleRemoveMessage = () => {
    setTimeout(() => {
      this.setState(({ messages }) => ({
        messages: tail(messages)
      }));
    }, 5000);
  };

  render() {
    const { messages } = this.state;

    return (
      <div className="s-alert-manager">
        {messages.map(({ id, message, type }) => (
          <Message mode="dark" key={id} type={type} data-test="c-alert">
            {message}
          </Message>
        ))}
      </div>
    );
  }
}

AlertManager.show = (message, type = TYPE.INFO) => {
  EventManager.emit(EVENT, { message, type });
};

AlertManager.info = message => {
  AlertManager.show(message, TYPE.INFO);
};

AlertManager.warn = message => {
  AlertManager.show(message, TYPE.WARN);
};

AlertManager.error = message => {
  AlertManager.show(message, TYPE.ERROR);
};

AlertManager.success = message => {
  AlertManager.show(message, TYPE.SUCCESS);
};

export default AlertManager;
