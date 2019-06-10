<template>
  <div></div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { get, sync, call, commit, registerModule } from 'vuex-pathify';

const thisPath = 'AuthCallback';
// eslint-disable-next-line no-unused-vars
const thisName = $g.naming.vueComponent(thisPath);
const moduleName = $g.naming.vuexModule('oidcModule');
const getMember = () => ({
  computed: {
    ...get(`${moduleName}/*`),
    ...sync(`${moduleName}/*`),
  },
  methods: {
    ...call(`${moduleName}/*`),
  },
});

export default {
  name: thisName,
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    $q.Loading.show();
    // fetch data, validate route and optionally redirect to some other route...

    // ssrContext is available only server-side in SSR mode

    // No access to "this" here as preFetch() is called before
    // the component gets instantiated.

    // Return a Promise if you are running an async job
    // Example:
    $q.Loading.hide();
    // return store.dispatch('fetchItem', currentRoute.params.id)
  },
  extends: registerModule(_.split(moduleName, '/'), module, getMember),
  components: {},
  methods: {},
  created () {},
};
</script>
<style scoped></style>
