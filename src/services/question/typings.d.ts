declare namespace QuestionAPI {
  type QuestionItem = {
    id?: string;
    questionNo?: string;
    title?: string;
    answer?: string;
    tags?: string[]; //知识点
    likeCount?: number;
    views?: number;
    checkStatus?: number;
    owner?: string[]; //审核者
    updatedAt?: string;
    subjects?: string[]; //学科
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };
}
