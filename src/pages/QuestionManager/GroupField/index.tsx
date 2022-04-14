import React, { useRef } from 'react';
import { message, TreeSelect } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormCascader } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-form';

export default () => {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      rowProps={{
        gutter: [16, 16],
      }}
      submitter={false}
      grid={true}
      onFinish={async (values) => {
        console.log('[onFinish]', values);
      }}
      formRef={formRef}
      onValuesChange={async () => {
        formRef.current?.validateFieldsReturnFormatValue?.().then((val) => {
          // 以下为格式化之后的表单值
          console.log('[onValuesChange]', val);
        });
      }}
      autoFocusFirstInput
    >
      <ProFormText name="age" label="年龄" />
      <ProFormSelect
        colProps={{ md: 8, xl: 8 }}
        options={[
          {
            value: 'chapter',
            label: '盖章后生效',
          },
        ]}
        width="md"
        name="useMode"
        label={`与合同约定生效方式`}
      />
      <ProFormSelect
        colProps={{ xl: 8, md: 8 }}
        label="职位"
        name="level"
        valueEnum={{
          1: 'front end',
          2: 'back end',
          3: 'full stack',
        }}
      />
    </ProForm>
  );
};
