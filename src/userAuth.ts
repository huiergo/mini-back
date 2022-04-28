import Keycloak from 'keycloak-js';

const AUTH_SETTING = {
  url: 'https://auth-t.itcast.cn/auth',
  realm: 'Test',
  cores: false,
  clientId: 'teaching-wxoptClient',
};
const keycloak = Keycloak(AUTH_SETTING);

/**
 * 定时刷新访问令牌
 */
const refreshAccessToken = () => {
  setInterval(() => {
    if (keycloak.authenticated) {
      keycloak
        .updateToken(30)
        .success((refreshed) => {
          if (refreshed) {
            console.log('访问令牌已更新！');
          }
        })
        .error((error) => {
          console.log('访问令牌更新失败！', error);
        });
    }
  }, 290000);
};

/**
 * 加载用户信息，含所有用户的自定义属性
 */
const loadCurrentUserInfo = (): Promise<{}> => {
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    if (!keycloak.authenticated) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject('尚未登录！无法获取用户信息！');
    }

    keycloak
      .loadUserInfo()
      .success(() => {
        // @ts-ignore
        return resolve(keycloak.userInfo);
      })
      .error((error) => {
        console.log('获取用户信息失败！', error);
        return reject(error);
      });
  });
};

interface UserProfile extends Keycloak.KeycloakProfile {
  attributes?: {};
}

/**
 * 加载用户Profile，只包含固定的几个字段
 */
const loadCurrentUserProfile = (): Promise<UserProfile | undefined> => {
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    if (!keycloak.authenticated) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject('尚未登录！无法获取用户Profile信息！');
    }

    keycloak
      .loadUserProfile()
      .success(() => {
        return resolve(keycloak.profile);
      })
      .error((error) => {
        console.log('获取用户Profile失败！', error);
        return reject(error);
      });
  });
};

/**
 * 初始化Keycloak对象；判断是否已认证，如未认证则直接跳转到登录页面
 */
const keycloakInit = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 认证初始化，如果未登录则跳转到登录页面
    // checkLoginIframe: false，关闭注销检查。因为adpter11.0.0以下版本打开后会不断的刷新页面
    keycloak
      .init({ onLoad: 'login-required', checkLoginIframe: false })
      .success((authenticated) => {
        if (!authenticated) {
          window.location.reload();
        }

        return resolve();
      })
      .error((error) => {
        return reject(error);
      });
  });
};

/**
 * 获取当前登录用户的AccessToken
 */
const retriveAccessToken = (): string | undefined => {
  return keycloak.token;
};

interface UserAuthResponse {
  authenticator: Keycloak.KeycloakInstance;
  isAuthenticated?: boolean;
  token?: string;
  loadUserInfo: () => Promise<{}>;
  loadUserProfile: () => Promise<UserProfile | undefined>;
}

/**
 *  开始用户认证，未登录则跳转登录页。
 *  1、是否已认证判断
 *  2、开启定时刷新访问令牌
 *  3、预加载当前登录用户信息
 */
const authInit = async (): Promise<UserAuthResponse> => {
  // 认证初始化，如果未登录则跳转到登录页面
  await keycloakInit();

  // 刷新令牌
  refreshAccessToken();

  // 提前异步缓存用户信息，避免通过Keycloak.KeycloakInstance获取userinfo、profile为空
  loadCurrentUserInfo();
  loadCurrentUserProfile();

  return {
    authenticator: keycloak,
    isAuthenticated: keycloak.authenticated,
    token: keycloak.token,
    loadUserInfo: loadCurrentUserInfo,
    loadUserProfile: loadCurrentUserProfile,
  };
};

export {
  authInit,
  loadCurrentUserInfo,
  loadCurrentUserProfile,
  retriveAccessToken,
  UserAuthResponse,
};
