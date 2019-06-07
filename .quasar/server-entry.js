/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

import '@quasar/extras/roboto-font/roboto-font.css'

import '@quasar/extras/material-icons/material-icons.css'




// We load Quasar stylus files
import 'quasar/dist/quasar.styl'




import 'src/css/app.styl'


import createApp from './app.js'
import Vue from 'vue'

import App from 'app/src/App.vue'
const appOptions = App.options || App



import qboot_Bootaxios from 'boot/axios'

import qboot_Bootlodash from 'boot/lodash'

import qboot_BootcustomExtend from 'boot/customExtend'


// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise(async (resolve, reject) => {
    const { app, store, router } = createApp(context)

    
    const bootFiles = [qboot_Bootaxios,qboot_Bootlodash,qboot_BootcustomExtend]
    for (let i = 0; i < bootFiles.length; i++) {
      if (typeof bootFiles[i] !== 'function') {
        continue
      }

      try {
        await bootFiles[i]({
          app,
          router,
          store,
          Vue,
          ssrContext: context
        })
      }
      catch (err) {
        reject(err)
        return
      }
    }
    

    const
      { url } = context,
      { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
        .map(m => m.options /* Vue.extend() */ || m)

      // no matched routes
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      

      let routeUnchanged = true
      const redirect = url => {
        routeUnchanged = false
        reject({ url })
      }

      appOptions.preFetch && matchedComponents.unshift(appOptions)

      // Call preFetch hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      matchedComponents
      .filter(c => c && c.preFetch)
      .reduce(
        (promise, c) => promise.then(() => routeUnchanged && c.preFetch({
          store,
          ssrContext: context,
          currentRoute: router.currentRoute,
          redirect
        })),
        Promise.resolve()
      )
      .then(() => {
        if (!routeUnchanged) { return }

        context.state = store.state

        
        resolve(new Vue(app))
        
      })
      .catch(reject)

      
    }, reject)
  })
}
