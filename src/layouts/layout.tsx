import React from 'react'
import {Layout, ConfigProvider} from 'antd'
import FooterComponent from './footer/footer'
import Header from './header/header'
import Sider from './sider/sider'
import Content from './content/content'
import Tabs from './tabs/tab'
import './layout.scss'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh')

class LayoutComponent extends React.Component<any, any> {
    render() {
        return (
            <div className="q1-container">
                <ConfigProvider locale={zhCN}>
                    <Layout>
                        <Sider />
                        <Layout className="q1-main">
                            <Header />
                            <Tabs />
                            <Content />
                            <FooterComponent />
                        </Layout>
                    </Layout>
                </ConfigProvider>
            </div>
        )
    }
}

export default LayoutComponent
