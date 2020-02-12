import * as yup from 'yup';

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
    let schema = yup.date().typeError('Column value must be a date');

    if (required) {
      schema = schema.required('Required column');
    }

    return schema;
  },
  oneOf: ({ required, values }) => {
    let schema = yup.string().oneOf(values);

    if (required) {
      schema = schema.required('Required column');
    }

    return schema;
  }
};
