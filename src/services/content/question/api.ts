// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
export async function getOperationQuestionList(
  params: {
    current?: number;
    pageSize?: number;
    searchType?: number;
    subjectId?: string;
    keyword?: string;
    label?: string;
    optStatus?: string; //优化状态
    order?: string; //  likeCount,views,updatedAt 不传值，默认是updatedAt,倒序查询
    orderMethod?: string; //   值asc正序，desc倒序，不传值，默认是desc,(order字段传值才有效)
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
  body: QuestionAPI.QuestionItem,
  options?: {
    [key: string]: any;
  },
) {
  return request<QuestionAPI.ManagerQuestionItem>('/wxManagement/question/edit', {
    method: 'put',
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
