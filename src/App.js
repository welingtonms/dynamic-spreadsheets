import React from 'react';

import { AlertManager } from './components/alert';
import SpreadsheetContainer from './containers/spreadsheet/spreadsheet.container';

import './App.scss';

function App() {
  return (
    <main className="app">
      <AlertManager />
      <SpreadsheetContainer />
    </main>
  );
}

export default App;
