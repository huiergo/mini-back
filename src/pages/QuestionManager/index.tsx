import React, { useState, useEffect, useRef } from 'react';
import { FormattedMessage } from 'umi';
import { Button, Divider, Drawer, message, Tabs, Card, Input, Badge } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProCard from '@ant-design/pro-card';
import ProForm, {
  ProFormSelect,
  QueryFilter,
  ProFormText,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

import { getQuestionManagerList } from '@/services/question/api';
import ToBeHandle from './ToBeHandle';

import GroupField from './GroupField';
const { TabPane } = Tabs;

type StatusType = 'toBeHandle' | 'all' | 'handled';

// type AdvancedSearchProps = {
//   onFilterChange?: (allValues: any) => void;
//   onSearch?: (text: string) => void;
//   onTypeChange?: (type: string) => void;
//   defaultType?: string;
// };
const QuestionManager: React.FC = (props) => {
  const [currentRow, setCurrentRow] = useState<QuestionAPI.QuestionItem>();
  const [drawerVisible, handleDrawerVisible] = useState<boolean>(false);

  const [activeKey, setActiveKey] = useState<StatusType>('all');

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

  const queryformRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
  return (
    <PageContainer>
      <div style={{ background: '#fff', padding: 32, paddingBottom: 0 }}>
        <QueryFilter
          formRef={queryformRef}
          submitter={false}
          span={24}
          labelWidth="auto"
          split
          onValuesChange={async () => {
            queryformRef.current?.validateFieldsReturnFormatValue?.().then((val) => {
              // 以下为格式化之后的表单值
              console.log('[onValuesChange]', val);
            });
          }}
        >
          {/* todo: 1. title 占位去掉 2. 宽度固定&UI样式 3.节流 */}
          <ProForm.Group title=" ">
            <ProFormSelect
              colProps={{ xl: 12, md: 12 }}
              name="subject"
              label="学科"
              valueEnum={{
                1: '移动web与前端',
              }}
            />
            <ProFormSelect
              label="知识点"
              colProps={{ xl: 12, md: 12 }}
              name="category"
              valueEnum={{
                1: 'JS',
                2: 'Css',
              }}
            />
            <ProFormText name="keyword" label="题干" placeholder="根据题干进行搜索" />
          </ProForm.Group>
        </QueryFilter>
        <Tabs activeKey={activeKey} onChange={(activeKey) => setActiveKey(activeKey as StatusType)}>
          <Tabs.TabPane key="toBeHandle" tab="待优化题目" />
          <Tabs.TabPane key="all" tab="全部试题" />
          <Tabs.TabPane key="handled" tab="审核记录" />
        </Tabs>
      </div>
      {activeKey == 'all' && (
        <ProTable<QuestionAPI.QuestionItem, QuestionAPI.PageParams>
          request={getQuestionManagerList}
          search={false}
          columns={columns}
          rowKey="id"
          options={false}
          // toolBarRender={}
        ></ProTable>
      )}
      {activeKey == 'handled' && (
        <ProTable<QuestionAPI.QuestionItem, QuestionAPI.PageParams>
          request={getQuestionManagerList}
          search={false}
          columns={columns}
          rowKey="id"
          options={false}
          // toolBarRender={}
        ></ProTable>
      )}
      {activeKey == 'toBeHandle' && <ToBeHandle />}
    </PageContainer>
  );
};

export default QuestionManager;
