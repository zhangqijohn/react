import React from 'react';

import configurableRoutes from './routes'

export interface RouteConfig {
  path: string,
  icon?: string,
  title: string | React.ReactNode,
  absPath: string,
  hidden: boolean,
  component: React.FunctionComponent | React.ComponentClass,
  routes?: Array<RouteConfig>,
}

export interface RouteFilterFn {
  (route: RouteConfig) : boolean,
}


function iterateRoutes(routes: RouteConfig[], cb: (currentRoute: RouteConfig, parentRoute?: RouteConfig) => void) {
  function _(route: RouteConfig, parentRoute?: RouteConfig) {
    cb(route, parentRoute);
    if (route.routes) {
      route.routes.forEach(function(childRoute) {
        _(childRoute, route);
      })
    }
  }
  routes.forEach(route => _(route));
}

const routes: RouteConfig[] = configurableRoutes as unknown as RouteConfig[];

iterateRoutes(routes, (currentRoute, parentRoute) => {
  currentRoute.absPath = parentRoute != null ?
  parentRoute.absPath.replace(/\/$/, '') + '/' + currentRoute.path
  : '/' + currentRoute.path.replace(/^\//, '');
  currentRoute.hidden = Boolean(currentRoute.hidden);
});

export function filterRoutes(filterFn: RouteFilterFn) {
  function _(routes: RouteConfig[]) {
    const rs = routes
      .map(x => ({...x})) // 浅复制
      .filter((route: RouteConfig) => {
        return filterFn(route);
      });
    rs.forEach(function(route) {
      if (route.routes) {
        route.routes = _(route.routes);
      }
    });
    return rs;
  }
  return _(routes);
}

export function flatRoutes(routes: RouteConfig[]) {
  const rs: RouteConfig[] = [];
  iterateRoutes(routes, (route) => rs.push(route));
  return rs;
}

export function toOpenKeys(path: string) {
  if (path === '/') {
    return ['/'];
  }
  const rs = [];
  const pathArr = path.replace(/\/$/, '').split('/');
  while (pathArr.length) {
    pathArr.pop();
    rs.unshift(pathArr.join('/'));
  }
  return rs;
}

export default routes;
