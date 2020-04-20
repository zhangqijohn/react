import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { useRoutesMap, useRouteConfig } from '@/context';
import { RouteConfig } from '@/routes';
import './breadcrumb.scss'

export interface BreadcrumbProps {

}

export interface BreadcrumbPropsPathType {
  path: string,
  route: RouteConfig | null;
  component: React.FunctionComponent | React.ComponentClass | null;
}

export default function (props: BreadcrumbProps) {
  const location = useLocation();
  const routesMap = useRoutesMap();
  const routeConfig = useRouteConfig();
  const paths: BreadcrumbPropsPathType[] = [ { path: location.pathname, component: null, route: routeConfig || null } ];
  if (!routeConfig) {
    return null;
  }
  let parentRoute = routeConfig.parent;
  while (parentRoute != null) {
    paths.unshift({ path: parentRoute.absPath, component: parentRoute.component, route: parentRoute } );
    parentRoute = parentRoute.parent;
  }
  if (paths[0].path !== '/') {
    const homeRoute = routesMap.get('/');
    paths.unshift(
      { path: '/', component: homeRoute?.component || null, route: homeRoute || null }
    );
  }
  const breadcrumbItems = paths.map(({ path, component, route }, index) => {
    return (
      <Breadcrumb.Item key={path}>
        {
          component == null  ? <span>{route!.title}</span>
            : <Link to={path}>{route!.title}</Link>
        }
      </Breadcrumb.Item>
    );
  });
  return (
    <Breadcrumb className="bread-crumb">{breadcrumbItems}</Breadcrumb>
  );
}