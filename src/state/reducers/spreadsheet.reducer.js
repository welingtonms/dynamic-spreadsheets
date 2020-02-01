import { createReducer } from './utils';
import { ActionTypes } from '../actions/spreadsheet.actions';

export default createReducer(
  {},
  {
    [ActionTypes.ADD_COLUMN]: (state, action) => {
      const text = action.text.trim();
      return [...state, text];
    },
    [ActionTypes.ADD_ROW]: (state, action) => {
      const text = action.text.trim();
      return [...state, text];
    }
  }
);
