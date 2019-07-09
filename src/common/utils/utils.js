/**
 *
 * @param  {Error|String} args
 */
export const throwError = (...args) => {
  _.forEach(args, (arg) => {
    const isError = _.isError(arg);

    if (isError) {
      throw arg;
    } else {
      throw new Error(arg);
    }
  });
};

/**
 *
 * @param {Object} obj
 * @param {Object} base
 */
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
export const isPromise = (fn) => {
  return !_.isNil(fn) && _.isFunction(fn.then) && _.isFunction(fn.catch);
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
 * @param  {[Promise|Function|any]} fns 호출할 함수 | Promise | Any
 * @returns 인자 함수의 결과값 배열을 반환하는 Promise 함수 반환.
 */
export const promiseAll = (...fns) => {
  const promises = _.reduce(
    ...fns,
    (acc, f) => _.concat(acc, promisify(f)),
    []
  );

  return !_.isEmpty(promises)
    && _.every(promises, (promise) => isPromise(promise))
    ? Promise.all(promises)
      .catch((e) => {
        if (!_.isEqual(process.env.NODE_ENV, 'production')) {
          throw new Error(e);
        }
      })
      .finally(_.constant([]))
    : throwError('functions should not be empty.');
};

/**
 * 탭
 * @param  {...any} args
 */
export const tap = (...args) => {
  const tapLog = (...args) =>
    !_.isEqual(process.env.NODE_ENV, 'production')
    && console.info('%c[tap]:', 'color: #4286f4', ...args);

  return _.tap(...args, tapLog);
};

/**
 * 로그
 * @param  {...any} args
 */
export const log = (...args) => {
  !_.isEqual(process.env.NODE_ENV, 'production')
    && console.info('%c[che]:', 'color: #21ba45', ...args);
};

export const alt = _.curry((val, fn1, fn2) => fn1(val) || fn2(val));
export const seq= _.curry((val, ...fns) => _.forEach([...fns], (fn) => fn(val)));
export const join = _.curry((val, join, fn1, fn2) => join(fn1(val), fn2(val)));
export const predict = (predict, fn1 = _.stubTrue, fn2 = _.stubFalse) => {
  const isTrue = (p) =>
    _.isBoolean(p)
      ? p
      : _.isFunction(p)
        ? p()
        : !!p;

  return  isTrue(predict) ? fn1() : fn2();
};

export default {
  throwError,
  getDiff,
  isPromise,
  promisify,
  flowAsync,
  promiseAll,
  tap,
  log,
  alt,
  seq,
  join,
  predict

};
