export const Tuple = class {
  constructor (...args) {
    const typeInfos = [...args];
    const _T = (...args) => {
      const self = this;
      const values = [...args];

      const checkType = _.curry((typeDef, obj) => {
        if (R.is(typeDef, obj)) {
          $g.utils.throwError(
            new TypeError(
              `type is not match: ${typeof obj} should be ${typeDef}`
            )
          );
        }
        return obj;
      });
      const checkValid = _.cond([
        [
          (vals, typeInfos) => _.some(vals, (v) => _.isNil(v)),
          (vals, typeInfos) =>
            $g.utils.throwError(
              new ReferenceError(`Tuple can not be null or undefined : ${vals}`)
            ),
        ],
        [
          (vals, typeInfos) => !_.isEqual(vals.length, typeInfos.length),
          (vals, typeInfos) =>
            $g.utils.throwError(
              new TypeError(
                `Tuple parameter's length is not match with prototype : ${typeInfos}`
              )
            ),
        ],
        [_.stubTrue, _.stubTrue],
      ]);

      const setter = _.curry((values, self) => {
        _.forEach(values, (val, idx) => {
          self['_' + (idx + 1)] = checkType(typeInfos[idx])(val);
        });
        Object.freeze(self);

        self.values = () => {
          return _.chain(_.keys(self)).map((k) => self[k]);
        };
      });

      const handler = _.flow(
        checkValid,
        (isValid) => isValid && setter(values, self)
      );

      handler(values, typeInfos);
    };

    return _T;
  }
};

export default Tuple;
