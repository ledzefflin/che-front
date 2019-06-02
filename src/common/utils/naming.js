import { pascalCase, normalizePath } from '@/boot/lodash';

export const naming = (() => {
  const normalize = _.normalizePath || normalizePath;
  const pascal = _.pascalCase || pascalCase;

  const vueComponent = path => {
    return _.flow(
      normalize,
      pascal
    )(path);
  };

  const vuexModule = path => {
    return _.flow(
      normalize,
      _.camelCase
    )(path);
  };

  return {
    vueComponent,
    vuexModule
  };
})();

export default naming;
