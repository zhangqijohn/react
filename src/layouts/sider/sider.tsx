import React from 'react'
import {Layout} from 'antd'
import logo from '@/assets/logo.png'
import Menu from '@/layouts/menu/menu'
import './sider.scss'
import {StoreType} from '@/store'
import {inject, observer} from 'mobx-react'

export interface SiderProps {}

export interface MobxSiderProps extends SiderProps, Pick<StoreType, 'UIState' | 'Setting'> {}

export default inject(
    'UIState',
    'Setting',
)(
    observer(function Sider(props: SiderProps) {
        const {UIState, Setting} = props as MobxSiderProps
        return (
            <Layout.Sider
                trigger={null}
                collapsible
                collapsed={UIState.menuCollapsed}
                className="q1-sider"
            >
                <div className="logo">
                    <img src={logo} alt="冰川网络" />
                    <h1>{Setting.appName}</h1>
                </div>
                <Menu theme="dark" mode="inline" />
            </Layout.Sider>
        )
    }),
)
