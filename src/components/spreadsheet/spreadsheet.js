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
        <Message borderless>Add a column to start working on your spreadsheet!</Message>
      )
    }

    return (
      <React.Fragment>
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
                  <td
                    className={classNames('column', {
                      '-date': column.type === 'date',
                      '-number': column.type === 'number',
                      '-select': column.type === 'select',
                      '-text': column.type === 'text'
                    })}
                    key={column.id}
                  >
                    <Cell
                      type={column.type}
                      column={column.id}
                      row={index}
                      value={row[column.id]}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <small>(*) Required column</small>
      </React.Fragment>
    );
  }
}

Spreadsheet.defaultProps = {

}

export default Spreadsheet;
