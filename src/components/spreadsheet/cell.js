import React from 'react';
import { equals } from 'ramda';

import { DateCell, NumberCell, SelectCell, TextCell } from './cells';

const CELL_TYPES = {
  date: DateCell,
  number: NumberCell,
  select: SelectCell,
  text: TextCell
};

const GenericCell = React.memo(
  ({ type, ...others }) => {
    const Cell = CELL_TYPES[type];

    return <Cell {...others} />;
  },
  (prev, next) => {
    return ['value'].every(prop => equals(prev[prop], next[prop]));
  }
);

export default GenericCell;
