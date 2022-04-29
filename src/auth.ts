import Keycloak from 'keycloak-js';

const config = {
  url:
    process.env.buildType === 'pro'
      ? 'https://auth.itcast.cn/auth'
      : 'https://auth-t.itcast.cn/auth',
  realm: process.env.buildType === 'pro' ? 'itcast' : 'Test',
  clientId: 'teaching-wxoptClient',
};
export const instance = new Keycloak(config);
