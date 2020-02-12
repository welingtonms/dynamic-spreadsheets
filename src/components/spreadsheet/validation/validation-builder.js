import * as yup from 'yup';
import { isNil, isEmpty } from 'ramda';

export default {
  object: schema => {
    return yup.object(schema);
  },
  string: ({ required }) => {
    let schema = yup.string().trim();

    if (required) {
      schema = schema.required('Required column');
    }

    return schema;
  },
  number: ({ required }) => {
    let schema = yup.number().typeError('Column value must be a number');

    if (required) {
      schema = schema.required('Required column');
    }

    return schema;
  },
  date: ({ required }) => {
    let schema = yup.date();

    if (required) {
      schema = schema.required('Required column');
    }

    return schema;
  },
  array: ({ required, values }) => {
    let schema = yup.mixed().oneOf(values);

    if (required) {
      schema = schema.required('Required column');
    }

    return schema;
  }
};
