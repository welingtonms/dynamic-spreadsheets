import React from 'react';
import classNames from 'classnames';
import { equals } from 'ramda';

import { STATUS } from '../form';
import { DateCell, NumberCell, SelectCell, TextCell } from './cells';

const CELL_TYPES = {
  date: DateCell,
  number: NumberCell,
  select: SelectCell,
  text: TextCell
};

const areEqual = (prev, next) => {
  return ['value', 'status'].every(prop => equals(prev[prop], next[prop]));
};

const Cell = React.memo(({ column, ...others }) => {
  const [status, setStatus] = React.useState('');

  const handleChange = ({ status }) => {
    setStatus(status);
  };

  const { required, type } = column;
  const TypedCell = CELL_TYPES[type];

  return (
    <td
      className={classNames(
        'column',
        {
          '-date': type === 'date',
          '-number': type === 'number',
          '-select': type === 'select',
          '-text': type === 'text'
        },
        {
          'u-has-error': status === STATUS.INVALID
        }
      )}
    >
      <TypedCell
        required={required}
        column={column}
        onChange={handleChange}
        {...others}
      />
    </td>
  );
}, areEqual);

export default Cell;
