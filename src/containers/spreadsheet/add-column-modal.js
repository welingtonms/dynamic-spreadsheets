import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';

import { addColumn } from '../../state/actions/spreadsheet.actions';
import { Button } from '../../components/button';
import { Checkbox } from '../../components/checkbox';
import { Field } from '../../components/field';
import { Form } from '../../components/form';
import { INITIAL_STATE } from './constants';
import { Input } from '../../components/input';
import { Message } from '../../components/message';
import { Modal } from '../../components/modal';
import { RadioGroup, Radio } from '../../components/radio-group';

class AddColumnModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false
    };
  }

  handleUpdate = ({ fields, status, valid }) => {
    this.setState({ fields, status, valid });
  };

  handleClose = () => {
    const { onClose } = this.props;

    onClose && onClose();
  };

  handleAddColumn = () => {
    const { fields } = this.state;
    const { type, title, required } = fields;
    const { addColumn, spreadsheet } = this.props;

    addColumn(spreadsheet.id, {
      title,
      type,
      required
    });

    this.handleClose();
  };

  render() {
    const { valid } = this.state;
    const { spreadsheet, addColumn, ...others } = this.props;

    return (
      <Modal {...others} onClose={this.handleClose}>
        <Modal.Header>
          <h1>Add new column</h1>
        </Modal.Header>
        <Modal.Body>
          <Form
            initial={INITIAL_STATE}
            onUpdate={this.handleUpdate}
            schema={yup.object({
              title: yup
                .string()
                .trim()
                .required()
            })}
          >
            {({ fields, errors, onChange, onBlur }) => (
              <React.Fragment>
                <Field label="Title" required>
                  <Input
                    name="title"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={fields.title}
                  />
                  {errors.title && (
                    <Message type="error">{errors.title}</Message>
                  )}
                </Field>
                <Field>
                  <Checkbox
                    name="required"
                    onChange={onChange}
                    checked={fields.required}
                  >
                    Required column
                  </Checkbox>
                </Field>
                <RadioGroup label="Column type" onChange={onChange}>
                  {['text', 'number', 'date', 'list'].map(value => (
                    <Radio
                      key={value}
                      name="type"
                      value={value}
                      defaultChecked={value === fields.type}
                    >
                      {value}
                    </Radio>
                  ))}
                </RadioGroup>
              </React.Fragment>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!valid}
            highlighted
            onClick={this.handleAddColumnAndClose}
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
