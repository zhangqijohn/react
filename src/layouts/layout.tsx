import React from 'react'
import {Layout} from 'antd'
import FooterComponent from './footer/footer'
import Header from './header/header'
import Sider from './sider/sider'
import Content from './content/content'
import Tabs from './tabs/tab'
import './layout.scss'

class LayoutComponent extends React.Component<any, any> {
    render() {
        return (
            <div className="q1-container">
                <Layout>
                    <Sider />
                    <Layout className="q1-main">
                        <Header />
                        <Tabs />
                        <Content />
                        <FooterComponent />
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default LayoutComponent
