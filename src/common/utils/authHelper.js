import { setUpOidc } from '@/common/config/oidc';
import { flowAsync } from '@/common/utils/utils';

export const getUserAsync = async () => {
  const getUser = (manager) => manager.getUser();
  const runner = flowAsync([setUpOidc, getUser]);
  const user = await runner();
  return user;
};

export const loginAsync = async () => {
  const login = (manager) => manager.signinRedirect();
  const runner = flowAsync([setUpOidc, login]);
  const result = await runner();
  return result;
};

export const logoutAsync = async () => {
  const logout = (manager) => manager.signoutRedirect();
  const runner = flowAsync([setUpOidc, logout]);
  const result = await runner();
  return result;
};

export const getAccessTokenAsync = async () => {
  const getAccessToken = (user) => user.access_token;
  const runner = flowAsync([getUserAsync, getAccessToken]);
  const accessToken = await runner();
  return accessToken;
};

export default {
  getUserAsync,
  loginAsync,
  logoutAsync,
  getAccessTokenAsync,
};
