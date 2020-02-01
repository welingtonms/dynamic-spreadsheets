/**
 * As per [Redux documentation](https://redux.js.org/recipes/reducing-boilerplate/#reducers), this
 * function lets us express reducers as an object mapping from action types to handlers.
 * @param {*} initialState
 * @param {object} handlers
 */
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
