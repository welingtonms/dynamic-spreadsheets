import { combineReducers } from 'redux';
import { createStore } from 'redux';

import * as reducers from './reducers';

const store = createStore(combineReducers(reducers), {
  spreadsheets: {
    '1': {
      id: '1',
      columns: [
        {
          id: 'name',
          type: 'text',
          title: 'Name',
          required: true
        },
        {
          id: 'age',
          type: 'text',
          title: 'Age',
          required: false
        }
      ],
      rows: []
    }
  }
});

export default store;
