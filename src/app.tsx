import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';
import { instance } from './auth';
import { RequestOptionsInit } from 'umi-request';
import { notification } from 'antd';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  instance.init({ 'login-required': true }).then((authenticated: boolean) => {
    if (authenticated) {
      localStorage.setItem('token', instance.token); // 将token存入本地缓存
      localStorage.setItem('user-config', JSON.stringify(instance.tokenParsed)); // 将用户信息存入本地缓存
    } else {
      instance.login();
    }
  });
  const fetchUserInfo = async () => {
    try {
      const msg = localStorage.getItem('user-config');
      return msg && JSON.parse(msg);
    } catch (error) {
      console.log('[error]', error);
    }
    return undefined;
  };
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {},
    menuHeaderRender: undefined,
    childrenRender: (children, props) => {
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

const errorHandler = (error: any) => {
  notification.error({
    description: error.message,
    message: '网络异常',
  });
};
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  let token = localStorage.getItem('token');
  const authHeader = { Authorization: `Bearer ${token}` };
  return {
    url: `${url}`,
    options: {
      ...options,
      interceptors: true,
      headers: authHeader,
    },
  };
};

const unionResponseInterceptors = (response: Response, options: RequestOptionsInit) => {
  if (response.status == 401) {
    instance.logout();
  }
  if (response.status == 403) {
    history.replace({
      pathname: '/403',
    });
  }
  return response;
};

export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [unionResponseInterceptors],
};
