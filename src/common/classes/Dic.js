import {} from 'immer';

export const Dic = class {
  constructor (o) {
    const self = this;

    !_.isEmpty(o) && (self._lenses = {});
    _.forIn(o, (v, k) => {
      self[k] = v;
      self._lenses[k] = R.lensProp(k);
    });
  }

  view (propName) {
    const lens = this._lenses[propName];
    return R.view(lens, this);
  }

  set (propName, val) {
    const lens = this._lenses[propName];
    const addProp = (dic, propName, val) => {
      dic[propName] = val;
      dic._lenses = _.concat(dic._lenses, R.lensProp(propName));
    };

    _.isEmpty(lens) && addProp(this, propName, val);

    const newDic = R.set(lens, val, this);
    return newDic;
  }

  keys () {
    return _.keys(this);
  }

  values () {
    const getValues = self =>
      _.reduce(
        self._lenses,
        (acc, lens) => _.concat(acc, R.view(lens, self)),
        []
      );
    const results = getValues(this);

    return results;
  }

  siee () {
    return _.size(this);
  }

  map (fn) {
    const getObj = (f, dic) =>
      _.reduce(
        dic.keys(),
        (acc, key) => {
          acc[key] = f(dic.view(key));
          return acc;
        },
        {}
      );
    const getDic = o => new Dic(o);
    const getNewDic = _.flow([getObj, getDic]);
    const newDic = getNewDic(fn, this);
    return newDic;
  }

  filter (fn) {
    const getObj = (f, dic) =>
      _.reduce(
        dic.keys(),
        (acc, key) => {
          const result = f(dic.view(key));
          _.isBoolean(result)
            && _.isEqual(result, true)
            && (acc[key] = dic.view(key));
          return acc;
        },
        {}
      );
    const getDic = o => new Dic(o);
    const getNewDic = _.flow([getObj, getDic]);
    const newDic = getNewDic(fn, this);
    return newDic;
  }
};

export default Dic;
