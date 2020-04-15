import React from 'react';
import page from '@/pages/NotImplement';
import NotFount from '@/pages/NotFount';
import {
  UserOutlined, HomeOutlined, VideoCameraOutlined, UploadOutlined
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
    title: <><HomeOutlined></HomeOutlined><span>主页</span></>,
    component: page,
  },
  {
    path: "/login",
    title: <><HomeOutlined></HomeOutlined><span>主页</span></>,
    component: page,
    hidden: true,
  },
  {
    path: "/devops",
    title: <><UserOutlined /><span>DevOps</span></>,
    component: page,
  },
  {
    path: "/auto",
    title: <><VideoCameraOutlined /><span>自动化运维</span></>,
    component: page,
  },
  {
    path: "/syhd",
    title: <><UploadOutlined /><span>手游活动</span></>,
    component: page,
  },
  {
    path: "/example",
    title: "a",
    routes: [
      {
        path: "abc",
        title: "abc",
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
