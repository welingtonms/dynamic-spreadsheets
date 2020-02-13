import React from 'react';
import { connect } from 'react-redux';
import { forEach as each, isEmpty, range } from 'ramda';
import uuid from 'uuid/v4';

import {
  addSpreadsheet,
  addRow,
  editColumn
} from '../../state/actions/spreadsheet.actions';
import { Button } from '../../components/button';
import { getSpreadsheet } from '../../state/selectors/spreadsheet.selector';
import { INITIAL_AMOUNT_OF_ROWS } from './constants';
import { Spreadsheet } from '../../components/spreadsheet';
import { Toolbar } from '../../components/toolbar';
import AddColumModal from './add-column.modal';

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

  handleAddMoreRows = () => {
    const { spreadsheet, addRow } = this.props;
    const { id } = spreadsheet;

    each(() => addRow(id, { id: uuid() }), range(0, INITIAL_AMOUNT_OF_ROWS));
  };

  handleEditSpreadsheet = data => {
    const { editColumn, spreadsheet } = this.props;

    editColumn(spreadsheet.id, data);
  };

  renderSpreadsheetWorkspace = () => {
    const { spreadsheet } = this.props;
    const { columns } = spreadsheet;

    return (
      <React.Fragment>
        <Spreadsheet {...spreadsheet} onChange={this.handleEditSpreadsheet} />
        <Toolbar>
          {!isEmpty(columns) && (
            <Button
              onClick={this.handleAddMoreRows}
              data-test="c-add-rows-button"
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
      <article
        className="spreadsheet-container"
        data-test="c-spreadsheet-container"
      >
        <AddColumModal
          spreadsheet={spreadsheet}
          open={showAddColumnModal}
          onClose={this.handleCloseAddColumnModal}
        />
        <Toolbar>
          <Button
            highlighted
            onClick={this.handleShowAddColumnModal}
            data-test="c-open-add-column-modal"
          >
            Add column
          </Button>
        </Toolbar>
        {spreadsheet && this.renderSpreadsheetWorkspace()}
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
