import React, { useState, useEffect, useRef } from 'react';
import { FormattedMessage } from 'umi';
import { Divider, Tabs, Input, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, { ProFormSelect, QueryFilter, ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { getQuestionManagerList, deleteQuestion, getSearchConfig } from '@/services/question/api';
import Unhandle from './Unhandle';
import styles from './index.less';

type StatusType = 'toBeHandle' | 'all' | 'handled';

const QuestionManager: React.FC = (props) => {
  const [currentRow, setCurrentRow] = useState<QuestionAPI.QuestionItem>();
  const [drawerVisible, handleDrawerVisible] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<StatusType>('all');
  const [subject, setSubject] = useState<string>();
  const [stem, setStem] = useState<string>();
  const [label, setLabel] = useState<string>();
  const actionRef = useRef<ActionType>();

  const [subjectArr, setSubjectArr] = useState<QuestionAPI.CommonOption[]>();
  const [labelArr, setLabelArr] = useState<QuestionAPI.CommonOption[]>();
  const [optStatusArr, setOptStatusArr] = useState<QuestionAPI.CommonOption[]>();

  const queryFormRef = useRef<
    ProFormInstance<{
      subject: string;
      stem: string;
      label: string;
    }>
  >();

  useEffect(() => {
    getSearchConfig().then((res) => {
      let result = res?.data;
      let subjectTempArr = result?.subject?.map((i: QuestionAPI.ISubject) => {
        return {
          label: i?.name,
          value: i?.id,
        };
      });
      let labelTempArr = result?.label?.map((i: QuestionAPI.ILabel) => {
        return {
          label: i?.name,
          value: i?.id,
        };
      });
      let optStatusTempArr = result?.optStatus?.map((i: QuestionAPI.IOptStatus) => {
        return {
          label: i?.name,
          value: i?.code,
        };
      });

      setSubjectArr(subjectTempArr);
      setLabelArr(labelTempArr);
      setOptStatusArr(optStatusTempArr);
    });
  }, []);

  const deleteItem = async (record: QuestionAPI.ManagerQuestionItem, type: number) => {
    let loadingText = type == 0 ? '处理中' : '正在删除';
    let successText = type == 0 ? '处理完成' : '删除成功';
    let failText = type == 0 ? '处理失败' : '删除失败';

    const hide = message.loading(loadingText);
    try {
      await deleteQuestion({
        type: type,
        id: record.id,
      });
      actionRef.current?.reload?.();
      hide();
      message.success(successText);
    } catch (error) {
      hide();
      message.error(failText);
    }
  };

  const request = async (
    params: T & {
      pageSize: number;
      current: number;
      subject: string;
      stem: string;
      label: string;
    },
  ) => {
    const msg = await getQuestionManagerList({
      current: params.current,
      pageSize: params.pageSize,
      searchType: params.searchType,
      subjectId: params.subject,
      keyword: params.stem,
      label: params.label,
    });
    const { rows, total, pageTotal } = msg?.data;
    return {
      data: rows,
      success: true,
      total: total,
      current: pageTotal,
    };
  };

  const columns: ProColumns<QuestionAPI.ManagerQuestionItem>[] = [
    {
      dataIndex: 'questionNo',
      title: <FormattedMessage id="pages.questionTable.questionNo" defaultMessage="questionNo" />,
    },
    {
      dataIndex: 'stem',
      title: <FormattedMessage id="pages.questionTable.title" defaultMessage="stem" />,
      ellipsis: true,

      render: (dom, record) => {
        return <a>{record?.stem}</a>;
      },
    },
    {
      title: <FormattedMessage id="pages.questionTable.answer" defaultMessage="answer" />,
      dataIndex: 'answer',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.questionTable.tags" defaultMessage="label" />,
      dataIndex: 'label',
      render: (dom, record) => {
        return <>{dom + ';'}</>;
      },
    },

    {
      title: <FormattedMessage id="pages.questionTable.checkStatus" defaultMessage="stateValue" />,
      dataIndex: 'stateValue',
      initialValue: 0,
      hideInDescriptions: true,
      valueEnum: {
        0: { text: '待优化', status: 'Error' },
        1: { text: '已优化', status: 'Default' },
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
          <a onClick={() => deleteItem(record, 1)}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => deleteItem(record, 0)}>不需优化</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer className={styles.manager}>
      <div style={{ background: '#fff', padding: 32, paddingBottom: 0 }}>
        <QueryFilter
          submitter={false}
          span={24}
          labelWidth="auto"
          split
          autoFocusFirstInput={false}
          className={styles.filter}
          formRef={queryFormRef}
          onValuesChange={async () => {
            queryFormRef.current?.validateFieldsReturnFormatValue?.().then((val) => {
              setSubject(val.subject);
              setLabel(val.label);
              console.log('[onValuesChange]', val);
            });
          }}
        >
          <ProForm.Group title=" ">
            <ProFormSelect
              width="md"
              colProps={{ xl: 12, md: 12 }}
              name="subject"
              placeholder="移动web与前端"
              // valueEnum={{ '220000198603204107': '候' }}
              options={subjectArr}
            />
            <ProFormSelect
              width="md"
              placeholder="知识点"
              colProps={{ xl: 12, md: 12 }}
              name="label"
              options={labelArr}
            />
            <Input.Search
              width="md"
              placeholder="题干关键词搜索"
              enterButton
              size="middle"
              onSearch={(v) => setStem(v)}
              style={{ maxWidth: 522, width: '100%' }}
            />
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
          actionRef={actionRef}
          params={{ subject, stem, label }}
          request={(params) => request({ ...params, searchType: 0 })}
          search={false}
          columns={columns}
          rowKey="id"
          options={false}
        ></ProTable>
      )}
      {/* 审核记录 */}
      {activeKey == 'handled' && (
        <ProTable<QuestionAPI.ManagerQuestionItem, QuestionAPI.PageParams>
          params={{ subject, stem, label }}
          request={(params) => request({ ...params, searchType: 1 })}
          search={false}
          columns={columns}
          rowKey="id"
          options={false}
        ></ProTable>
      )}
      {/* 待优化 */}
      {activeKey == 'toBeHandle' && <Unhandle />}
    </PageContainer>
  );
};

export default QuestionManager;
