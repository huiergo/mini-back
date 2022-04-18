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
    subject?: string;
    stem?: string;
    label?: string;
  };

  type ManagerQuestionItem = {
    id?: string; //主键id
    questionNo?: string; //试题编号
    questionId?: string; //试题id
    label?: string; // 知识点
    likeCount?: number;
    views?: number;
    updatedAt?: string; //最后修改时间
    updator?: string; // 优化人,多个逗号分割
    stem?: string; // 题目title
    answer?: string; // 答案
    difficulty?: number; // 难度星级
    state?: number; //处理状态代码：0待优化1已优化
    stateValue?: string; //处理状态值0待优化1已优化
    feedback?: {
      feedbackInfo?: string[]; //反馈信息集合
      type?: string; // 反馈类型信息
    };
  };
}
