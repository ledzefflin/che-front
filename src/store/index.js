import Vue from 'vue';
import Vuex from 'vuex';

import pathify from '@/store/pathify';
import staticModules from '@/store/static-modules/index';

Vue.use(Vuex);

Vuex.Store.prototype.hasModule = moduleName =>
  !!(Vuex.Store.state && Vuex.Store.state[moduleName]);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default (/* { ssrContext } */) => {
  const Store = new Vuex.Store({
    plugins: [pathify.plugin],
    modules: staticModules,

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !_.isEqual(process.env.NODE_ENV, 'production')
  });

  return Store;
};
