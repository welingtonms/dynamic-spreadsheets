import { denormalize, normalize, schema } from 'normalizr';
import { flip } from 'ramda';

const column = new schema.Entity('columns');
const row = new schema.Entity('rows');

const spreadsheet = new schema.Entity('spreadsheets', {
  columns: [column],
  rows: [row]
});

const spreadsheets = new schema.Array(spreadsheet);

export const fromPayloadToState = flip(normalize)(spreadsheets);
export const fromStateToPayload = flip(denormalize)(spreadsheets);
