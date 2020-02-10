import { isNil } from 'ramda';

export const KEYS = {
  ESC: 'Escape'
};

export const onKey = handlers => {
  return e => {
    const { code } = e;

    if (isNil(handlers) || !(code in handlers)) {
      return;
    }

    handlers[code]();
  };
};
