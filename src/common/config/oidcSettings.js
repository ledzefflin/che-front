export const setUpOidc = () => ({
  authority: 'http://localhost:5000',
  clientId: 'che-front',
  redirectUri: 'http://localhost:8080/oidc-callback',
  // endpoist로 부터 인증코드를 반환받음 (PKCE 자동으로 사용됨, 인증코드가 쿼리문자열로 반환)
  // pkce를 사용하면, 인증서버와 클라이언트에서 유효성 검사가 제공된다.
  responseType: 'code',
  scope: 'openid profile email che-api',
  post_logout_redirect_uri: 'http://localhost:8080',
  filterProtocolClaims: true,
  loadUserInfo: true,
});

export default setUpOidc;
