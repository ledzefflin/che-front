const getAbsPath = path => _.replace(path, /\.\//, '');
const getAbsKeys = absPath => _.split(absPath, '/');
const getAbsFileName = path => _.replace(path, /(\.\/|\.js$)/g, '');
const folderFilter = absKeys =>
  _.filter(absKeys, key => !_.includes(key, '.js'));

const getFileNames = _.flow(
  getAbsPath,
  getAbsKeys
);
const getFolderNames = _.flow(
  getFileNames,
  folderFilter
);

export const getFolderModules = files => {
  const getKeys = files => files.keys();
  const getModules = keys =>
    _.reduce(
      keys,
      (acc, key) => {
        const folderNames = getFolderNames(key);

        _.reduce(
          folderNames,
          (m, folderName) => {
            const isRoot = _.isEqual(acc, m);
            const register = _.cond([
              [
                (m, folderName, checkRoot) =>
                  _.isNil(m[folderName]) && checkRoot,
                (m, folderName, checkRoot) => {
                  m[folderName] = { namespaced: true, modules: {} };
                  return m[folderName];
                },
              ],
              [
                (m, folderName, checkRoot) =>
                  !_.isNil(m['modules']) && !checkRoot,
                (m, folderName, checkRoot) => {
                  m['modules'][folderName] = m['modules'][folderName] || {
                    modules: {},
                  };
                  return m['modules'][folderName];
                },
              ],
              [
                (m, folderName, checkRoot) =>
                  !_.isNil(m[folderName] && !_.isNil(m[folderName]['modules'])),
                (m, folderName, checkRoot) =>
                  checkRoot ? m[folderName] : m[folderName]['modules'],
              ],
              [
                _.stubTrue,
                () => console.error('check register folder modules'),
              ],
            ]);

            return register(m, folderName, isRoot);
          },
          acc
        );

        return acc;
      },
      {}
    );
  const handler = _.flow(
    getKeys,
    getModules
  );
  const folderModules = handler(files);

  return folderModules;
};

export const getFileModules = (files, staticFolderModules, exceptes = []) => {
  const getKeys = (files, exceptes) =>
    _.filter(files.keys(), k => !_.includes(exceptes, k));
  const getFolderModule = _.curry((folderNames, staticFolderModules) =>
    _.reduce(
      folderNames,
      (acc, v) => acc[v] || acc['modules'][v],
      staticFolderModules
    )
  );
  const getTargetName = moduleName => _.camelCase(getAbsFileName(moduleName));
  const getDefault = d =>
    _.isFunction(d) ? d() : _.isObject(d) ? d : _.isNil(d) || {};
  const isRoot = _.curry((folderModule, staticFolderModules) =>
    _.isEqual(folderModule, staticFolderModules)
  );

  const setFileDefault = _.curry(
    (folderModule, staticFolderModules, fileDefault, key) => {
      const getLastFileName = _.flow(
        getFileNames,
        _.last
      );
      const lastFileName = _.flow(
        getLastFileName,
        getTargetName
      )(key);
      const checkRoot = isRoot(folderModule)(staticFolderModules); // root여부
      const register = _.cond([
        [
          checkRoot => checkRoot,
          (checkRoot, folderModule, lastFileName, fileDefault) => {
            folderModule[lastFileName] = _.assign(
              { namespaced: true },
              fileDefault
            );
          },
        ],
        [
          (checkRoot, folderModule, lastFileName, fileDefault) =>
            !_.isNil(folderModule) && !_.isNil(folderModule['modules']),
          (checkRoot, folderModule, lastFileName, fileDefault) => {
            folderModule['modules'][lastFileName] =
              folderModule['modules'][lastFileName] || fileDefault;
          },
        ],
        [
          _.stubTrue,
          () =>
            console.error('register folder modules first before file modules'),
        ],
      ]);

      register(checkRoot, folderModule, lastFileName, fileDefault);
    }
  );

  const handler = _.curry((keys, staticFolderModules) =>
    _.reduce(
      keys,
      (acc, key) => {
        _.flow(
          getFolderNames,
          getFolderModule,
          f => f(acc),
          setFileDefault,
          f => f(acc),
          f => f(getDefault(files(key)['default'])),
          f => f(key)
        )(key);

        return acc;
      },
      staticFolderModules
    )
  );

  const fileModules = handler(getKeys(files, exceptes))(staticFolderModules);

  return fileModules;
};

export default {
  getFileModules,
  getFolderModules,
};
