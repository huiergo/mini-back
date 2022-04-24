// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

// todo: account接口，返回权限admin鉴权
// todo: 后端返回格式不同，怎么adaptor兼容， 错误中间件处理配置

export async function getOperationQuestionList(
  params: {
    current?: number;
    pageSize?: number;
    searchType?: number;
    subjectId?: string;
    keyword?: string;
    label?: string;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<QuestionAPI.ManagerQuestionItem>('/operation/question', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
