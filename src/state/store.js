import { combineReducers } from 'redux';
import { createStore } from 'redux';

import * as reducers from './reducers';

const store = createStore(combineReducers(reducers), {
  spreadsheets: {
    '1': {
      id: '1',
      columns: [],
      rows: []
    }
  }
});

export default store;
