import React, { useCallback, useRef, useEffect, useState, useMemo, useLayoutEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory, useLocation } from 'react-router';
import { Tag, Space, Menu } from 'antd';
import { useRouteConfig } from '@/context'
import { RouteConfig } from '@/routes';
import {find, findIndex} from 'lodash'

interface TabsMenuProps {
  x: number;
  y: number;
  locationForTag: LocationType
  container: HTMLDivElement;
  onMenuClose?: React.EventHandler<any>;
  onCloseTag?: () => void;
  onCloseOtherTag?: () => void;
  onCloseAllTag?: () => void;
}

function TabsMenu(props: TabsMenuProps) {
    const focusRef = useRef<HTMLDivElement>(null)
    const realX = props.x - props.container.offsetLeft
    const realY = props.y - props.container.offsetTop
    useEffect(() => {
        focusRef.current!.focus()
    }, [])
    return (
        <div
            ref={focusRef}
            tabIndex={0}
            onBlur={props.onMenuClose}
            style={{
                outline: 'none',
                position: 'absolute',
                zIndex: 1,
                left: realX + 'px',
                top: realY + 'px',
            }}
        >
            <Menu selectedKeys={[]}>
                <Menu.Item onClick={props.onCloseTag}>关闭</Menu.Item>
                <Menu.Item onClick={props.onCloseOtherTag}>关闭其他</Menu.Item>
                <Menu.Item onClick={props.onCloseAllTag}>关闭所有</Menu.Item>
            </Menu>
        </div>
    )
}

interface TabsProps {
  blackList?: Array<string | RegExp>,
}

interface LocationType {
  pathname: string
  routeConfig: RouteConfig
}

