import React from 'react';
import page from '@/pages/NotImplement';
import NotFount from '@/pages/NotFount';
import {
  UserOutlined, HomeOutlined
} from '@ant-design/icons';

interface ConfigurableRoute {
  path: string,
  icon?: string,
  title: string | React.ReactNode,
  hidden?: boolean,
  component?: React.FunctionComponent | React.ComponentClass,
  routes?: Array<ConfigurableRoute>,
}

const configurableRoutes: ConfigurableRoute[] = [
  {
    path: "/",
    icon: 'home',
    title: '首页',
    component: page,
  },
  {
    path: "/login/:id",
    title: '登录',
    component: page,
    hidden: true,
  },
  {
    path: "/devops",
    icon: 'user',
    title: 'DevOps',
    component: page,
  },
  {
    path: "/mine",
    icon: 'user',
    title: '我的告警',
    routes: [
      {
        path: "unhandle",
        icon: 'rule',
        title: "未处理",
        component: page,
      },
    ]
  },
  {
    path: '*',
    title: 'Not Found',
    component: NotFount,
    hidden: true,
  }
];

export default configurableRoutes;
