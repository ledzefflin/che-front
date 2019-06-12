import { make } from 'vuex-pathify';
import produce from 'immer';

import oidc from '@/common/config/oidc';

const thisPath = 'layouts/myLayout';
// eslint-disable-next-line no-unused-vars
const thisName = $g.naming.vuexModule(thisPath);
const initialState = {};
const dics = {
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
const actions = {
  loginAsync: async (storeHelper) => {
    const isLogin = () => $store.get('global/user@isLogin');
    const isProduction = () => $store.get('global/isProduction');

    return !isLogin()
    && !isProduction()
    && oidc.loginAsync();
  },

  initAsync: async (storeHelper) => {
    const login = async () => {
      const result = await $store.dispatch(`${thisName}/loginAsync`);
      return result;
    };
    const result = await login();

    return result;
  },
};

export default () => ({
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
});
