export const Dic = class {
  constructor (obj) {
    _.forIn(obj, (v, k) => (this[k] = v));
  }

  key (v) {
    return _.invert(this)[v] || '';
  }

  set (k, v) {
    this[k] = v;
  }

  keys () {
    return _.keys(this);
  }

  values () {
    return _.values(this);
  }

  size () {
    return _.size(this);
  }

  map (fn) {
    const mapper = _.flow([
      f =>
        _.reduce(
          this,
          (acc, v, k) => {
            acc[k] = f(v);
            return acc;
          },
          {}
        ),
      o => new Dic(o)
    ]);
    const newDic = mapper(fn);
    return newDic;
  }

  filter (fn) {
    const filter = _.flow([
      f =>
        _.reduce(
          this,
          (acc, v, k) => {
            const r = f(v);
            _.isBoolean(r) && _.isEqual(r, true) && (acc[k] = v);
            return acc;
          },
          {}
        ),
      o => new Dic(o)
    ]);
    const newDic = filter(fn);
    return newDic;
  }
};

export default Dic;
