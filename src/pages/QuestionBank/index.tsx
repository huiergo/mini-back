import React, { useState, useEffect, useRef } from 'react';
import { FormattedMessage } from 'umi';
import { Divider, Tabs } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import ProForm, { ProFormSelect, QueryFilter, ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { getQuestionManagerList } from '@/services/question/api';
import Unhandle from './Unhandle';
import styles from './index.less';

type StatusType = 'toBeHandle' | 'all' | 'handled';

const QuestionManager: React.FC = (props) => {
  const [currentRow, setCurrentRow] = useState<QuestionAPI.QuestionItem>();
  const [drawerVisible, handleDrawerVisible] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<StatusType>('all');

  const queryformRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();

  const columns: ProColumns<QuestionAPI.ManagerQuestionItem>[] = [
    // {
    //   dataIndex: 'label',
    //   title: <FormattedMessage id="pages.questionTable.questionNo" defaultMessage="label" />,
    //   initialValue: 'all',
    //   hideInTable: true,
    //   hideInForm: true,
    //   hideInDescriptions: true,
    //   // todo: valueEnum
    //   valueEnum: {
    //     all: { text: '前端学科', status: 0 },
    //   },
    // },
    {
      dataIndex: 'questionNo',
      title: <FormattedMessage id="pages.questionTable.questionNo" defaultMessage="questionNo" />,
    },
    // {
    //   dataIndex: 'stem',
    //   title: <FormattedMessage id="pages.questionTable.title" defaultMessage="stem" />,
    //   ellipsis: true,
    //   render: (dom, record) => {
    //     return <a>{record?.stem}</a>;
    //   },
    // },
    // {
    //   title: <FormattedMessage id="pages.questionTable.answer" defaultMessage="answer" />,
    //   dataIndex: 'answer',
    //   hideInTable: true,
    //   hideInSearch: true,
    // },
    // {
    //   title: <FormattedMessage id="pages.questionTable.tags" defaultMessage="label" />,
    //   dataIndex: 'label',
    //   render: (dom, record) => {
    //     console.log('[tags]', dom, record);
    //     return <>{dom + ';'}</>;
    //   },
    // },
    // {
    //   title: <FormattedMessage id="pages.questionTable.views" defaultMessage="views" />,
    //   dataIndex: 'views',
    //   hideInSearch: true,
    //   hideInDescriptions: true,
    // },
    // {
    //   title: <FormattedMessage id="pages.questionTable.likeCount" defaultMessage="likeCount" />,
    //   dataIndex: 'likeCount',
    //   hideInSearch: true,
    //   hideInDescriptions: true,
    // },
    // {
    //   title: <FormattedMessage id="pages.questionTable.checkStatus" defaultMessage="stateValue" />,
    //   dataIndex: 'stateValue',
    //   initialValue: 0,
    //   hideInDescriptions: true,
    //   valueEnum: {
    //     0: { text: '全部', status: 0 },
    //     1: { text: '是', status: 1 },
    //     2: { text: '否', status: 2 },
    //   },
    // },
    // {
    //   title: <FormattedMessage id="pages.questionTable.owner" defaultMessage="updator" />,
    //   dataIndex: 'updator',
    //   hideInSearch: true,
    //   hideInDescriptions: true,
    //   render: (dom, record) => {
    //     console.log('[owner]', dom, record);
    //     return <>{dom + ' ;'}</>;
    //   },
    // },
    // {
    //   title: <FormattedMessage id="pages.questionTable.updatedAt" defaultMessage="updatedAt" />,
    //   dataIndex: 'updatedAt',
    //   hideInSearch: true,
    //   hideInDescriptions: true,
    // },
    // {
    //   title: <FormattedMessage id="pages.questionTable.options" defaultMessage="options" />,
    //   dataIndex: 'options',
    //   hideInSearch: true,
    //   hideInDescriptions: true,
    //   render: (_, record) => (
    //     <>
    //       <a
    //         onClick={() => {
    //           setCurrentRow(record);
    //           handleDrawerVisible(true);
    //           console.log('打开抽屉Modal', record);
    //         }}
    //       >
    //         查看
    //       </a>
    //       <Divider type="vertical" />
    //       <a
    //         onClick={() => {
    //           setCurrentRow(record);
    //           handleDrawerVisible(true);
    //         }}
    //       >
    //         编辑
    //       </a>
    //       <Divider type="vertical" />
    //       <a href="">删除</a>
    //       <Divider type="vertical" />
    //       <a href="">不需优化</a>
    //     </>
    //   ),
    // },
  ];

  return (
    <PageContainer className={styles.manager}>
      {/* 筛选和Tab区域 */}
      <div style={{ background: '#fff', padding: 32, paddingBottom: 0 }}>
        <QueryFilter
          formRef={queryformRef}
          submitter={false}
          span={24}
          labelWidth="auto"
          split
          onValuesChange={async () => {
            queryformRef.current?.validateFieldsReturnFormatValue?.().then((val) => {
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
      {/* 全部试题 */}
      {activeKey == 'all' && (
        <ProTable<QuestionAPI.ManagerQuestionItem, QuestionAPI.PageParams>
          // request={() => {
          //   let data = getQuestionManagerList({
          //     searchType: 0,
          //   });
          //   console.log('[111]', data);
          //   return data;
          //   // return getQuestionManagerList({
          //   //   searchType: 0,
          //   // });
          // }}
          // params={params}

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
              searchType: 0,
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
          search={false}
          columns={columns}
          rowKey="id"
          options={false}
        ></ProTable>
      )}
      {/* 审核记录 */}
      {/* {activeKey == 'handled' && (
        <ProTable<QuestionAPI.ManagerQuestionItem, QuestionAPI.PageParams>
          request={() => {
            return getQuestionManagerList({
              searchType: 0,
            });
          }}
          search={false}
          columns={columns}
          rowKey="id"
          options={false}
        ></ProTable>
      )} */}
      {/* 待优化 */}
      {/* {activeKey == 'toBeHandle' && <Unhandle />} */}
    </PageContainer>
  );
};

export default QuestionManager;
