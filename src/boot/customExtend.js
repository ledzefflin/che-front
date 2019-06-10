// import something here
// "async" is optional
export default async ({ app, router, store, Vue, ssrContext }) => {
  const registerGlobal = (name, obj) => {
    process.env.SERVER ? (global[name] = obj) : (window[name] = obj);
  };

  registerGlobal('$store', store);
  registerGlobal('$router', router);
  registerGlobal('$q', Vue.$q);
};
