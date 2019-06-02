// import something here
import lodash from 'lodash';

export const pascalCase = _.flow(
  _.camelCase,
  _.upperFirst
);

export const normalizePath = path => {
  const getName = _.flow(
    path => _.replace(path, /(\.\/|\.js$)/g, ''),
    path => _.replace(path, /\//g, '_')
  );
  const name = getName(path);
  return name;
};

// "async" is optional
export default async ({ app, router, store, Vue }) => {
  _.mixin({
    pascalCase: pascalCase,
    normalizePath: normalizePath
  });

  Vue.prototype._ = lodash;
};
