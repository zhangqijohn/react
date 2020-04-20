import React from 'react';
import page from '@/pages/NotImplement';
import NotFount from '@/pages/NotFount';
import {
  UserOutlined, HomeOutlined
} from '@ant-design/icons';

interface ConfigurableRoute {
  path: string,
  title: string | React.ReactNode,
  hidden?: boolean,
  component?: React.FunctionComponent | React.ComponentClass,
  routes?: Array<ConfigurableRoute>,
}

const configurableRoutes: ConfigurableRoute[] = [
  {
    path: "/",
    title: <><HomeOutlined></HomeOutlined><span>首页</span></>,
    component: page,
  },
  {
    path: "/login",
    title: <><HomeOutlined></HomeOutlined><span>登录</span></>,
    component: page,
    hidden: true,
  },
  {
    path: "/devops",
    title: <><UserOutlined /><span>DevOps</span></>,
    component: page,
  },
  {
    path: "/mine",
    title: <><UserOutlined /><span>我的告警</span></>,
    routes: [
      {
        path: "unhandle",
        title: "未处理",
        component: page,
      }
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
