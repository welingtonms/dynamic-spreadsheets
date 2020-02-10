import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Field } from '../field';
import Radio from './radio';
import './radio-group.scss';

class RadioGroup extends React.PureComponent {
  render() {
    const { className, children, ...others } = this.props;

    return (
      <Field className={classNames('s-radio-group', className)} {...others}>
        {children}
      </Field>
    );
  }
}

RadioGroup.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf([Radio])
    })
  )
};

export default RadioGroup;
