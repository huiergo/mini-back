import React, { useState } from 'react';
import type { ReactText } from 'react';

import { Button, Tag, Space, Card, Rate, Divider, Row, Col } from 'antd';
import {
  UploadOutlined,
  UpOutlined,
  DownOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import ProList from '@ant-design/pro-list';
import styles from './index.less';

import hljs from 'highlight.js';
// import 'highlight.js/styles/base16/tomorrow.css';

import 'highlight.js/styles/monokai-sublime.css';

import Markdown from 'markdown-it';

// MD to HTML
export const mdParser = new Markdown({
  html: true,
  highlight(str, lang) {
    // console.log('[highLight]', str, lang);
    // const language = lang === 'vue' || !lang ? 'html' : lang;
    // if (language && hljs.getLanguage(language)) {
    //   console.log('[if]', hljs.highlight(str, { language }).value);
    //   return hljs.highlight(str, { language }).value;
    // }
    // return '';
    return hljs.highlightAuto(str).value;
  },
});
/**
 * MD组件
 * @param {String} children - md格式字符串
 */
export const MarkWidget = ({ children, style }) => {
  return (
    <div
      style={style}
      className="mark-widget"
      dangerouslySetInnerHTML={{ __html: mdParser.render(children || '') }}
    />
  );
};

const dataSource = [
  {
    name: '什么是盒子模型????',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
    tags: [
      '内容重复',
      '题目不正确',
      '内容重复',
      '题目不正确',
      '内容重复',
      '题目不正确',
      '内容重复',
      '题目不正确',
      '内容重复',
      '题目不正确',
      '内容重复',
      '题目不正确',
      '内容重复',
      '题目不正确',
      '内容重复',
      '题目不正确',
      '内容重复',
      '题目不正确',
      '内容重复',
      '题目不正确',
      '内容重复',
      '题目不正确',
      '内容重复',
      '题目不正确',
    ],
    content:
      '题干内容\n\n```\nconst Child1 = (props) => (\n  <Wrapper>\n    <h3>I am child 1</h3>\n    {/* 在 <Child1> 和 </Child1> 之间传递的任何内容 */}\n    {props.children}\n  </Wrapper>\n);\nconst Child2 =  (props) => (\n  <Wrapper>\n    <h3>I am child 2</h3>\n    {props.children}\n  </Wrapper>\n);\nconst Child3 = (props) => (\n  <Wrapper>\n    <h3>I am child 3</h3>\n    {props.children}\n  </Wrapper>\n);\nconst Child4 = () => (\n  <Wrapper>\n    <h3>I am child 4</h3>\n  </Wrapper>\n);\n```\n题干内容222\n\n```\nconst Child1 = (props) => (\n  <Wrapper>\n    <h3>I am child 1</h3>\n    {/* 在 <Child1> 和 </Child1> 之间传递的任何内容 */}\n    {props.children}\n  </Wrapper>\n);\nconst Child2 =  (props) => (\n  <Wrapper>\n    <h3>I am child 2</h3>\n    {props.children}\n  </Wrapper>\n);\nconst Child3 = (props) => (\n  <Wrapper>\n    <h3>I am child 3</h3>\n    {props.children}\n  </Wrapper>\n);\nconst Child4 = () => (\n  <Wrapper>\n    <h3>I am child 4</h3>\n  </Wrapper>\n);\n```\n',
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
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    111段落示意：蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    111段落示意：蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台

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
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    111段落示意：蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    111段落示意：蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台

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
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    111段落示意：蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    111段落示意：蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
    design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台

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
  const [showFilter, setShowFilter] = useState<boolean>(true);

  return (
    <ProList<ItemType>
      className={styles.toBeHandle}
      split={true}
      itemLayout="vertical"
      rowKey="name"
      dataSource={dataSource}
      metas={{
        title: {
          render: (_, row) => {
            console.log('[subTitle row]', row);
            console.log('[subTitle _]', _);
            return (
              <Row gutter={[2, 2]}>
                <Col span={16}>
                  <Tag color="default" style={{ color: '#3C3E42', background: '#F6F7F9' }}>
                    移动web
                  </Tag>
                  <Tag color="default" style={{ color: '#3C3E42', background: '#F6F7F9' }}>
                    内容不准确；题目重复；内容不准确；题目重复；内容不准确；题目重复；内容不准确；题目重复；
                  </Tag>
                </Col>
              </Row>
            );
          },
          search: false,
        },
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
        extra: {
          render: (dom, entity, index, action) => (
            // <Card >
            <div style={{ maxWidth: 272 }}></div>
            // </Card>
          ),
        },
        content: {
          render: (dom, entity, index, action) => {
            return (
              <div className="site-card-wrapper">
                <Row gutter={4}>
                  <Col span={16}>
                    <Card
                      title={entity?.name}
                      extra={<Rate disabled defaultValue={2} />}
                      bodyStyle={{
                        paddingBottom: 0,
                        background: '#FAFAFA',
                      }}
                      bordered={false}
                      className={
                        currentRow?.name === entity?.name
                          ? showFilter
                            ? ''
                            : styles.hiddenFilter
                          : ''
                      }
                    >
                      <div
                        className={styles.filter}
                        style={{
                          overflowY:
                            currentRow?.name === entity?.name
                              ? showFilter
                                ? 'auto'
                                : 'scroll'
                              : 'auto',
                          height:
                            currentRow?.name === entity?.name
                              ? showFilter
                                ? '100px'
                                : 'auto'
                              : '100px',
                        }}
                      >
                        <MarkWidget>{entity?.content}</MarkWidget>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="反馈建议" bordered={false}>
                      <div
                        style={{
                          maxHeight:
                            currentRow?.name === entity?.name
                              ? showFilter
                                ? '100px'
                                : '800px'
                              : '100px',
                          overflowY: 'scroll',
                        }}
                      >
                        <Tag color="default" style={{ color: '#3C3E42', background: '#F6F7F9' }}>
                          内容不准确；
                        </Tag>
                        <Tag color="default" style={{ color: '#3C3E42', background: '#F6F7F9' }}>
                          内容不准确；题目重复；内容不准确；
                        </Tag>
                        <Tag color="default" style={{ color: '#3C3E42', background: '#F6F7F9' }}>
                          内容不准确；题目重复；内容不准确；题目重复；内容不准确；题目重复；内容不准确；题目重复；
                        </Tag>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            );
          },
        },
      }}
    />
  );
};
