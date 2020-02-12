import { combineReducers } from 'redux';
import { createStore } from 'redux';

import * as reducers from './reducers';

const store = createStore(combineReducers(reducers), {
  spreadsheets: {}
});

export default store;
