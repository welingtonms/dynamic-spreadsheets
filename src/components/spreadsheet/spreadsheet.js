import React from 'react';
import classNames from 'classnames';
import { isEmpty, isNil } from 'ramda';

import { Message } from '../message';
import {
  getRequiredMessage,
  getRequiredIndicator
} from '../../utils/validation';
import Cell from './cell';

import './spreadsheet.scss';

class Spreadsheet extends React.PureComponent {
  render() {
    const { title, id, columns, rows } = this.props;

    if (isNil(columns) || isEmpty(columns)) {
      return (
        <Message borderless>
          Add a column to start working on your spreadsheet!
        </Message>
      );
    }

    return (
      <table className="s-spreadsheet">
        {title && (
          <caption className="caption" id={`caption-${id}`}>
            {title}
          </caption>
        )}
        <thead className="header">
          <tr className="row">
            <th className="column -index"></th>
            {columns.map(({ id, type, title, required = false }) => (
              <th
                className={classNames('column', {
                  '-date': type === 'date',
                  '-number': type === 'number',
                  '-select': type === 'select',
                  '-text': type === 'text'
                })}
                role="columnheader"
                scope="col"
                key={id}
                title={`${required ? getRequiredMessage(title) : title}`}
              >
                {title}
                {required && getRequiredIndicator()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="body">
          {rows.map((row, index) => (
            <tr className="row" key={row.id}>
              <th className="column -index">{index + 1}</th>
              {columns.map(column => (
                <Cell key={column.id} column={column} value={row[column.id]} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Spreadsheet.defaultProps = {};

export default Spreadsheet;
