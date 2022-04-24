import React, { useState, useRef } from 'react';
import { FormattedMessage } from 'umi';
import { Button, Divider, Drawer, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getOperationQuestionList } from '@/services/content/question/api';
// 针对formRef的使用: getFieldsValue ,getFieldsError,resetFields,setFields,validateFields,submit
import {
  ModalForm,
  ProFormInstance,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PlusOutlined } from '@ant-design/icons';

const waitTime = (timeout = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
};

const Question: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const ref = useRef<ProFormInstance>();
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [drawerVisible, handleDrawerVisible] = useState<boolean>(false);

  const [currentRow, setCurrentRow] = useState<QuestionAPI.QuestionItem>();
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
      dataIndex: 'stem',
      title: <FormattedMessage id="pages.questionTable.title" defaultMessage="title" />,
      ellipsis: true,
      render: (dom, record) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(record);
              handleDrawerVisible(true);
              console.log('打开抽屉Modal', record);
            }}
          >
            {record?.stem}
            {/* {dom} */}
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
      dataIndex: 'tags',
      render: (dom, record) => {
        console.log('[tags]', dom, record);

        return <>{record?.label}</>;
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
      dataIndex: 'state',
      initialValue: 0,
      hideInDescriptions: true,
      valueEnum: {
        0: { text: '待优化', status: 0 },
        1: { text: '已优化', status: 1 },
      },
    },
    {
      title: <FormattedMessage id="pages.questionTable.owner" defaultMessage="owner" />,
      dataIndex: 'updator',
      hideInSearch: true,
      hideInDescriptions: true,
      render: (dom, record) => {
        console.log('[owner]', dom, record);
        return <>{record?.updator} </>;
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
              // handleUpdateModalVisible(true);
              // setStepFormValues(record);
            }}
          >
            推送
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setCurrentRow(record);
              handleModalVisible(true);
            }}
          >
            修改知识点
          </a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];

  const request = async (
    params: T & {
      pageSize: number;
      current: number;
      subject: string;
      stem: string;
      label: string;
    },
  ) => {
    const msg = await getOperationQuestionList({
      current: params.current,
      pageSize: params.pageSize,
      searchType: params.searchType,
      subjectId: params.subject,
      keyword: params.stem,
      label: params.label,
    });
    console.log('[msg]', msg);
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
      <ProTable<QuestionAPI.QuestionItem, QuestionAPI.PageParams>
        // request={getQuestionList}
        request={(params) => request({ ...params, searchType: 0 })}
        columns={columns}
        actionRef={actionRef}
        rowKey="id"
        formRef={ref}
        toolBarRender={() => [
          <Button
            key="set"
            onClick={() => {
              if (ref.current) {
                ref.current.setFieldsValue({
                  title: 'test-xxx',
                });
              }
            }}
          >
            赋值
          </Button>,
          <Button
            key="submit"
            onClick={() => {
              if (ref.current) {
                ref.current.resetFields();
              }
            }}
          >
            重置
          </Button>,
        ]}
        onRequestError={(error) => console.log('[请求失败]', error)}
        options={false}
        onSubmit={(params) => {
          console.log('[onSubmit]', params);
        }}
        onReset={() => console.log('[onReset]')}
      ></ProTable>

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

      <ModalForm
        title="新建表单"
        visible={modalVisible}
        onVisibleChange={handleModalVisible}
        autoFocusFirstInput
        modalProps={{
          onCancel: () => console.log('run'),
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log('[model 提交内容]', values);
          message.success('提交成功');
          return true;
        }}
        // onFinish={async (value) => {
        //   const success = await handleAdd(value as API.RuleListItem);
        //   if (success) {
        //     handleModalVisible(false);
        //     if (actionRef.current) {
        //       actionRef.current.reload();
        //     }
        //   }
        // }}
      >
        {/* <ProDescriptions<QuestionAPI.QuestionItem>
          column={1}
          title={currentRow?.questionNo}
          request={async () => ({
            data: currentRow || {},
          })}
          columns={columns}
        /> */}
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="title"
          readonly
          label="题目"
          initialValue={currentRow?.title}
        />
        <ProFormTextArea
          width="md"
          name="answer"
          readonly
          label="答案"
          initialValue={currentRow?.answer}
        />
        <ProFormSelect
          options={[
            {
              value: 'html',
              label: 'html',
            },
            {
              value: 'js',
              label: 'js',
            },
            {
              value: 'css',
              label: 'css',
            },
          ]}
          name="tags"
          label="修改知识点"
        />
      </ModalForm>
    </PageContainer>
  );
};
export default Question;

//====== columns 设置
// hideInSearch: false,
// hideInTable: false,
// hideInForm: false,
// // todo: filters和onFilter的区别
// /** 表头的筛选菜单项 */
// filters: false,
// /** 筛选的函数，设置为 false 会关闭自带的本地筛选 */
// onFilter: false,

// ==============
// // params 一旦变化，会触发加载 todo: 为啥params只能是PageParams类型呢
// params={{
// }}
// // 对request数据进行处理
// postData={}
// defaultData={}
// // 更推荐request 返回数据
// dataSource={}
// // table数据发生改变时调用
// onDataSourceChange={}
// // Table action的引用，便于自定义触发

// =========
// // todo : 做一个请求失败的中间件
// onRequestError={(error) => console.log('[请求失败]', error)}
// // table 工具栏,设为 false 时不显示.传入 function 会点击时触发
// options={false}
// // false | SearchConfig
// // todo : 不认识这个？
// // search={{
// //   filterType: 'light',
// //   searchText: '查询文本',
// //   span: 5,
// // }}
// // antd form 的配置: FormProps . 类似Form.useForm(), 和上述的ProFormInstance 一样
// // form={}

// // 提交表单时触发
// onSubmit={(params) => {
//   // todo ,是不需要写吧？ 直接request监听就行吧
//   console.log('[onSubmit]', params);
// }}
// // 重置表单时触发   // todo ,是不需要写吧？ 直接request监听就行吧
// onReset={() => console.log('[onReset]')}

//  =====以下是 columns 相关的配置
// //  columns={[
// //    {
// //       // 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
// //   filters={}
// //   // 筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
// //   onFilter={}
// //    }
// //  ]}

// // search 配置列的搜索相关，false 为隐藏

// // renderFormItem:  渲染查询表单的输入组件
// // render
// // renderText

// // fieldProps： 查询表单的 props，会透传给表单项,如果渲染出来是 Input,就支持 input 的所有 props，同理如果是 select，也支持 select 的所有 props。也支持方法传入
// // formItemProps： 传递给 Form.Item 的配置,可以配置 rules，但是默认的查询表单 rules 是不生效的。需要配置 ignoreRules
