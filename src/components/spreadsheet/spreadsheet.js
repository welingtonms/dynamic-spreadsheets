import React from 'react';

class Spreadsheet extends React.PureComponent {
  render() {
    return <div className="spreadsheet">{JSON.stringify(this.props)}</div>;
  }
}

export default Spreadsheet;
