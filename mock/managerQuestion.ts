import { Request, Response } from 'express';

const getManagerQuestion = (req: Request, res: Response) => {
  res.json({
    data: [
      {
        id: '150000200304067001',
        questionNo: '120000200807197048',
        questionId: '220000201011211316',
        label: '办门快办维准确',
        likeCount: 41,
        views: 7,
        updatedAt: '2007-06-28 22:55:20',
        updator: '七记技界道指',
        stem: '劳情走越',
        state: '0',
        stateValue: 'culpa',
        feedback: {
          feedbackInfo: ['外', '再', '消', '市'],
          type: '龙色实么格行义转无例战交能道商还音。约上府青我济按准京开重总研运总下。对克改流任声传很真用再图党运易。基其知论层化则位水很商即。影更没提当除专根公历调南。',
        },
      },
      {
        id: '440000197504223560',
        questionNo: '620000201610163285',
        questionId: '50000019980129247X',
        label: '叫龙者须部',
        likeCount: 64,
        views: 19,
        updatedAt: '2016-07-30 10:17:28',
        updator: '三阶支',
        stem: '提采党局细战',
        state: '0',
        stateValue: 'ex',
        feedback: {
          feedbackInfo: ['还', '身'],
          type: '分过劳维验少然料前要组识亲说水斗。状那界年听对天变再每与面质斯中方红。理它命技他下华解程适标圆还采。',
        },
      },
    ],
  });
};

export default {
  'GET /dddwxManagement/question/list': getManagerQuestion,
};
