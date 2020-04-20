import React, { useContext } from "react";
import { useMemo } from 'react';

import { Menu } from 'antd'
import { MenuProps } from "antd/lib/menu";
import { Link, useHistory, useLocation } from "react-router-dom";
import { RouteConfig } from '@/routes';
import { RoutesContext } from '@/context'
import SVGIcon from "@/components/SvgIcon";

const { Item, SubMenu } = Menu;

export interface RoutesMenuProps extends MenuProps {
  prepend?: React.ReactNode[],
}

export default function RoutesMenu (props: RoutesMenuProps) {
  const routes = useContext(RoutesContext);
  const history = useHistory();
  const location = useLocation();
  const routesMenuItems = useMemo(() => {
    function _transformRoutes(routes: RouteConfig[]) {
      return routes.filter(route => !route.hidden).map((route) => {
        const key = route.absPath;
        const titleNode = route.icon ? <><SVGIcon className="anticon" fill="white" name={route.icon}/><span>{route.title}</span></> : (
          typeof route.title === 'string' ? <span>{route.title}</span>
            : route.title
        );

        if (!route.routes || route.routes.length <= 0) {
          // 没有子路由
          return <Item key={key}><Link to={route.absPath}>{titleNode}</Link></Item>
        }
        return <SubMenu
          key={route.absPath}
          title={titleNode}
          onTitleClick={( {key, domEvent} ) => {
            if (route.component) {
              history.push(route.absPath);
            }
          }}>
          {_transformRoutes(route.routes)}
        </SubMenu>
      })
    }
    return _transformRoutes(routes);
  }, [ routes, history ]);
  props = Object.assign({
    mode: 'inline',
    theme: 'dark'
  }, props)
  return (
    <Menu {...props} selectedKeys={[location.pathname]}>
      { props.prepend || null }
      { routesMenuItems }
    </Menu>
  );
}
