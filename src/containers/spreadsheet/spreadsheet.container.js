import React from 'react';
import { connect } from 'react-redux';

import {
  addSpreadsheet,
  addRow,
  editColumn
} from '../../state/actions/spreadsheet.actions';
import { Button } from '../../components/button';
import { getSpreadsheet } from '../../state/selectors/spreadsheet.selector';
import { Spreadsheet } from '../../components/spreadsheet';
import generator from '../../test/data-generator';
import AddColumModal from './add-column-modal';
import { AlertManager } from '../../components/alert';

import './spreadsheet.container.scss';

class SpreadsheetContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddColumnModal: false
    };
  }

  handleCloseAddColumnModal = () => {
    this.setState({
      showAddColumnModal: false
    });
  };

  handleShowAddColumnModal = () => {
    this.setState({
      showAddColumnModal: true
    });
  };

  render() {
    const { spreadsheet, addRow, editColumn, addSpreadsheet } = this.props;
    const { columns } = spreadsheet;
    const { showAddColumnModal } = this.state;

    return (
      <article className="spreadsheet-container">
        <AddColumModal
          spreadsheet={spreadsheet}
          open={showAddColumnModal}
          onClose={this.handleCloseAddColumnModal}
        />

        <div className="tools">
          <Button onClick={this.handleShowAddColumnModal}>Add column</Button>
          <Button
            onClick={() => {
              editColumn(spreadsheet.id, {
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
                spreadsheet.id,
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
          <Button
            onClick={() => {
              AlertManager.show(
                generator.sentence({ words: 6 }),
                generator.pick(['error', 'warn', 'info', 'success'])
              );
            }}
          >
            Add message
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
  addRow,
  editColumn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpreadsheetContainer);
