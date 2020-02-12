import { last, values } from 'ramda';

export function getSpreadsheet(state) {
  return last(values(state.spreadsheets));
}
