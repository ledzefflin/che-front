const files = require.context('.', true, /\.js$/);
const exceptFiles = ['./index.js'];
const getModules = (files, exceptFiles) => {
  const keys = files.keys();
  const modules = _.reduce(
    keys,
    (acc, key) => {
      !_.includes(exceptFiles, key)
        && (acc[$u.naming.vuexModule(key)] = files(key).default);
      return acc;
    },
    {}
  );

  return modules;
};

const modules = _.curry(getModules)(files)(exceptFiles);
export default modules;
