// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function getFeedback(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<FeedbackApi.FeedbackItem>('/operation/question/feedback', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// 反馈-去处理: 将反馈信息从“未受理~~~~”修改成“已完成”
export async function dealFeedback(
  params: {
    id?: string;
  },

  options?: {
    [key: string]: any;
  },
) {
  return request<any>(`/operation/question/feedback/${params.id}`, {
    method: 'PUT',
    ...(options || {}),
  });
}
