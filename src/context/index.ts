import React, { useContext, useMemo } from 'react'
import { RouteConfig, flatRoutes } from '@/routes/index'
import { useLocation } from 'react-router';
import { matchPath } from "react-router";

export const RoutesContext = React.createContext<RouteConfig[]>([]);

export function useRoutesMap(): Map<string, RouteConfig> {
  const routes = useContext(RoutesContext);
  return useMemo(() => (flatRoutes(routes).reduce((map, route) => {
      map.set(route.absPath, route);
      return map;
    }, new Map())
  ), [ routes ]);
}

export function useRouteConfig() {
  const routesMap = useRoutesMap();
  const { pathname } = useLocation();
  const route = useMemo(() => {
    return Array.from(routesMap.values()).find((route: RouteConfig) => {
      return matchPath(pathname, {
        path: route.absPath,
        exact: true,
        strict: false,
      })?.isExact;
    })
  }, [ routesMap, pathname ]);
  return route;
}
