import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
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
    console.log('[authenticated]', authenticated);
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
      // history.push(loginPath);
      // instance.login();
    }
    return undefined;
  };
  // 如果不是登录页面，执行
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
    onPageChange: () => {
      const { location } = history;
      console.log('[onPageChange]', location);
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
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
  console.log('[demoResponse]', response, options);
  if (response.status == 401) {
    //  todo : auth 入参 refresh_token: undefined
    instance.logout();
  }
  // todo: 这两个状态码，要测试一下，
  if (response.status == 403) {
    history.replace({
      pathname: '/403',
    });
  }
  return response;
};

export const request: RequestConfig = {
  errorHandler,
  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [unionResponseInterceptors],
};
