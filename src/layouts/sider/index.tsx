import React from 'react';
import { Layout } from 'antd';
import logo from "@/assets/logo.png";
import Menu from '@/layouts/menu';

const Sider = Layout.Sider;
export interface SiderProps {
  collapsed: boolean;
}
export default function (props: SiderProps) {
  return (
    <Sider trigger={null} collapsible collapsed={ props.collapsed }>
      <div className="logo">
          <img src={logo} alt="冰川网络"/>
          <h1>冰川业务中台</h1>
      </div>
      <Menu theme="dark" mode="inline"></Menu>
      {/* <Menu>
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
      </Menu> */}
    </Sider>
  )
}