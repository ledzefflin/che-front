// import something here
// "async" is optional
export default async ({ app, router, store, Vue, ssrContext }) => {
  const registerGlobal = (n, o) =>
    (!_.isNil(window) && (window[n] = o))
    || (!_.isNil(global) && (global[n] = o));

  registerGlobal('$store', store);
  registerGlobal('$router', router);
};
