import React, { useState } from 'react';
import type { ReactText } from 'react';

import { Button, Tag, Space, Card } from 'antd';
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  UploadOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons';
import ProList from '@ant-design/pro-list';
import styles from './index.less';

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const dataSource = [
  {
    name: '什么是盒子模型',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
    tags: ['内容重复', '题目不正确'],
  },
  {
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
    tags: ['内容重复'],
  },
  {
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
    tags: ['一般'],
  },
  {
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
    tags: [],
  },
];

export default () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(true);

  return (
    <ProList<{ name: string; image: string; desc: string; tags: string[] }>
      toolBarRender={() => {
        return [
          <Button key="3" type="primary">
            新建
          </Button>,
        ];
      }}
      split={true}
      // onRow={(record: any) => {
      //   return {
      //     onMouseEnter: () => {
      //       console.log(record);
      //     },
      //     onClick: () => {
      //       console.log(record);
      //     },
      //   };
      // }}
      pagination={{
        pageSize: 2,
      }}
      itemLayout="vertical"
      rowKey="name"
      // expandable={{
      //   expandedRowKeys: expandedRowKeys,
      //   defaultExpandAllRows: true,
      //   onExpandedRowsChange: setExpandedRowKeys,
      // }}
      headerTitle="基础列表"
      tooltip="基础列表的配置"
      // showActions="hover"
      // showExtra="hover"
      dataSource={dataSource}
      metas={{
        title: {
          dataIndex: 'name',
        },

        subTitle: {
          dataIndex: 'name',
          render: (_, row) => {
            console.log('[subTitle row]', row);
            console.log('[subTitle _]', _);
            return (
              <Space size={0}>
                {row.tags?.map((i) => (
                  <Tag color="default" key={i}>
                    {i}
                  </Tag>
                ))}
              </Space>
            );
          },
          search: false,
        },
        actions: {
          render: (text, row, index, action) => [
            <Button key="link">
              <UploadOutlined /> 编辑
            </Button>,
            <Button key="link">
              <UploadOutlined /> 无需优化
            </Button>,
            <Button key="link">
              <UploadOutlined /> 删除
            </Button>,
          ],
        },
        extra: {
          render: () => (
            <div style={{ width: 272 }}>
              反馈建议
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            </div>
          ),
        },
        content: {
          render: () => {
            return (
              <Card
                bodyStyle={{
                  padding: 0,
                  // height: showFilter ? '100px' : '50px',
                }}
                bordered={false}
                className={showFilter ? '' : styles.hiddenFilter}
              >
                <div
                  className={styles.filter}
                  style={{
                    overflowY: showFilter ? 'hidden' : 'scroll',
                    height: showFilter ? '50px' : 'auto',
                  }}
                >
                  段落示意：蚂蚁金服设计平台
                  design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
                  design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
                  design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
                  design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
                </div>
                <a
                  className={styles.filterTrigger}
                  onClick={() => {
                    setShowFilter(!showFilter);
                  }}
                >
                  {showFilter ? '展开' : '收起'}
                  {showFilter ? <UpOutlined /> : <DownOutlined />}
                </a>
              </Card>
            );
          },
        },
      }}
    />
  );
};
