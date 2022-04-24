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
    searchType?: number;
    subjectId?: string;
    keyword?: string;
    label?: string;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<QuestionAPI.ManagerQuestionItem>('/wxManagement/question/list', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
// 删除、无需优化
export async function deleteQuestion(
  params: {
    current?: number;
    pageSize?: number;
    feedback?: boolean;
    type?: number;
    id?: string;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<QuestionAPI.ManagerQuestionItem>('/wxManagement/question/deal', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// /operation/question/search
// 查询条件包括知识点，状态、学科
export async function getSearchConfig() {
  return request<QuestionAPI.SearchConfig>('/operation/question/search');
}
