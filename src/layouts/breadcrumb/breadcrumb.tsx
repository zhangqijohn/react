import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { useRoutesMap, useRouteConfig } from '@/context';
import { RouteConfig } from '@/routes';
import './breadcrumb.scss'

export interface BreadcrumbProps {

}

export default function (props: BreadcrumbProps) {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const routesMap = useRoutesMap();
  const routeConfig = useRouteConfig();
  const extraBreadcrumbItems = pathSnippets.map((current, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const route: RouteConfig | undefined = routesMap.get(url);
    if (!route || !routeConfig) {
      return <></>;
    }
    return (
      <Breadcrumb.Item key={url}>
        {
          route.component == null || routeConfig.path === route?.path ? <span>{route!.title}</span>
            : <Link to={url}>{route.title}</Link>
        }
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">{ routesMap.get('/')!.title }</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb className="bread-crumb">{breadcrumbItems}</Breadcrumb>
  );
}