export default function Tabs(props: TabsProps) {
    const scrollBarRef = useRef<Scrollbars>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [viewingMenu, setIsViewingMenu] = useState<{
        isViewing: boolean
        locationForTag?: LocationType
        x: number
        y: number
    }>({
        isViewing: false,
        locationForTag: undefined,
        x: 0,
        y: 0,
    })
    // locations: 一个标签页的元信息，根据pathname区分
    const [locations, setLocations] = useState<Array<LocationType>>([])
    const location = useLocation()
    const histroy = useHistory()
    const route = useRouteConfig()
    const blackList = props.blackList || ['/*']
    useEffect(() => {
        if (!route) {
            return
        }
        if (
            blackList.some(fn =>
                typeof fn === 'string' ? fn === route.absPath : fn.test(route.absPath),
            )
        ) {
            return
        }
        let tabLocation = find(locations, {
            pathname: location.pathname,
        })
        if (tabLocation == null) {
            setLocations([...locations, {pathname: location.pathname, routeConfig: route}])
        }
    }, [route, blackList, location, locations])
    useLayoutEffect(() => {
        // 校正滚动条位置。
        if (!route) {
            return
        }
        if (!scrollBarRef.current) {
            return
        }
        if (!containerRef.current) {
            return
        }
        const container = containerRef.current
        function isTagInsideView(tagNode: HTMLDivElement) {
            const tagOffsetLeft = tagNode.offsetLeft
            const tagoffsetRight = tagOffsetLeft + tagNode.offsetWidth
            const viewMinLeft = scrollBarRef.current!.getScrollLeft()
            const viewMaxLeft = viewMinLeft + container.offsetWidth
            return tagOffsetLeft >= viewMinLeft && tagoffsetRight <= viewMaxLeft
        }
        const tagNodes = container.children[0].querySelectorAll('.ant-space-item') as NodeListOf<
            HTMLDivElement
        >
        const tagIndex = findIndex(locations, {pathname: location.pathname})
        const tagNode = tagNodes[tagIndex]
        const prevTagNode = tagNodes[tagIndex - 1]
        const nextTagNode = tagNodes[tagIndex + 1]
        if (tagNode == null) {
            return
        }
        if (!isTagInsideView(tagNode)) {
            scrollBarRef.current!.scrollLeft(Math.max(tagNode.offsetLeft, 0))
        }
        if (prevTagNode && !isTagInsideView(prevTagNode)) {
            scrollBarRef.current!.scrollLeft(Math.max(prevTagNode.offsetLeft, 0))
        }
        if (nextTagNode && !isTagInsideView(nextTagNode)) {
            scrollBarRef.current!.scrollLeft(
                Math.max(
                    nextTagNode.offsetLeft - container.offsetWidth + nextTagNode.offsetWidth,
                    0,
                ),
            )
        }
    }, [route, locations, location.pathname])

    const handleScroll = useCallback((e: React.WheelEvent<Scrollbars>) => {
        const scrollLeft = scrollBarRef.current!.getScrollLeft()
        scrollBarRef.current!.scrollLeft(scrollLeft + (e.deltaY > 0 ? 30 : -30))
    }, [])
    const handleCloseMenu = useCallback(() => {
        setIsViewingMenu({
            x: 0,
            y: 0,
            locationForTag: undefined,
            isViewing: false,
        })
    }, [setIsViewingMenu])
    const handleCloseTab = useCallback(
        (locationForTag: LocationType) => {
            const index = locations.indexOf(locationForTag)
            if (index === -1) {
                return
            }
            const newLocations = [...locations]
            newLocations.splice(index, 1)
            setLocations(newLocations)
            handleCloseMenu()
            if (newLocations.length > 0) {
                if (locationForTag.pathname !== location.pathname) {
                    // 不是关闭当前标签，什么都不做
                    return
                }
                const nearestIndex = Math.min(Math.max(index - 1, 0), newLocations.length - 1)
                histroy.push(newLocations[nearestIndex].pathname)
            }
            if (newLocations.length === 0) {
                histroy.replace('/')
            }
        },
        [locations, handleCloseMenu, location.pathname, histroy],
    )
    const handleCloseOther = useCallback(
        (locationForTag: LocationType) => {
            const index = locations.indexOf(locationForTag)
            if (index === -1) {
                return
            }
            const newLocations = [locations[index]]
            setLocations(newLocations)
            histroy.replace(newLocations[0].pathname)
            handleCloseMenu()
        },
        [histroy, handleCloseMenu, locations],
    )
    const handleCloseAll = useCallback(() => {
        setLocations([])
        histroy.replace('/')
        handleCloseMenu()
    }, [histroy, handleCloseMenu])
    const handleTagClick = useCallback(
        (locationForTag: LocationType) => {
            histroy.push(locationForTag.pathname)
        },
        [histroy],
    )
    const handleOpenMenu = useCallback(
        (e: React.MouseEvent, locationForTag?: LocationType) => {
            e.preventDefault()
            setIsViewingMenu({
                x: e.clientX,
                y: e.clientY,
                locationForTag,
                isViewing: true,
            })
        },
        [setIsViewingMenu],
    )

    const TagItems = useMemo(() => {
        return locations.map((locationForTag, i) => {
            const routeForTag: RouteConfig | undefined = locationForTag.routeConfig
            return routeForTag ? (
                <Tag
                    key={locationForTag.pathname}
                    closable={locations.length === 1 ? false : true}
                    color={location.pathname === locationForTag.pathname ? '#1890ff' : undefined}
                    onClick={e => handleTagClick(locationForTag)}
                    onClose={(e: React.MouseEvent) => {
                        handleCloseTab(locationForTag)
                    }}
                    onContextMenu={e => handleOpenMenu(e, locationForTag)}
                    style={{
                        cursor: 'pointer',
                        padding: '5px 7px',
                        position: 'relative',
                    }}
                >
                    {routeForTag.title}
                </Tag>
            ) : null
        })
    }, [locations, location.pathname, handleTagClick, handleCloseTab, handleOpenMenu])
    return (
        <div ref={containerRef} style={{position: 'relative', margin: '5px'}}>
            <Scrollbars ref={scrollBarRef} autoHeight autoHide onWheel={handleScroll}>
                <Space size={2}>{TagItems}</Space>
            </Scrollbars>
            {viewingMenu.isViewing && containerRef.current ? (
                <TabsMenu
                    {...viewingMenu}
                    locationForTag={viewingMenu.locationForTag as LocationType}
                    container={containerRef.current}
                    onMenuClose={handleCloseMenu}
                    onCloseTag={() => handleCloseTab(viewingMenu.locationForTag as LocationType)}
                    onCloseOtherTag={() =>
                        handleCloseOther(viewingMenu.locationForTag as LocationType)
                    }
                    onCloseAllTag={handleCloseAll}
                ></TabsMenu>
            ) : null}
        </div>
    )
}
