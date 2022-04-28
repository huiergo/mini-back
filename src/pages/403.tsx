import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';
import { instance } from '@/auth';

const NoFoundPage: React.FC = () => (
  <Result
    status="403"
    title="无权限"
    subTitle="请联系管理员开通权限"
    extra={
      <Button type="primary" onClick={() => instance.logout()}>
        返回登录
      </Button>
    }
  />
);

export default NoFoundPage;
