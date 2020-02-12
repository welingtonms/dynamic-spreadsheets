import React from 'react';
import { isEmpty } from 'ramda';

import { AlertManager } from '../../alert';
import { Form } from '../../form';
import { Input } from '../../input';
import ValidationBuilder from '../validation';

class DateCell extends React.PureComponent {
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
    const { required } = column;

    this.initial = { value };

    this.schema = ValidationBuilder.object({
      value: ValidationBuilder.date({ required  })
    });
  }

  handleChange = ({ errors, fields, status, valid }) => {
    const { onChange } = this.props;
    this.setState({ fields, status, valid });

    if (!isEmpty(errors)) {
      AlertManager.error(errors.value);
    }

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

export default DateCell;
