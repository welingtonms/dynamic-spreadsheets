import React from 'react';

import SpreadsheetContainer from './containers/spreadsheet/spreadsheet.container';

import './App.scss';

function App() {
  return (
    <div className="app">
      <header className="header">Dynamic spreadsheet</header>
      <main>
        <SpreadsheetContainer />
      </main>
    </div>
  );
}

export default App;
