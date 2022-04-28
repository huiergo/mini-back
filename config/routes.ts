export default [
  {
    path: '/content',
    name: 'content',
    icon: 'crown',
    access: 'canAdmin', // todo
    routes: [
      {
        path: '/content/question',
        name: 'question',
        icon: 'smile',
        component: './content/Question',
      },
      {
        path: '/content/interview',
        name: 'interview',
        icon: 'smile',
        component: './content/Interview',
      },
    ],
  },
  {
    name: 'feedback',
    icon: 'GithubOutlined',
    path: '/feedback',
    component: './Feedback',
  },
  {
    path: '/',
    redirect: '/content/question',
  },
  {
    path: '/403',
    component: './403',
  },
  // {
  //   name: 'questionBank',
  //   icon: 'GithubOutlined',
  //   path: '/questionBank',
  //   component: './QuestionBank',
  // },
  // {
  //   path: '/user',
  //   layout: false,
  //   routes: [
  //     {
  //       path: '/user',
  //       routes: [
  //         {
  //           name: 'login',
  //           path: '/user/login',
  //           component: './user/Login',
  //         },
  //       ],
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
];
