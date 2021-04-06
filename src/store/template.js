import { make } from 'vuex-pathify';
import produce from 'immer';
import store from './index';

const thisPath = 'template'; // '@/store/dynamic-modules' 기준으로 상대경로 (template, static-modules 제외)
// eslint-disable-next-line no-unused-vars
const thisName = $g.naming.vuexModule(thisPath);
const initialState = {};
const dics = new $g.classes.Dic({});
const state = () => _.assign({}, _.cloneDeep(initialState), _.cloneDeep(dics));
const getters = {
  ...make.getters(state),
};
const mutations = {
  // resetState: (state, initState = _.cloneDeep(initialState)) =>
  //   produce(_.assign)(state, initState),
  resetState: (state, { rootState = store.state, excludes = [] }) => {
    const getNext = _.pipe(_.omit(excludes), _.cloneDeep, _.assign(state));
    store.replaceState(_.set(thisName, getNext(initialState), rootState));
  },
  ...make.mutations(state),
};

const actions = {};

export default () => ({
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
});
