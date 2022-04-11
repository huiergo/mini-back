import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import React from 'react';
import { FormattedMessage } from 'umi';
import { getFeedback } from '@/services/feedback/api';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Divider, Drawer, message } from 'antd';

const Feedback: React.FC = () => {
  const columns: ProColumns<FeedbackApi.FeedbackItem>[] = [
    {
      dataIndex: 'feedTime',
      title: <FormattedMessage id="pages.feedbackTable.feedTime" defaultMessage="feedTime" />,
    },
    {
      dataIndex: 'feedCategory',
      title: (
        <FormattedMessage id="pages.feedbackTable.feedCategory" defaultMessage="feedCategory" />
      ),
    },
    {
      dataIndex: 'questionNo',
      title: <FormattedMessage id="pages.questionTable.questionNo" defaultMessage="questionNo" />,
    },
    {
      dataIndex: 'title',
      title: <FormattedMessage id="pages.questionTable.title" defaultMessage="title" />,
      ellipsis: true,
    },
    {
      dataIndex: 'feedAdvice',
      title: <FormattedMessage id="pages.feedbackTable.feedAdvice" defaultMessage="feedAdvice" />,
    },
    {
      dataIndex: 'feedStatus',
      title: <FormattedMessage id="pages.feedbackTable.feedStatus" defaultMessage="feedStatus" />,
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
            }}
          >
            定位到题目
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              // setCurrentRow(record);
              // handleModalVisible(true);
            }}
          >
            处理
          </a>
        </>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<FeedbackApi.FeedbackItem>
        rowKey="id"
        request={getFeedback}
        columns={columns}
        search={false}
      ></ProTable>
    </PageContainer>
  );
};
export default Feedback;
