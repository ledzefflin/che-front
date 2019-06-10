import { pascalCase } from '@/boot/lodash';

export const naming = (() => {
  const pascal = _.pascalCase || pascalCase;

  const vueComponent = path => {
    const splited = _.split(path, '/');
    return _.join(splited.push(pascal(splited.pop())), '/');
  };

  const vuexModule = path => {
    const splited = _.split(path, '/');
    const last = _.camelCase(_.last(splited));

    splited.pop();
    splited.push(last);
    return splited.length > 1 ? _.join(splited, '/') : _.head(splited);
  };

  return {
    vueComponent,
    vuexModule,
  };
})();

export default naming;
