// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

// todo: account接口，返回权限admin鉴权
// todo: 后端返回格式不同，怎么adaptor兼容， 错误中间件处理配置
export async function getQuestionList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<QuestionAPI.QuestionItem>('/api/questionList', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getQuestionManagerList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<QuestionAPI.QuestionItem>('/api/questionList', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
