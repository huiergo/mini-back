import React, { useState } from 'react';
import { Button, Tag, Card, Rate, Row, Col } from 'antd';
import { UploadOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import ProList from '@ant-design/pro-list';
import styles from './index.less';
import { dataSource } from './data';
import { ItemType } from './typing';
import MarkWidget from '@/components/MarkWidget';

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
                                ? '172px'
                                : 'auto'
                              : '172px',
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
                                ? '172px'
                                : '800px'
                              : '172px',
                          overflowY: 'scroll',
                        }}
                      >
                        <Tag color="default" style={{ color: '#3C3E42', background: '#EDF2FF' }}>
                          内容不准确；
                        </Tag>
                        <Tag color="default" style={{ color: '#3C3E42', background: '#EDF2FF' }}>
                          内容不准确；题目重复；内容不准确；
                        </Tag>
                        <Tag color="default" style={{ color: '#3C3E42', background: '#EDF2FF' }}>
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
