import { combineReducers } from 'redux';
import { createStore } from 'redux';

import * as reducers from './reducers';
import {
  fromPayloadToState,
  fromStateToPayload
} from './schemas/spreadsheet.schema';

// const spreadsheets = fromPayloadToState([
//   {
//     id: '1',
//     columns: [
//       {
//         id: 'name',
//         type: 'string',
//         title: 'Name',
//         required: true
//       },
//       {
//         id: 'age',
//         type: 'number',
//         title: 'Age',
//         required: false
//       }
//     ],
//     rows: [
//       {
//         id: 1,
//         name: 'Carlos',
//         age: 37
//       },
//       {
//         id: 2,
//         name: 'Welington',
//         age: 32
//       }
//     ]
//   }
// ]);
// console.log(fromStateToPayload(spreadsheets.result, spreadsheets.entities));

const store = createStore(combineReducers(reducers), {
  spreadsheets: [
    {
      id: '1',
      columns: [
        {
          id: 'name',
          type: 'string',
          title: 'Name',
          required: true
        },
        {
          id: 'age',
          type: 'number',
          title: 'Age',
          required: false
        }
      ],
      rows: [
        {
          id: 1,
          name: 'Carlos',
          age: 37
        },
        {
          id: 2,
          name: 'Welington',
          age: 32
        }
      ]
    }
  ]
});

// const store = createStore(combineReducers(reducers));

export default store;
