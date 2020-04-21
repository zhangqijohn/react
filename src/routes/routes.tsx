import React from 'react';
import page from '@/pages/NotImplement';
import NotFount from '@/pages/NotFount';
import Q1Table from '@/pages/Q1Table';
import IconHandle from '@/pages/Icon/IconHandle';
import Q1Form from '@/pages/Q1Form';

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
    path: "/icon",
    icon: 'config',
    title: '图标',
    routes: [
      {
        path: "handle",
        icon: 'rule',
        title: "自定义图标",
        component: IconHandle,
      },
    ]
  },
  {
    path: "/q1-tabel",
    icon: 'app',
    title: '表格',
    component: Q1Table,
  },
  {
    path: "/q1-form",
    icon: 'app',
    title: '表单',
    component: Q1Form,
  },

  {
    path: '*',
    title: 'Not Found',
    component: NotFount,
    hidden: true,
  }
];

export default configurableRoutes;
