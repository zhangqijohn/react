import React from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { LogoutOutlined, HomeOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import "./index.css";
import logo from "@/assets/logo.png";

const { Header } = Layout;

class NavComponent extends React.Component<any, any> {
    menu = (
        <Menu className="q1-navbar-menu">
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    <HomeOutlined />主页
                </a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                    <LogoutOutlined/>退出
                </a>
            </Menu.Item>
        </Menu>
    );

    userName = '谭金宇';

    formatterUserName (value:string) {
        return value.substr(-2)
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header className="q1-top-header">
                        <Menu
                            className="q1-top-menu"
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                        >
                            <Menu.Item key="1">
                                云产品
                                <DownOutlined />
                            </Menu.Item>
                        </Menu>
                        <div className="q1-navbar">
                            <Dropdown overlay={ this.menu }>
                                <span className="q1-dropdown">
                                    <Avatar className="q1-avatar" size="small" icon={<UserOutlined />} />
                                    <strong>{ this.formatterUserName(this.userName) }</strong>
                                    <DownOutlined />
                                </span>
                            </Dropdown>
                        </div>
                    </Header>
                </Layout>
            </div>
        )
    }
}

export default NavComponent;