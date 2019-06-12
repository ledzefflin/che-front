<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          dense
          flat
          round
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>Quasar App</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer bordered content-class="bg-grey-2" v-model="leftDrawerOpen">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable href="https://quasar.dev" tag="a" target="_blank">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          href="https://github.com/quasarframework/"
          tag="a"
          target="_blank"
        >
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          href="https://chat.quasar.dev"
          tag="a"
          target="_blank"
        >
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          href="https://forum.quasar.dev"
          tag="a"
          target="_blank"
        >
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          href="https://twitter.com/quasarframework"
          tag="a"
          target="_blank"
        >
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { get, sync, call, commit, registerModule } from 'vuex-pathify';
import getVuexModule from '@/store/dynamic-modules/layouts/myLayout';
import { openURL } from 'quasar';

const thisPath = 'layouts/MyLayout';
const thisName = $g.naming.vueComponent(thisPath);
const moduleName = $g.naming.vuexModule(thisPath);
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
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {},
  extends: registerModule(_.split(moduleName, '/'), getVuexModule(), getMember),
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    };
  },
  methods: {
    openURL,
  },
  created () {},
};
</script>

<style scoped></style>
