import Vue from 'vue';
import Vuex from 'vuex';

import pathify from '@/common/config/pathify';

Vue.use(Vuex);

export default ((/* { ssrContext } */) => {
  const staticModuleFiles = require.context('./static-modules', true, /\.js$/);
  const dynamicModuleFiles = require.context(
    './dynamic-modules',
    true,
    /\.js$/
  );

  const staticFolderModules = $g.storeHelper.getFolderModules(
    staticModuleFiles
  );
  const staticFileModules = $g.storeHelper.getFileModules(
    staticModuleFiles,
    staticFolderModules,
    ['./index.js']
  );
  const dynamicFolderModules = $g.storeHelper.getFolderModules(
    dynamicModuleFiles
  );
  const modules = _.assign(staticFileModules, dynamicFolderModules);

  /*
   * If not building with SSR mode, you can
   * directly export the Store instantiation
   */
  const Store = new Vuex.Store({
    plugins: [pathify.plugin],
    modules,
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !_.isEqual(process.env.NODE_ENV, 'production'),
  });
  return Store;
})();
