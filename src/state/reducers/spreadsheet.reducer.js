import { createReducer } from './utils';
import { ActionTypes } from '../actions/spreadsheet.actions';
import { append, evolve, pipe, prop, assoc, assocPath } from 'ramda';

export default createReducer(
  {},
  {
    [ActionTypes.ADD_COLUMN]: (state, action) => {
      const { payload } = action;
      const { spreadsheetID, column } = payload;

      const transformations = {
        columns: append(column)
      };

      const spreadsheet = pipe(
        prop(spreadsheetID),
        evolve(transformations)
      )(state);

      return assoc(spreadsheetID, spreadsheet, state);
    },
    [ActionTypes.ADD_ROW]: (state, action) => {
      const { payload } = action;
      const { spreadsheetID, row } = payload;

      const transformations = {
        rows: append(row)
      };

      const spreadsheet = pipe(
        prop(spreadsheetID),
        evolve(transformations)
      )(state);

      return assoc(spreadsheetID, spreadsheet, state);
    },
    [ActionTypes.EDIT_COLUMN]: (state, action) => {
      const { payload } = action;
      const { spreadsheetID, row, column, value } = payload;

      return assocPath([spreadsheetID, 'rows', row, column], value, state);
    }
  }
);
