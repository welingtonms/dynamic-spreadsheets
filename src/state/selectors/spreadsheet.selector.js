export function getSpreadsheet(state, spreadsheet) {
  console.log(state);
  return state.spreadsheets[spreadsheet];
}
