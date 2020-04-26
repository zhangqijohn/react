import React from 'react'
import page from '@/pages/NotImplement'
import NotFount from '@/pages/NotFount'
import Q1Table from '@/pages/Q1Table'
import IconHandle from '@/pages/Icon/IconHandle'
import Q1Form from '@/pages/Q1Form'
import Interval from '@/pages/G2/Interval'
import Gallery from '@/pages/G2/Gallery'
import Test from '@/pages/test'

interface ConfigurableRoute {
    path: string
    icon?: string
    title: string | React.ReactNode
    hidden?: boolean
    component?: React.FunctionComponent | React.ComponentClass
    routes?: Array<ConfigurableRoute>
}

const configurableRoutes: ConfigurableRoute[] = [
    {
        path: '/',
        icon: 'home',
        title: '首页',
        component: page,
    },
    {
        path: '/login/:id',
        title: '登录',
        component: page,
        hidden: true,
    },
    {
        path: '/icon',
        icon: 'config',
        title: '图标',
        routes: [
            {
                path: 'handle',
                icon: 'rule',
                title: '自定义图标',
                component: IconHandle,
            },
        ],
    },
    {
        path: '/q1-tabel',
        icon: 'app',
        title: '表格',
        component: Q1Table,
    },
    {
        path: '/q1-form',
        icon: 'app',
        title: '表单',
        component: Q1Form,
    },
    {
        path: '/g2',
        icon: 'app',
        title: '图表',
        routes: [
            {
                path: 'interval',
                icon: 'rule',
                title: '柱状图',
                component: Interval,
            },
            {
                path: 'gallery',
                icon: 'rule',
                title: '折线图',
                component: Gallery,
            },
        ],
    },
    {
        path: '/test/',
        icon: 'app',
        title: '测试使用',
        component: Test,
    },
    {
        path: '*',
        title: 'Not Found',
        component: NotFount,
        hidden: true,
    },
]

export default configurableRoutes
