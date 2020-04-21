import React from 'react';
import page from '@/pages/NotImplement';
import NotFount from '@/pages/NotFount';
import Q1Tabel from '@/pages/Q1Tabel';
import IconHandle from '@/pages/Icon/IconHandle';
import {CalendarOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons';
import SvgIcon from '@/components/SvgIcon';

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
        path: "/q1-tabel",
        title: <><CalendarOutlined/><span>Q1Tabel表格</span></>,
        component: Q1Tabel,
    },
  {
    path: "/router",
    title: <><SvgIcon name='app' size='14'/><span>路由</span></>,
    component: Q1Tabel,
  },
    {
        path: "/icon",
        title: <><CalendarOutlined/><span>ICON</span></>,
        routes: [
            {
                path: "/icon",
                title: <><CalendarOutlined/><span>自定义ICON</span></>,
                component: IconHandle,
            },{
                path: "/icon/:id",
                title: <><CalendarOutlined/><span>ICON详情</span></>,
                // hidden:true,
                component: IconHandle,
            },
        ],
    },
    {
        path: "/mine",
        title: <><UserOutlined/><span>我的告警</span></>,
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
