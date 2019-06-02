import { make } from 'vuex-pathify';
import produce from 'immer';

const thisPath = 'layouts/myLayout';
// eslint-disable-next-line no-unused-vars
const thisName = $u.naming.vuexModule(thisPath);
const initialState = {};
const dics = new $c.classes.Dic({});
const state = _.assign({}, _.cloneDeep(initialState), _.cloneDeep(dics));
const getters = {
  ...make.getters(state)
};
const mutations = {
  resetState: (state, initState = _.cloneDeep(initialState)) =>
    produce(_.assign)(state, initState),
  ...make.mutations(state)
};
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
