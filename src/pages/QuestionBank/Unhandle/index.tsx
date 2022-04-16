import React, { useState } from 'react';
import { Button, Tag, Card, Rate, Row, Col } from 'antd';
import { UploadOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import ProList from '@ant-design/pro-list';
import { useRequest } from 'umi';
import styles from './index.less';
import MarkWidget from '@/components/MarkWidget';
import { getQuestionManagerList } from '@/services/question/api';

export default () => {
  const [currentRow, setCurrentRow] = useState<QuestionAPI.ManagerQuestionItem>();
  const [showFilter, setShowFilter] = useState<boolean>(true);
  // todo: useRequest 和 request 对比
  // const data = useRequest(() => {
  //   return getQuestionManagerList({
  //     searchType: 0,
  //   });
  // });
  // console.log('[getQuestionManagerList data]', data);
  return (
    <ProList<QuestionAPI.ManagerQuestionItem>
      className={styles.toBeHandle}
      split={true}
      itemLayout="vertical"
      rowKey="name"
      // dataSource={dataSource}
      request={async (
        // 第一个参数 params 查询表单和 params 参数的结合
        // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
        params: T & {
          pageSize: number;
          current: number;
        },
        sort,
        filter,
      ) => {
        // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
        // 如果需要转化参数可以在这里进行修改
        const msg = await getQuestionManagerList({
          current: params.current,
          pageSize: params.pageSize,
          searchType: 2,
        });
        console.log('[msg]', msg);
        const { rows, total, pageTotal } = msg?.data;
        return {
          data: rows,
          success: true,
          total: total,
          current: pageTotal,
        };
      }}
      metas={{
        title: {
          render: (_, row) => {
            return (
              <Row gutter={[2, 2]}>
                <Col span={16}>
                  <Tag color="default" style={{ color: '#3C3E42', background: '#F6F7F9' }}>
                    {row?.label}
                  </Tag>
                  {/* todo: tag wrap 换行 */}
                  <Tag
                    color="default"
                    style={{
                      color: '#3C3E42',
                      background: '#F6F7F9',
                      wordWrap: 'break-word',
                      wordBreak: 'break-all',
                    }}
                  >
                    {row?.feedback?.type}
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
                currentRow?.stem === entity?.stem
                  ? setShowFilter(!showFilter)
                  : setShowFilter(false);
              }}
            >
              {index}

              {currentRow?.stem === entity?.stem ? (showFilter ? '展开' : '收起') : '展开'}
              {currentRow?.stem === entity?.stem ? (
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
                      title={entity?.stem}
                      extra={<Rate disabled defaultValue={2} />}
                      bodyStyle={{
                        paddingBottom: 0,
                        background: '#FAFAFA',
                      }}
                      bordered={false}
                      className={
                        currentRow?.stem === entity?.stem
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
                            currentRow?.stem === entity?.stem
                              ? showFilter
                                ? 'auto'
                                : 'scroll'
                              : 'auto',
                          height:
                            currentRow?.stem === entity?.stem
                              ? showFilter
                                ? '172px'
                                : 'auto'
                              : '172px',
                        }}
                      >
                        <MarkWidget>{entity?.answer}</MarkWidget>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="反馈建议" bordered={false}>
                      <div
                        style={{
                          maxHeight:
                            currentRow?.stem === entity?.stem
                              ? showFilter
                                ? '172px'
                                : '800px'
                              : '172px',
                          overflowY: 'scroll',
                        }}
                      >
                        {entity?.feedback?.feedbackInfo?.map((i) => (
                          <Tag color="default" style={{ color: '#3C3E42', background: '#EDF2FF' }}>
                            {i}
                          </Tag>
                        ))}
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
