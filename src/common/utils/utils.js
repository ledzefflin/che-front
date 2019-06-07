const throwError = (...args) => {
  _.forEach(args, arg => {
    const isError = arg instanceof Error;
    isError
      ? (() => {
        throw arg;
      })()
      : (() => {
        throw new Error(arg);
      })();
  });
};

export const getDiff = (obj, base) => {
  return _.transform(obj, (result, v, k) => {
    !_.isEqual(v, base[k])
      && (result[k] =
        _.isObject(v) && _.isObject(base[k]) ? getDiff(v, base[k]) : v);
  });
};

/**
 * Promise 여부 검사
 *
 * @param {Promise} Promise
 * @returns {Boolean} Promise 여부
 */
export const isPromise = p => {
  return !_.isNil(p) && _.isFunction(p.then);
};

/**
 * Promise 변환 함수
 *
 * @param {*} any
 * @param {*} arg fn의 인자들
 * @returns {Promise} 변환된 Promise
 */
export const promisify = (fn, ...args) => {
  const getPromise = _.cond([
    [(f, ...a) => _.isFunction(f), (f, ...a) => Promise.resolve(f(...a))],
    [(f, ...a) => isPromise(f), (f, ...a) => f],
    [_.stubTrue, (f, ...a) => Promise.resolve(f)],
  ]);
  const promise = getPromise(fn, ...args);

  return promise;
};

/**
 * 주어진 함수를 호출 한 결과를 리턴하는 비동기 함수를 생성.
 * 각각의 연속적인 호출에는 이전 함수의 반환값이 제공된다.
 *
 * @param  {[*]} fns 호출할 함수 또는 Promise
 * @returns 새롭게 생성된 비동기 함수 반환.
 */
export const flowAsync = (...fns) => (...args) =>
  _.reduce(
    ...fns,
    async (prev, cur) => {
      try {
        const prevResult = await prev;
        const promise = promisify(cur, prevResult);
        const curResult = await promise;

        return curResult;
      } catch (e) {
        return throwError(e);
      }
    },
    Promise.resolve(...args)
  );

/**
 * Promise.All Helper 함수.
 *
 * @param  {[Promise|Function|any]} args 호출할 함수 | Promise | Any
 * @returns 인자 함수의 결과값 배열을 반환하는 Promise 함수 반환.
 */
export const promiseAll = (...args) => {
  const promises = _.reduce(
    ...args,
    (acc, arg) => _.concat(acc, promisify(arg)),
    []
  );

  return !_.isEmpty(promises)
    && _.every(promises, promise => isPromise(promise))
    ? Promise.all(promises)
      .catch(
        e =>
          !_.isEqual(process.env.NODE_ENV, 'production')
            && (() => {
              throw new Error(e);
            })()
      )
      .finally(_.constant({}))
    : throwError('arguments should not be empty.');
};

export const tap = (...args) => {
  const tapLog = (...args) =>
    !_.isEqual(process.env.NODE_ENV, 'production')
    && console.log('%c[tap]:', 'color: #4286f4', ...args);
  return _.tap(...args, tapLog);
};

export default {
  getDiff,
  isPromise,
  promisify,
  flowAsync,
  promiseAll,
};
