import React from 'react';
import { isEmpty } from 'ramda';

import { AlertManager } from '../../alert';
import { Form } from '../../form';
import { Select } from '../../select';
import ValidationBuilder from '../validation';

class SelectCell extends React.PureComponent {
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
      value: ValidationBuilder.oneOf({ required, values: ['a', 'b'] })
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
          <Select
            name="value"
            className="s-select"
            onBlur={onBlur}
            onChange={onChange}
            value={fields.value}
          >
            <option value={undefined}></option>
            <option value="a">a</option>
            <option value="b">b</option>
          </Select>
        )}
      </Form>
    );
  }
}

export default SelectCell;
