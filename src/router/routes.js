export const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MyLayout'),
    children: [{ path: '', component: () => import('@/pages/Index') }],
  },
];

// Always leave this as last one
!_.isEqual(process.env.MODE, 'ssr')
  && (() => {
    routes.push({
      path: '*',
      component: () => import('@/pages/Error404'),
    });
  })();

export default routes;
