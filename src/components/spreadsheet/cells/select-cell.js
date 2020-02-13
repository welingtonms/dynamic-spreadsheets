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
    const { required, list } = column;

    this.initial = { value };

    this.schema = ValidationBuilder.object({
      value: ValidationBuilder.oneOf({ required, values: list })
    });
  }

  handleChange = ({ errors, fields, status, valid }) => {
    const { onChange } = this.props;
    this.setState({ fields, status, valid });

    if (!isEmpty(errors)) {
      AlertManager.error(errors.value);
    }

    onChange && onChange({ status, ...fields });
  };

  renderSelect = ({ fields, onChange, onBlur }) => {
    const { column } = this.props;
    const { list = [] } = column;

    return (
      <Select
        name="value"
        className="s-select"
        onBlur={onBlur}
        onChange={onChange}
        value={fields.value}
      >
        <option value={undefined}></option>
        {list.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    );
  };

  render() {
    return (
      <Form
        initial={this.initial}
        onChange={this.handleChange}
        schema={this.schema}
      >
        {this.renderSelect}
      </Form>
    );
  }
}

export default SelectCell;
