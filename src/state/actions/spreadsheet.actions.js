import toKebabCase from 'lodash.kebabcase';

export const ActionTypes = {
  ADD_COLUMN: 'ADD_COLUMN',
  ADD_ROW: 'ADD_ROW'
};

export function addColumn({ title, type, required = false }) {
  return {
    type: ActionTypes.ADD_COLUMN,
    payload: {
      id: toKebabCase(title),
      title,
      type,
      required
    }
  };
}
