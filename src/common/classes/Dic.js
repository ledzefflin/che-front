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
};

export default Dic;
