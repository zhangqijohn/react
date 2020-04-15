import React from "react";
import "./layout.css";
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    HomeOutlined, LogoutOutlined, DownOutlined
} from '@ant-design/icons';
import FooterComponent from "./footer";
import Sider from './sider'
import Content from './content'

const { Header } = Layout;

class LayoutComponent extends React.Component<any, any> {
    menu = (
        <Menu className="q1-dropdown__menu">
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.dev.q1op.com">
                    <HomeOutlined />主页
                </a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://auth-permit.dev.q1op.com">
                    <LogoutOutlined/>退出
                </a>
            </Menu.Item>
        </Menu>
    );

    userName = '谭金宇';

    formatterUserName (value:string) {
        return value.substr(-2)
    }

    state = {
        collapsed: true
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        return (
            <div className="q1-container">
                <Layout>
                    <Sider collapsed={this.state.collapsed} />
                    <Layout className="site-layout">
                        <Header className="q1-header" style={{ padding: 0 }}>
                            <div
                                className="q1-header__trigger"
                                onClick={ this.toggle }
                            >
                                { React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined) }
                            </div>
                            <div className="q1-dropdown">
                                <Dropdown overlay={ this.menu }>
                                    <div className="q1-dropdown__container">
                                        <Avatar className="q1-avatar" size="small" icon={<UserOutlined />} />
                                        <strong className="q1-username">{ this.formatterUserName(this.userName) }</strong>
                                        <DownOutlined />
                                    </div>
                                </Dropdown>
                            </div>
                        </Header>
                        <Content></Content>
                        <FooterComponent />
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default LayoutComponent