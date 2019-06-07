// import something here
import lodash from 'lodash';

export const pascalCase = _.flow(
  _.camelCase,
  _.upperFirst
);

// "async" is optional
export default async ({ app, router, store, Vue }) => {
  _.mixin({
    pascalCase: pascalCase,
  });

  Vue.prototype._ = lodash;
};
