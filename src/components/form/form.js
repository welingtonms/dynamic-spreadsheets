import React from 'react';
import classNames from 'classnames';
import { assoc, isNil } from 'ramda';
import { always, cond, equals } from 'ramda';

import { to } from '../../utils/async';
import { STATUS } from './constants';

import './form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);

    const { initial = {} } = props;

    this.state = {
      fields: { ...initial },
      status: STATUS.IDLE,
      errors: {}
    };
  }

  publish = () => {
    const { fields, status, errors } = this.state;
    const { onChange } = this.props;

    onChange &&
      onChange({ fields, status, errors, valid: status === STATUS.VALID });
  };

  handleChange = ({ target }) => {
    const { value, name, type, checked } = target;
    const { fields } = this.state;

    const handleChecked = () => assoc(name, checked, fields);
    const handleValue = () => assoc(name, value, fields);

    this.setState({
      fields: cond([
        [equals('checkbox'), handleChecked],
        [always(true), handleValue]
      ])(type)
    }, this.publish);
  };

  handleBlur = () => {

  }

  validate = async () => {
    const { fields } = this.state;
    const { schema } = this.props;

    this.setState(
      {
        status: STATUS.VALIDATING,
        errors: {}
      },
      async () => {
        this.publish();

        if (isNil(schema)) {
          const status = STATUS.VALID;

          this.setState(
            {
              status
            },
            this.publish
          );

          return;
        }

        const [error] = await to(schema.validate(fields));

        let errors = {};
        let status = STATUS.VALID;

        if (!isNil(error)) {
          errors = { [error.path]: error.message };
          status = STATUS.INVALID;
        }

        this.setState(
          {
            status,
            errors
          },
          this.publish
        );
      }
    );
  };

  render() {
    const { className, children } = this.props;
    const { errors, fields, status } = this.state;

    return (
      <form className={classNames('s-form', className)}>
        {children({
          fields,
          errors,
          status,
          onChange: this.handleChange,
          onBlur: this.validate
        })}
      </form>
    );
  }
}

export default Form;
