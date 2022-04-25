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

// 后台-编辑试题提交
export async function submitEditInfo(
  // params: QuestionAPI.QuestionItem,
  // params: {
  //   username: string;
  // },
  body: QuestionAPI.QuestionItem,
  options?: {
    [key: string]: any;
  },
) {
  return request<QuestionAPI.ManagerQuestionItem>('/wxManagement/question/edit', {
    method: 'put',
    // params: {
    //   ...params,
    // },
    data: body,
    ...(options || {}),
  });
}

// 推送数据
export async function pushQuestion(
  params: {
    id: number | string;
  },
  options?: { [key: string]: any },
) {
  const { id } = params;
  return request<any>(`/operation/question/push/${id}`, {
    method: 'PUT',
    ...(options || {}),
  });
}

// 删除、无需优化
export async function deleteQuestion(
  body: {
    type?: number;
    id?: string;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<any>('/wxManagement/question/deal', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

// 查询条件包括知识点，状态、学科
export async function getSearchConfig() {
  return request<QuestionAPI.SearchConfig>('/operation/question/search');
}
