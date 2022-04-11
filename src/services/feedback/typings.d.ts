declare namespace FeedbackApi {
  type aa = Partial<QuestionAPI.QuestionItem>;
  type FeedbackItem = aa & {
    feedTime?: string;
    feedCategory?: string;
    feedAdvice?: string;
    feedStatus?: boolean;
  };
  type PageParams = {
    current?: number;
    pageSize?: number;
  };
}
