import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { forEach as each, isEmpty, range } from 'ramda';

import {
  addSpreadsheet,
  addRow,
  editColumn
} from '../../state/actions/spreadsheet.actions';
import { AlertManager } from '../../components/alert';
import { Button } from '../../components/button';
import { getSpreadsheet } from '../../state/selectors/spreadsheet.selector';
import { Spreadsheet } from '../../components/spreadsheet';
import { Toolbar } from '../../components/toolbar';
import { INITIAL_AMOUNT_OF_ROWS } from './constants';
import AddColumModal from './add-column.modal';
import generator from '../../test/data-generator';

import './spreadsheet.container.scss';

class SpreadsheetContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddColumnModal: false
    };
  }

  componentDidMount() {
    const { addSpreadsheet } = this.props;
    addSpreadsheet(INITIAL_AMOUNT_OF_ROWS);
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

  renderSpreadsheetWorkspace = () => {
    const { spreadsheet, addRow } = this.props;
    const { id, columns } = spreadsheet;

    return (
      <React.Fragment>
        <Spreadsheet {...spreadsheet} />
        <Toolbar>
          {!isEmpty(columns) && (
            <Button
              onClick={() => {
                each(
                  () => addRow(id, { id: uuid() }),
                  range(0, INITIAL_AMOUNT_OF_ROWS)
                );
              }}
            >
              {`Add ${INITIAL_AMOUNT_OF_ROWS} rows`}
            </Button>
          )}
        </Toolbar>
      </React.Fragment>
    );
  };

  render() {
    const { spreadsheet } = this.props;
    const { showAddColumnModal } = this.state;

    return (
      <article className="spreadsheet-container">
        <AddColumModal
          spreadsheet={spreadsheet}
          open={showAddColumnModal}
          onClose={this.handleCloseAddColumnModal}
        />

        <Toolbar>
          <Button highlighted onClick={this.handleShowAddColumnModal}>Add column</Button>
          {/* <Button
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
          </Button> */}
          <Button
            onClick={() => {
              AlertManager.show(
                generator.sentence({ words: 15 }),
                generator.pick(['error', 'warn', 'info', 'success'])
              );
            }}
          >
            Add message
          </Button>
        </Toolbar>
        {spreadsheet && this.renderSpreadsheetWorkspace()}
        {!spreadsheet && 'aa'}
      </article>
    );
  }
}

const mapStateToProps = state => ({
  spreadsheet: getSpreadsheet(state)
});

const mapDispatchToProps = {
  addSpreadsheet,
  addRow,
  editColumn
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpreadsheetContainer);
