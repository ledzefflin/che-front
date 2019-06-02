import { make } from 'vuex-pathify';

// eslint-disable-next-line no-unused-vars
const thisName = 'index';
const initialState = {};
const dics = {};
const state = _.assign({}, _.cloneDeep(initialState), _.cloneDeep(dics));
const getters = {
  ...make.getters(state)
};
const mutations = {
  resetState: (state, initState = _.cloneDeep(initialState)) =>
    _.assign(state, initState),
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
