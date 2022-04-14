import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'umi';
import { Button, Divider, Drawer, message, Tabs, Card, Input, Badge } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormSelect } from '@ant-design/pro-form';

import { getQuestionManagerList } from '@/services/question/api';
import ToBeHandle from './ToBeHandle';

const GroupFields = () => {
  return (
    <ProForm.Group>
      <ProFormSelect.SearchSelect
        name="userQuery"
        label="查询选择器 - request"
        fieldProps={{
          labelInValue: true,
          style: {
            minWidth: 140,
          },
        }}
        debounceTime={300}
        request={async ({ keyWords = '' }) => {
          return [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '未解决(已分配)', value: 'assignees' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ].filter(({ value, label }) => {
            return value.includes(keyWords) || label.includes(keyWords);
          });
        }}
      />
      <ProFormSelect.SearchSelect
        name="userQuery2"
        label="查询选择器 - valueEnum"
        fieldProps={{
          style: {
            minWidth: 140,
          },
        }}
        valueEnum={{
          all: { text: '全部', status: 'Default' },
          open: {
            text: '未解决',
            status: 'Error',
          },
          closed: {
            text: '已解决',
            status: 'Success',
          },
          processing: {
            text: '解决中',
            status: 'Processing',
          },
        }}
      />
      <ProFormSelect.SearchSelect
        name="userQuery3"
        label="查询选择器 - options"
        fieldProps={{
          labelInValue: false,
          style: {
            minWidth: 140,
          },
        }}
        options={[
          { label: '全部', value: 'all' },
          { label: '未解决', value: 'open' },
          { label: '已解决', value: 'closed' },
          { label: '解决中', value: 'processing' },
        ]}
      />
    </ProForm.Group>
  );
};

