import React, { useState } from 'react';
import type { ReactText } from 'react';

import { Button, Tag, Space, Card, Rate } from 'antd';
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  UploadOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons';
import ProList from '@ant-design/pro-list';
import FeedArea from '@/components/FeedArea';
import ManageHeader from '@/components/ManageHead';
import styles from './index.less';

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const dataSource = [
  {
    name: '什么是盒子模型????',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
    tags: ['内容重复', '题目不正确', '内容重复', '题目不正确', '内容重复', '题目不正确'],
    content: `  111段落示意：蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
`,
  },
  {
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
    tags: ['内容重复'],
    content: ` 222 段落示意：蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
`,
  },
  {
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
    tags: ['一般'],
    content: ` 333 段落示意：蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
`,
  },
  {
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
    tags: [],
    content: ` 444 段落示意：蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
`,
  },
];

type ItemType = {
  name?: string;
  image?: string;
  desc?: string;
  tags?: string[];
  content?: string;
};
export default () => {
  const [currentRow, setCurrentRow] = useState<ItemType>();
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(true);

  return (
    <ProList<ItemType>
      className={styles.toBeHandle}
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
      // pagination={{
      //   pageSize: 2,
      // }}
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
          // dataIndex: 'name',
          render: (_, row) => {
            console.log('[subTitle row]', row);
            console.log('[subTitle _]', _);
            return (
              <div style={{ width: '100%' }}>
                <ManageHeader tags={row?.tags} name={row?.name} />
              </div>
              // <div>
              //   {row.tags?.map((i) => (
              //     <Tag color="default" key={i}>
              //       {i}
              //     </Tag>
              //   ))}

              //   <div>
              //     {row.name}
              //     <Rate disabled defaultValue={2} />
              //   </div>
              // </div>
            );
          },
        },

        // subTitle: {
        //   dataIndex: 'name',
        //   render: (_, row) => {
        //     console.log('[subTitle row]', row);
        //     console.log('[subTitle _]', _);
        //     return (
        //       <Space size={0}>
        //         {row.tags?.map((i) => (
        //           <Tag color="default" key={i}>
        //             {i}
        //           </Tag>
        //         ))}
        //         <Rate disabled defaultValue={2} />
        //       </Space>
        //     );
        //   },
        //   search: false,
        // },
        actions: {
          render: (text, entity, index, action) => [
            <Button key="link">
              <UploadOutlined /> 编辑
            </Button>,
            <Button key="link">
              <UploadOutlined /> 无需优化
            </Button>,
            <Button key="link">
              <UploadOutlined /> 删除
            </Button>,
            <Button
              className={styles.filterTrigger}
              onClick={() => {
                setCurrentRow(entity);
                currentRow?.name === entity?.name
                  ? setShowFilter(!showFilter)
                  : setShowFilter(false);
              }}
            >
              {index}

              {currentRow?.name === entity?.name ? (showFilter ? '展开' : '收起') : '展开'}
              {currentRow?.name === entity?.name ? (
                showFilter ? (
                  <UpOutlined />
                ) : (
                  <DownOutlined />
                )
              ) : (
                <UpOutlined />
              )}
            </Button>,
          ],
        },
        // extra: {
        //   render: (dom, entity, index, action) => <FeedArea tags={entity?.tags} />,
        // },
        content: {
          render: (dom, entity, index, action) => {
            return (
              <Card
                bodyStyle={{
                  paddingBottom: 0,
                  // background: currentRow?.name === entity?.name ? 'red' : '',
                  // height: showFilter ? '100px' : '50px',
                }}
                bordered={false}
                className={
                  currentRow?.name === entity?.name ? (showFilter ? '' : styles.hiddenFilter) : ''
                }
              >
                <div
                  className={styles.filter}
                  style={{
                    overflowY:
                      currentRow?.name === entity?.name
                        ? showFilter
                          ? 'hidden'
                          : 'scroll'
                        : 'auto',
                    height:
                      currentRow?.name === entity?.name ? (showFilter ? '200px' : 'auto') : '200px',
                  }}
                >
                  {entity?.content}
                </div>
              </Card>
            );
          },
        },
      }}
    />
  );
};
