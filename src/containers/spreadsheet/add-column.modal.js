import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as yup from 'yup';

import { addColumn } from '../../state/actions/spreadsheet.actions';
import { AlertManager } from '../../components/alert';
import { Button } from '../../components/button';
import { Checkbox } from '../../components/checkbox';
import { Field } from '../../components/field';
import { Form } from '../../components/form';
import { INITIAL_STATE } from './constants';
import { Input } from '../../components/input';
import { Message } from '../../components/message';
import { Modal } from '../../components/modal';
import { RadioGroup, Radio } from '../../components/radio-group';
import { isNil, complement, equals, map, trim, split, unless } from 'ramda';

class AddColumnModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false
    };

    this.schema = yup.object({
      title: yup
        .string()
        .trim()
        .required(),
      type: yup.string(),
      list: yup.string().when('type', {
        is: 'select',
        then: fieldSchema =>
          fieldSchema.required('List of accepted values is required')
      })
    });
  }

  handleChange = ({ fields, status, valid }) => {
    this.setState({ fields, status, valid });
  };

  handleClose = () => {
    const { onClose } = this.props;

    onClose && onClose();
  };

  handleAddColumn = () => {
    const { fields } = this.state;
    const { type, title, required, list } = fields;
    const { addColumn, spreadsheet } = this.props;

    let additional = {};

    const different = complement(equals);
    unless(different('select'), () => {
      additional = {
        list: map(trim, split(',', list))
      };
    })(type);

    addColumn(spreadsheet.id, {
      title,
      type,
      required,
      ...additional
    });

    AlertManager.success(`Column ${title} added!`);

    this.handleClose();
  };

  renderForm = ({ fields, errors, onChange, onBlur }) => (
    <React.Fragment>
      <Field required label="Title">
        <Input
          name="title"
          className={classNames({
            'u-has-error': !isNil(errors.title)
          })}
          onBlur={onBlur}
          onChange={onChange}
          value={fields.title}
          data-test="c-add-column-modal-title"
        />
        {errors.title && (
          <Message borderless type="error">
            {errors.title}
          </Message>
        )}
      </Field>
      <Field>
        <Checkbox
          name="required"
          onChange={onChange}
          onBlur={onBlur}
          checked={fields.required}
        >
          Required column
        </Checkbox>
      </Field>
      <RadioGroup label="Column type" onChange={onChange} onBlur={onBlur}>
        {['text', 'number', 'date', 'select'].map(value => (
          <Radio
            key={value}
            name="type"
            value={value}
            defaultChecked={value === fields.type}
            data-test="c-add-column-modal-type"
          >
            {value}
          </Radio>
        ))}
      </RadioGroup>
      {fields.type === 'select' && (
        <Field required label="Accepted values (comma-separated)">
          <Input
            name="list"
            className={classNames({
              'u-has-error': !isNil(errors.list)
            })}
            onBlur={onBlur}
            onChange={onChange}
            value={fields.list}
            data-test="c-add-column-modal-list"
          />
          {errors.list && (
            <Message borderless type="error">
              {errors.list}
            </Message>
          )}
        </Field>
      )}
    </React.Fragment>
  );

  render() {
    const { valid } = this.state;
    const { spreadsheet, addColumn, ...others } = this.props;

    return (
      <Modal
        className="add-column-modal"
        {...others}
        onClose={this.handleClose}
        data-test="c-add-column-modal"
      >
        <Modal.Header>
          <h1>Add new column</h1>
        </Modal.Header>
        <Modal.Body>
          <Form
            initial={INITIAL_STATE}
            onChange={this.handleChange}
            schema={this.schema}
          >
            {this.renderForm}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!valid}
            highlighted
            onClick={this.handleAddColumn}
            data-test="c-add-column-button"
          >
            Add column &amp; Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  addColumn
};

export default connect(null, mapDispatchToProps)(AddColumnModal);
