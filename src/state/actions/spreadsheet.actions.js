import uuid from 'uuid/v4';

export const ActionTypes = {
  ADD_SPREADSHEET: 'ADD_ADD_SPREADSHEET',
  ADD_COLUMN: 'ADD_COLUMN',
  ADD_ROW: 'ADD_ROW',
  EDIT_COLUMN: 'EDIT_COLUMN'
};

export function addSpreadsheet(amountOfRows) {
  return {
    type: ActionTypes.ADD_SPREADSHEET,
    payload: {
      id: uuid(),
      columns: [],
      rows: Array(amountOfRows).fill({})
    }
  };
}

export function addColumn(
  spreadsheetID,
  { id, title, required = false, type = 'text', ...others }
) {
  return {
    type: ActionTypes.ADD_COLUMN,
    payload: {
      spreadsheetID,
      column: {
        id: id || uuid(),
        required,
        title,
        type,
        ...others
      }
    }
  };
}

export function addRow(spreadsheetID, row) {
  return {
    type: ActionTypes.ADD_ROW,
    payload: {
      spreadsheetID,
      row
    }
  };
}

export function editColumn(spreadsheetID, { row, column, value }) {
  return {
    type: ActionTypes.EDIT_COLUMN,
    payload: {
      spreadsheetID,
      row,
      column,
      value
    }
  };
}
