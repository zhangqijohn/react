import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import Layout from '@/layouts/layout';
import { RoutesContext } from '@/context';

import routes, {RouteConfig, filterRoutes } from '@/routes'

function useRoutes() {
    const [ appRoutes, set ] = useState<RouteConfig[]>(routes);
    useEffect(() => {
        set(filterRoutes((route) => {
            return true;
        }))
    }, []);
    return appRoutes;
}

function App() {
    // todo: filter the routes.
    const appRoutes = useRoutes();
    return (
        <RoutesContext.Provider value={appRoutes}>
            <Router>
                <Layout/>
                {/* <Route path="*" component={NotFound}></Route> */}
            </Router>
        </RoutesContext.Provider>
    );
}

export default App;
