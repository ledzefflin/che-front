<template>
  <div></div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { get, sync, call, commit, registerModule } from 'vuex-pathify';

const thisPath = 'template';
// eslint-disable-next-line no-unused-vars
const thisName = $u.naming.vueComponent(thisPath);
const moduleName = $u.naming.vuexModule(thisPath);

const getMember = () => ({
  computed: {
    ...get('spinner', ['spinner']),
    ...get(`${moduleName}/*`),
    ...sync(`${moduleName}/*`)
  },
  methods: {
    ...call(`${moduleName}/*`)
  }
});

export default {
  name: thisName,
  extends: registerModule(this, moduleName, module, getMember),
  components: {}
};
</script>
