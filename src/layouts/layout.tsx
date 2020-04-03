import React from "react";
import "./layout.css";
import { Layout, Menu, Alert, Dropdown, Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined, HomeOutlined, LogoutOutlined, DownOutlined
} from '@ant-design/icons';
import logo from "../assets/logo.png";
import FooterComponent from "./footer";
import GameComponent from "../pages/game";

const { Header, Sider, Content } = Layout;

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
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logo">
                            <img src={logo} alt="冰川网络"/>
                            <h1>冰川业务中台</h1>
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1">
                                <UserOutlined />
                                <span>DevOps</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <VideoCameraOutlined />
                                <span>自动化运维</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <UploadOutlined />
                                <span>手游活动</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
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
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280
                            }}
                        >
                            <Alert message="开发中..." type="warning" />
                            <GameComponent/>
                        </Content>
                        <FooterComponent />
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default LayoutComponent