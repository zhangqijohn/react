import './index.css'
import React, { useContext, useMemo } from 'react'
import { Breadcrumb } from 'antd'
import { useLocation, Link } from 'react-router-dom'
import { RoutesContext } from '@/context'
import { flatRoutes, RouteConfig } from '@/routes'
import { keyBy } from 'lodash'

export interface BreadcrumbProps {

}

export default function (props: BreadcrumbProps) {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const routes = useContext(RoutesContext);
  const routeMap = useMemo(() => {
    return keyBy(flatRoutes(routes), 'absPath');
  }, [ routes ]);
  const extraBreadcrumbItems = pathSnippets.map((current, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const route: RouteConfig = routeMap[url];
    return (
      <Breadcrumb.Item key={url}>
        {
          route?.component ? <Link to={url}>{current}</Link>
            : <span style={{cursor: 'not-allowed'}}>{current}</span>
        }
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb className="bread-crumb">{breadcrumbItems}</Breadcrumb>
  );
}