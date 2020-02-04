import React from 'react';
import { connect } from 'react-redux';

import { addColumn } from '../../state/actions/spreadsheet.actions';
import { Button } from '../../components/button';
import { getSpreadsheet } from '../../state/selectors/spreadsheet.selector';
import { Spreadsheet } from '../../components/spreadsheet';

class SpreadsheetContainer extends React.Component {
  render() {
    const { spreadsheet } = this.props;

    return (
      <article>
        <Spreadsheet {...spreadsheet} />
        <Button>Add column</Button>
      </article>
    );
  }
}

const mapStateToProps = state => ({
  spreadsheet: getSpreadsheet(state)
});

const mapDispatchToProps = {
  addColumn
};

export default connect(mapStateToProps, mapDispatchToProps)(SpreadsheetContainer);
