import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';
import { instance } from '@/auth';

const NoFoundPage: React.FC = () => <Result status="404" title="敬请期待~" />;

export default NoFoundPage;
