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
];
