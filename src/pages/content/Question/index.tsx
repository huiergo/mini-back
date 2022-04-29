import React, { useState, useRef, useEffect } from 'react';
import { FormattedMessage } from 'umi';
import { Button, Divider, Drawer, message, Input, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {
  deleteQuestion,
  getOperationQuestionList,
  pushQuestion,
  submitEditInfo,
  getSearchConfig,
} from '@/services/content/question/api';
import ProForm, {
  ModalForm,
  ProFormInstance,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  QueryFilter,
} from '@ant-design/pro-form';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import MarkWidget from '@/components/MarkWidget';
import { history } from 'umi';
import styles from './index.less';

const waitTime = (timeout = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
};

const handleLabelToString = (arr) => {
  return arr.reduce((total, cur) => {
    return (total += cur.name + '；');
  }, '');
};

const Question: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const ref = useRef<ProFormInstance>();
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [drawerVisible, handleDrawerVisible] = useState<boolean>(false);

  const [subject, setSubject] = useState<string>();
  const [stem, setStem] = useState<string>();
  const [label, setLabel] = useState<string>();
  const [optStatus, setOptStatus] = useState<string>();
  const [order, setOrder] = useState<string>();
  const [orderMethod, setOrderMethod] = useState<string>();

  const [subjectArr, setSubjectArr] = useState<QuestionAPI.CommonOption[]>();
  const [labelArr, setLabelArr] = useState<QuestionAPI.CommonOption[]>();
  const [optStatusArr, setOptStatusArr] = useState<QuestionAPI.CommonOption[]>();
  const queryFormRef = useRef<
    ProFormInstance<{
      subject: string;
      stem: string;
      label: string;
      optStatus: string;
    }>
  >();

  const inputRef = useRef<any>(null);

  const [inputValue, setInputValue] = useState('');

  const changeLabelTags = (list) => {
    //todo: 表单提交的 时候 能够带上

    let result = labelArr.filter((item) => {
      return list.indexOf(item.value) > -1;
    });
    console.log('[result111]', result);
    let temp = result.map((item) => {
      return {
        id: item.value,
        name: item.label,
      };
    });
    console.log('[temp111]', temp);

    return temp;
  };
  useEffect(() => {
    console.log('[history]', history.location.query);
    setInputValue(history.location.query?.id);
    setStem(history.location.query?.id);
  }, [history.location.query]);

  useEffect(() => {
    getSearchConfig().then((res) => {
      let result = res?.data;
      let subjectTempArr = result.subject.map((i: QuestionAPI.ISubject) => {
        return {
          label: i?.name,
          value: i?.id,
        };
      });
      let labelTempArr = result.label.map((i: QuestionAPI.ILabel) => {
        return {
          label: i?.name,
          value: i?.id,
        };
      });
      let optStatusTempArr = result.optStatus.map((i: QuestionAPI.IOptStatus) => {
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
  const [currentRow, setCurrentRow] = useState<QuestionAPI.QuestionItem>();
  const columns: ProColumns<QuestionAPI.QuestionItem>[] = [
    {
      dataIndex: 'subjects',
      title: <FormattedMessage id="pages.questionTable.subjects" defaultMessage="subjects" />,
      initialValue: 'all',
      hideInSearch: true,
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
      width: 100,
      title: <FormattedMessage id="pages.questionTable.questionNo" defaultMessage="questionNo" />,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      dataIndex: 'stem',
      width: 250,
      title: <FormattedMessage id="pages.questionTable.title" defaultMessage="title" />,
      ellipsis: true,
      hideInSearch: true,
      render: (dom, record) => {
        const temp = record?.stem?.replace(/<[^>]+>/g, ''); // html是一个要去除html标记的文档

        return (
          <a
            onClick={() => {
              setCurrentRow(record);
              handleDrawerVisible(true);
              handleModalVisible(true);
              console.log('打开抽屉Modal', record);
            }}
            style={{ overflow: 'hidden' }}
          >
            {temp}
          </a>
        );
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
      dataIndex: 'label',
      hideInSearch: true,
      width: 200,
      render: (dom, record) => {
        return <>{handleLabelToString(record?.label)}</>;
      },
    },
    {
      title: <FormattedMessage id="pages.questionTable.views" defaultMessage="views" />,
      dataIndex: 'views',
      width: 100,
      hideInSearch: true,
      hideInDescriptions: true,
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.questionTable.likeCount" defaultMessage="likeCount" />,
      dataIndex: 'likeCount',
      width: 100,
      hideInSearch: true,
      hideInDescriptions: true,
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.questionTable.checkStatus" defaultMessage="checkStatus" />,
      dataIndex: 'optStatus',
      width: 100,
      initialValue: 0,
      hideInSearch: true,
      hideInDescriptions: true,
      valueEnum: {
        0: { text: '待优化', status: 0 },
        1: { text: '已优化', status: 1 },
      },
    },
    {
      title: <FormattedMessage id="pages.questionTable.owner" defaultMessage="owner" />,
      dataIndex: 'updator',
      width: 100,
      hideInSearch: true,
      hideInDescriptions: true,
      render: (dom, record) => {
        return <>{record?.updator ? record?.updator : '-'} </>;
      },
    },
    {
      title: <FormattedMessage id="pages.questionTable.updatedAt" defaultMessage="updatedAt" />,
      dataIndex: 'updatedAt',
      width: 150,
      hideInSearch: true,
      hideInDescriptions: true,
    },
    {
      title: <FormattedMessage id="pages.questionTable.options" defaultMessage="options" />,
      dataIndex: 'options',
      hideInSearch: true,
      hideInDescriptions: true,
      width: 200,
      fixed: 'right',
      render: (_, record) => {
        if (record.optStatus === 0) {
          return (
            <div>
              <a style={{ color: '#D9DBDE', cursor: 'default' }}>推送</a>
              <Divider type="vertical" />
              <a style={{ color: '#D9DBDE', cursor: 'default' }}>修改知识点</a>
              <Divider type="vertical" />
              <a style={{ color: '#D9DBDE', cursor: 'default' }}>删除</a>
            </div>
          );
        } else {
          return (
            <>
              <a
                onClick={async () => {
                  // handleUpdateModalVisible(true);
                  const { data } = await pushQuestion({ id: record?.id });
                  if (data?.id) {
                    message.success('推送成功');
                    actionRef.current?.reload();
                  }
                }}
              >
                推送
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  setCurrentRow(record);
                  handleDrawerVisible(false);
                  handleModalVisible(true);
                }}
              >
                修改知识点
              </a>
              <Divider type="vertical" />
              <a
                onClick={async () => {
                  // handleUpdateModalVisible(true);
                  try {
                    const { data } = await deleteQuestion({ id: record?.id, type: 1 });
                    if (data?.id) {
                      message.success('删除成功');
                      actionRef.current?.reload();
                    }
                  } catch (error) {
                    message.error('删除失败');
                  }
                }}
              >
                删除
              </a>
            </>
          );
        }
      },
    },
  ];

  const request = async (
    params: T & {
      pageSize: number;
      current: number;
      subject: string;
      stem: string;
      label: string;
      optStatus: string;
      order: string;
      orderMethod: string;
    },
  ) => {
    const msg = await getOperationQuestionList({
      current: params.current,
      pageSize: params.pageSize,
      searchType: params.searchType,
      subjectId: params.subject,
      keyword: params.stem,
      label: params.label,
      optStatus: params.optStatus,
      order: params.order,
      orderMethod: params.orderMethod,
    });
    const { rows, total, pageTotal } = msg?.data;
    return {
      data: rows,
      success: true,
      total: total,
      current: pageTotal,
    };
  };

  const handleTableChange = (pagination, filters, sorter) => {
    console.log('pagination', pagination);
    console.log('filters', filters);
    console.log('sorter', sorter);

    setOrder(sorter.field);
    setOrderMethod(sorter.order);
    // this.fetch({
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   pagination,
    //   ...filters,
    // });
  };

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
              setOptStatus(val.optStatus);
              console.log('[onValuesChange]', val);
            });
          }}
        >
          <ProForm.Group title=" ">
            <ProFormSelect
              width="md"
              colProps={{ xl: 12, md: 12 }}
              name="subject"
              placeholder="前端与移动开发"
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
            {/* optStatus */}
            <ProFormSelect
              width="md"
              placeholder="状态"
              colProps={{ xl: 12, md: 12 }}
              name="optStatus"
              options={optStatusArr}
            />
            <Input.Search
              ref={inputRef}
              value={inputValue}
              width="md"
              placeholder="题干关键词搜索"
              enterButton
              size="middle"
              onChange={(v) => {
                setInputValue(v.target.value);
              }}
              onSearch={(v) => {
                setStem(v);
              }}
              style={{ maxWidth: 522, width: '100%' }}
            />
          </ProForm.Group>
        </QueryFilter>
      </div>
      <div style={{ background: '#fff', padding: 32, paddingBottom: 0, paddingTop: 0 }}>
        <ProTable<QuestionAPI.QuestionItem, QuestionAPI.PageParams>
          scroll={{ x: 1300 }}
          params={{ subject, stem, label, optStatus, order, orderMethod }}
          request={(params) => request({ ...params, searchType: 0 })}
          columns={columns}
          actionRef={actionRef}
          rowKey="id"
          formRef={ref}
          onRequestError={(error) => console.log('[请求失败]', error)}
          options={false}
          onSubmit={(params) => {
            console.log('[onSubmit]', params);
          }}
          toolBarRender={false}
          search={false}
          onChange={handleTableChange}
        ></ProTable>
      </div>

      <ModalForm
        className={styles.managerModal}
        title="修改知识点"
        visible={modalVisible}
        onVisibleChange={handleModalVisible}
        autoFocusFirstInput
        modalProps={{
          onCancel: () => console.log('run'),
        }}
        onFinish={async (values) => {
          if (drawerVisible) {
            return handleModalVisible(false);
          }
          console.log('[values]', values.label);
          console.log('[xxxx]', changeLabelTags(values.label));
          const result = await submitEditInfo({
            ...currentRow,
            id: currentRow?.id,
            label: changeLabelTags(values.label),
          });
          // 这里tags需要改为 [{id:xx,name:yyy}]
          console.log('[model 提交内容]', result);
          // todo : 细致化体验
          message.success('提交成功');
          handleModalVisible(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
          return true;
        }}
      >
        <ProDescriptions
          style={{ background: '#F6F7F9', padding: 16, marginBottom: 16 }}
          column={2}
        >
          <ProDescriptions.Item span={2} label="题目">
            <MarkWidget>{currentRow?.stem}</MarkWidget>
          </ProDescriptions.Item>
          <ProDescriptions.Item span={4} label="答案">
            <MarkWidget>{currentRow?.answer}</MarkWidget>
          </ProDescriptions.Item>
          <ProDescriptions.Item label="难度" valueType="rate">
            {currentRow?.difficulty}
          </ProDescriptions.Item>
        </ProDescriptions>
        {drawerVisible && (
          <div className={styles.tagWrapper}>
            {currentRow?.label.map((i) => (
              <div className={styles.tag}>{i.name}</div>
            ))}
          </div>
        )}
        {!drawerVisible && (
          <ProFormSelect mode="tags" options={labelArr} name="label" label="修改知识点" />
        )}
      </ModalForm>
    </PageContainer>
  );
};
export default Question;