const QuestionManager: React.FC = (props) => {
  const [currentRow, setCurrentRow] = useState<QuestionAPI.QuestionItem>();
  const [drawerVisible, handleDrawerVisible] = useState<boolean>(false);

  const [activeKey, setActiveKey] = useState<React.Key>('all');

  const columns: ProColumns<QuestionAPI.QuestionItem>[] = [
    {
      dataIndex: 'subjects',
      title: <FormattedMessage id="pages.questionTable.questionNo" defaultMessage="questionNo" />,
      initialValue: 'all',
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
      // todo: valueEnum
      valueEnum: {
        all: { text: '前端学科', status: 0 },
      },
    },
    {
      dataIndex: 'questionNo',
      title: <FormattedMessage id="pages.questionTable.questionNo" defaultMessage="questionNo" />,
    },
    {
      dataIndex: 'title',
      title: <FormattedMessage id="pages.questionTable.title" defaultMessage="title" />,
      ellipsis: true,
      render: (dom, record) => {
        return <a>{record.title}</a>;
      },
    },
    {
      title: <FormattedMessage id="pages.questionTable.answer" defaultMessage="answer" />,
      dataIndex: 'answer',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.questionTable.tags" defaultMessage="tags" />,
      dataIndex: 'tags',
      render: (dom, record) => {
        console.log('[tags]', dom, record);

        return <>{dom + ';'}</>;
      },
    },
    {
      title: <FormattedMessage id="pages.questionTable.views" defaultMessage="views" />,
      dataIndex: 'views',
      hideInSearch: true,
      hideInDescriptions: true,
    },
    {
      title: <FormattedMessage id="pages.questionTable.likeCount" defaultMessage="likeCount" />,
      dataIndex: 'likeCount',
      hideInSearch: true,
      hideInDescriptions: true,
    },
    {
      title: <FormattedMessage id="pages.questionTable.checkStatus" defaultMessage="checkStatus" />,
      dataIndex: 'checkStatus',
      initialValue: 0,
      hideInDescriptions: true,
      valueEnum: {
        0: { text: '全部', status: 0 },
        1: { text: '是', status: 1 },
        2: { text: '否', status: 2 },
      },
    },
    {
      title: <FormattedMessage id="pages.questionTable.owner" defaultMessage="owner" />,
      dataIndex: 'owner',
      hideInSearch: true,
      hideInDescriptions: true,
      render: (dom, record) => {
        console.log('[owner]', dom, record);
        return <>{dom + ' ;'}</>;
      },
    },
    {
      title: <FormattedMessage id="pages.questionTable.updatedAt" defaultMessage="updatedAt" />,
      dataIndex: 'updatedAt',
      hideInSearch: true,
      hideInDescriptions: true,
    },
    {
      title: <FormattedMessage id="pages.questionTable.options" defaultMessage="options" />,
      dataIndex: 'options',
      hideInSearch: true,
      hideInDescriptions: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setCurrentRow(record);
              handleDrawerVisible(true);
              console.log('打开抽屉Modal', record);
            }}
          >
            查看
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setCurrentRow(record);
              handleDrawerVisible(true);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a href="">删除</a>
          <Divider type="vertical" />
          <a href="">不需优化</a>
        </>
      ),
    },
  ];
  return (
    <PageContainer>
      <GroupFields />
      {activeKey == 'all' && (
        <ProTable<QuestionAPI.QuestionItem, QuestionAPI.PageParams>
          request={getQuestionManagerList}
          columns={columns}
          rowKey="id"
          toolbar={{
            menu: {
              type: 'tab',
              activeKey: activeKey,
              items: [
                {
                  key: 'toBeHandle',
                  label: <span>待优化试题</span>,
                },
                {
                  key: 'all',
                  label: <span>全部试题</span>,
                },
                {
                  key: 'handled',
                  label: <span>优化记录</span>,
                },
              ],
              onChange: (key) => {
                setActiveKey(key as string);
              },
            },
          }}
        ></ProTable>
      )}

      {activeKey == 'handled' && (
        <ProTable<QuestionAPI.QuestionItem, QuestionAPI.PageParams>
          request={getQuestionManagerList}
          columns={columns}
          rowKey="id"
          toolbar={{
            menu: {
              type: 'tab',
              activeKey: activeKey,
              items: [
                {
                  key: 'toBeHandle',
                  label: <span>待优化试题</span>,
                },
                {
                  key: 'all',
                  label: <span>全部试题</span>,
                },
                {
                  key: 'handled',
                  label: <span>优化记录</span>,
                },
              ],
              onChange: (key) => {
                setActiveKey(key as string);
              },
            },
          }}
        ></ProTable>
      )}

      {activeKey == 'toBeHandle' && (
        <ProTable<QuestionAPI.QuestionItem, QuestionAPI.PageParams>
          toolbar={{
            menu: {
              type: 'tab',
              activeKey: activeKey,
              items: [
                {
                  key: 'toBeHandle',
                  label: <span>待优化试题</span>,
                },
                {
                  key: 'all',
                  label: <span>全部试题</span>,
                },
                {
                  key: 'handled',
                  label: <span>优化记录</span>,
                },
              ],
              onChange: (key) => {
                setActiveKey(key as string);
              },
            },
          }}
          tableRender={(_, dom) => (
            <div
              style={{
                display: 'flex',
                width: '100%',
              }}
            >
              <ToBeHandle />
              <div
                style={{
                  flex: 1,
                }}
              >
                {dom}
              </div>
            </div>
          )}
          // expandable={() => (
          //   <>
          //     <Button>aaa</Button>
          //     <Button>bbb</Button>
          //     <Button>ccc</Button>
          //   </>
          // )}
          // tableRender={() => (
          //   <>
          //     <Button>aaa</Button>
          //     <Button>bbb</Button>
          //     <Button>ccc</Button>
          //   </>
          // )}
        ></ProTable>
      )}

      <Drawer
        width={600}
        visible={drawerVisible}
        onClose={() => {
          setCurrentRow(undefined);
          handleDrawerVisible(false);
        }}
        closable={false}
      >
        {currentRow?.questionNo && (
          <ProDescriptions<QuestionAPI.QuestionItem>
            column={1}
            title="题目详情"
            request={async () => ({
              data: currentRow || {},
            })}
            // params={{
            //   id: row?._id,
            // }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default QuestionManager;
