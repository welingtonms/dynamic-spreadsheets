import React from 'react';
import { connect } from 'react-redux';
import { getSpreadsheet } from '../../state/selectors/spreadsheet.selector';

import Spreadsheet from '../../components/spreadsheet/spreadsheet';

class SpreadsheetContainer extends React.Component {
  render() {
    const { spreadsheet } = this.props;

    return <Spreadsheet {...spreadsheet} />;
  }
}

const mapStateToProps = state => ({
  spreadsheet: getSpreadsheet(state)
});

export default connect(mapStateToProps)(SpreadsheetContainer);
