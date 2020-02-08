import React from 'react';
import { connect } from 'react-redux';

import {
  addColumn,
  addRow,
  editColumn
} from '../../state/actions/spreadsheet.actions';
import { Button } from '../../components/button';
import { getSpreadsheet } from '../../state/selectors/spreadsheet.selector';
import { Spreadsheet } from '../../components/spreadsheet';
import generator from '../../test/data-generator';

import './spreadsheet.container.scss';

class SpreadsheetContainer extends React.Component {
  render() {
    const { spreadsheet, addColumn, addRow, editColumn } = this.props;
    const { columns } = spreadsheet;
    return (
      <article className="spreadsheet-container">
        <div className="tools">
          <Button
            highlighted
            onClick={() => {
              addColumn('1', {
                title: generator.word(),
                type: 'text',
                required: false
              });
            }}
          >
            Add column
          </Button>
          <Button
            onClick={() => {
              editColumn('1', {
                row: 0,
                column: 'name',
                value: generator.name()
              });
            }}
          >
            Edit column
          </Button>
          <Button
            onClick={() => {
              addRow(
                '1',
                columns.reduce(
                  (row, column) => {
                    return {
                      ...row,
                      [column.id]: generator.word()
                    };
                  },
                  { id: generator.guid() }
                )
              );
            }}
          >
            Add row
          </Button>
        </div>
        <Spreadsheet {...spreadsheet} />
      </article>
    );
  }
}

const mapStateToProps = state => ({
  spreadsheet: getSpreadsheet(state, '1')
});

const mapDispatchToProps = {
  addColumn,
  addRow,
  editColumn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpreadsheetContainer);
