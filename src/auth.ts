import Keycloak from 'keycloak-js';

const config = {
  url:
    process.env.buildType === 'pro'
      ? 'https://auth.itcast.cn/auth'
      : 'https://auth-t.itcast.cn/auth',
  realm: process.env.buildType === 'pro' ? 'itcast' : 'Test',
  clientId: 'teach_training',
};
// const config = {
//   url: 'https://auth-t.itcast.cn/auth',
//   realm: 'Test',
//   clientId: 'teach_training',
// };
console.log('[config]', config);
export const instance = new Keycloak(config);
