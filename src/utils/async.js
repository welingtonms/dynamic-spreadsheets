/**
 * @function
 * Wraps up a promise execution and the proper error handling to avoid
 * nested try/catch block for async/await statements.
 * @param { Promise } promise Promise to be axecuted
 * @param { object= } errorExt Additional Information you can pass to the err object
 * @returns { Promise } Wrapped promise that returns, when settled, an array as follows:
 * `[error, data]`, where error is the object returned by the catch block (merged with `errorExt`, if any)
 * and data is the object returned by the then block.
 * `error` is `null` for resolved promises and `data` is `null` for rejected promises.
 */
export function to(promise) {
  return promise
    .then(data => [null, data])
    .catch(err => {
      return [err, void 0];
    });
}
