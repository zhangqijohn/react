import React, {useContext, useMemo} from 'react'
import {Layout} from 'antd'
import {RoutesContext} from '@/context'
import {Switch, Route} from 'react-router-dom'
import {flatRoutes} from '@/routes'
import NotFount from '@/pages/NotFount'
import './content.scss'

const Content = Layout.Content

export interface ContentProps {}
export default function (props: ContentProps) {
    const routes = useContext(RoutesContext)
    const Routes = useMemo(() => {
        return flatRoutes(routes).map(route => {
            return (
                <Route
                    path={route.absPath}
                    exact
                    render={() => {
                        if (route.component) {
                            return <route.component />
                        } else {
                            return <NotFount />
                        }
                    }}
                    key={route.absPath}
                />
            )
        })
    }, [routes])
    return (
        <Content className="site-layout-background">
            <Switch>{Routes}</Switch>
        </Content>
    )
}
