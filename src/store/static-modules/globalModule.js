import { make } from 'vuex-pathify';
import produce from 'immer';

const thisPath = 'globalModule'; // '@/store/dynamic-modules' 기준으로 상대경로 (template, static-modules 제외)
// eslint-disable-next-line no-unused-vars
const thisName = $g.naming.vuexModule(thisPath);
const initialState = {
  isProduction: _.isEqual(process.env.NODE_ENV, 'production'),
  isSSR: process.env.SERVER,
  apiState: {
    callCounter: 0,
  },
};
const dics = {
  testDic: new $g.classes.Dic({
    test: 1,
  }),
};
const state = () => _.assign({}, _.cloneDeep(initialState), _.cloneDeep(dics));
const getters = {
  ...make.getters(state),
};
const mutations = {
  resetState: (state, initState = _.cloneDeep(initialState)) =>
    produce(_.assign)(state, initState),
  ...make.mutations(state),
};
const actions = {};

export default () => ({
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
});
