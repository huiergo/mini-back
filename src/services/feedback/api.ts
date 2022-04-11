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
  return request<FeedbackApi.FeedbackItem>('/api/getFeedback', {
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
