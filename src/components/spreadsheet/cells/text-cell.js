import React from 'react';
import classNames from 'classnames';
import * as yup from 'yup';

import { Input } from '../../input';
import { Form } from '../../form';
import { AlertManager } from '../../alert';
import { isEmpty } from 'ramda';

class TextCell extends React.PureComponent {
  constructor(props) {
    super(props);

    this.setup(props);

    this.state = {
      fields: this.initial,
      status: '',
      valid: false
    };
  }

  setup(props) {
    const { value = '', column } = props;
    const { title } = column;

    this.initial = { value };

    this.schema = yup.object({
      value: yup
        .string()
        .trim()
        .required(`${title} is a required column`)
    });
  }

  handleChange = ({ errors, fields, status, valid }) => {
    const { onChange } = this.props;
    this.setState({ fields, status, valid });

    if (!isEmpty(errors)) {
      AlertManager.error(errors.value);
    }
    console.log({ errors });

    onChange && onChange({ status });
  };

  render() {
    return (
      <Form
        initial={this.initial}
        onChange={this.handleChange}
        schema={this.schema}
      >
        {({ fields, onChange, onBlur }) => (
          <Input
            name="value"
            onBlur={onBlur}
            onChange={onChange}
            value={fields.value}
          />
        )}
      </Form>
    );
  }
}

export default TextCell;
