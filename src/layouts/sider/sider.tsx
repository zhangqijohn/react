import React from 'react';
import { Layout } from 'antd';
import logo from "@/assets/logo.png";
import Menu from '@/layouts/menu/menu';
import './sider.scss';

const Sider = Layout.Sider;

export interface SiderProps {
  collapsed: boolean;
}

export default function (props: SiderProps) {
  return (
    <Sider
        trigger={null}
        collapsible
        collapsed={ props.collapsed }
        className="q1-sider"
    >
      <div className="logo">
          <img src={logo} alt="冰川网络"/>
          <h1>冰川业务中台</h1>
      </div>
      <Menu theme="dark" mode="inline" />
    </Sider>
  )
}