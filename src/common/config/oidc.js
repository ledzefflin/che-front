import Oidc from 'oidc-client';

export const getConfig = () => ({
  authority: 'http://localhost:5200',
  client_id: 'che-front',
  redirect_uri: 'http://localhost:5210/oidc-callback',
  // endpoist로 부터 인증코드를 반환받음 (PKCE 자동으로 사용됨, 인증코드가 쿼리문자열로 반환)
  // pkce를 사용하면, 인증서버와 클라이언트에서 유효성 검사가 제공된다.
  response_type: 'code',
  scope: 'openid profile email che-api',
  post_logout_redirect_uri : 'http://localhost:5210',
  filterProtocolClaims : true,
  loadUserInfo : true,
  // silent_redirect_uri:
  // automaticSilentRenew

});

export const getMgr = (config) => {
  const mgr = new Oidc.UserManager(config);
  return mgr;
};

export const loginAsync = async () => {
  const signinRedirectPromise = async (mgr) => {
    const result = await mgr.signinRedirect();
    return result;
  };
  const isLoginPromise = async () => {
    const user = await getUser();
    $g.utils.log(user);
    return !_.isEmpty(user);
  };

  const handler = $g.utils.flowAsync([
    isLoginPromise,
    (isLogin) =>
      $g.utils.predict(
        isLogin,
        () => $g.utils.log('already logined'),
        $g.utils.flowAsync([getConfig, getMgr, signinRedirectPromise]),
      ),
  ]);

  const result = await handler();
  return result;
};

export const logoutAsync = async () => {
  const signoutRedirectPromise = async (mgr) => {
    const result = await mgr.signoutRedirect();
    return result;
  };
  const handler = $g.utils.flowAsync([
    getConfig,
    getMgr,
    signoutRedirectPromise,
  ]);

  await handler();
};

export const getUser = async () => {
  const getUserPromise = async (mgr) => {
    const user = await mgr.getUser();
    return user;
  };
  const handler = $g.utils.flowAsync([getConfig, getMgr, getUserPromise]);

  const user = await handler();
  return user;
};

export default {
  getConfig,
  getMgr,
  loginAsync,
  logoutAsync,
  getUser,
};
