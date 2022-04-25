import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage } from 'umi';
import { getFeedback, dealFeedback } from '@/services/feedback/api';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Divider, Drawer, message } from 'antd';
import { history } from 'umi';

const Feedback: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<FeedbackApi.FeedbackItem>[] = [
    {
      dataIndex: 'createdAt',
      title: <FormattedMessage id="pages.feedbackTable.feedTime" defaultMessage="feedTime" />,
    },
    {
      dataIndex: 'type',
      title: (
        <FormattedMessage id="pages.feedbackTable.feedCategory" defaultMessage="feedCategory" />
      ),
    },
    {
      dataIndex: 'questionNo',
      title: <FormattedMessage id="pages.questionTable.questionNo" defaultMessage="questionNo" />,
    },
    {
      dataIndex: 'stem',
      title: <FormattedMessage id="pages.questionTable.title" defaultMessage="title" />,
      ellipsis: true,
    },
    {
      dataIndex: 'feedbackInfo',
      title: <FormattedMessage id="pages.feedbackTable.feedAdvice" defaultMessage="feedAdvice" />,
    },
    {
      dataIndex: 'state',
      title: <FormattedMessage id="pages.feedbackTable.feedStatus" defaultMessage="feedStatus" />,
      initialValue: 0,
      hideInDescriptions: true,
      valueEnum: {
        0: { text: '未处理', status: 0 },
        1: { text: '已完成', status: 1 },
      },
    },

    {
      title: <FormattedMessage id="pages.feedbackTable.options" defaultMessage="options" />,
      dataIndex: 'options',
      hideInSearch: true,
      hideInDescriptions: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              // handleUpdateModalVisible(true);
              // setStepFormValues(record);
              history.push(`/content/question?id=${record?.id}`);
            }}
          >
            定位到题目
          </a>
          <Divider type="vertical" />
          <a
            style={{ color: record?.state === '1' ? '#C3C3C5' : '#2278FF' }}
            onClick={async () => {
              const {
                data: { id },
              } = record?.state === '0' && (await dealFeedback({ id: record?.id }));
              id && actionRef.current?.reload?.();
              // setCurrentRow(record);
              // handleModalVisible(true);
            }}
          >
            {record?.state === '1' ? '已处理' : '处理'}
          </a>
        </>
      ),
    },
  ];

  const request = async (
    params: T & {
      pageSize: number;
      current: number;
    },
  ) => {
    const msg = await getFeedback({
      current: params.current,
      pageSize: params.pageSize,
    });
    console.log('[getFeedback]', msg);
    const { rows, total, pageTotal } = msg?.data;
    return {
      data: rows,
      success: true,
      total: total,
      current: pageTotal,
    };
  };

  return (
    <PageContainer>
      <ProTable<FeedbackApi.FeedbackItem>
        actionRef={actionRef}
        rowKey="id"
        request={request}
        columns={columns}
        search={false}
      ></ProTable>
    </PageContainer>
  );
};
export default Feedback;
