import React, { useCallback, useRef, useEffect, useState, useMemo, useLayoutEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router';
import { Tag, Space, Menu } from 'antd';
import { useRoutesMap, useRouteConfig } from '@/context';
import { RouteConfig } from '@/routes';

interface TabsMenuProps {
  x: number;
  y: number;
  tag: string;
  container: HTMLDivElement;
  onMenuClose?: React.EventHandler<any>;
  onCloseTag?: () => void;
  onCloseOtherTag?: () => void;
  onCloseAllTag?: () => void;
}

function TabsMenu(props: TabsMenuProps) {
  const focusRef = useRef<HTMLDivElement>(null);
  const realX = props.x - props.container.offsetLeft;
  const realY = props.y - props.container.offsetTop;
  useEffect(() => {
    focusRef.current!.focus();
  }, []);
  return (
    <div
        ref={ focusRef }
        tabIndex={ 0 }
        onBlur={ props.onMenuClose}
        style={{ outline: 'none', position: 'absolute', zIndex: 1, left: realX + 'px', top: realY + 'px', } }
    >
      <Menu selectedKeys={[]}>
        <Menu.Item onClick={props.onCloseTag}>关闭</Menu.Item>
        <Menu.Item onClick={props.onCloseOtherTag}>关闭其他</Menu.Item>
        <Menu.Item onClick={props.onCloseAllTag}>关闭所有</Menu.Item>
      </Menu>
    </div>
  );
}

interface TabsProps {
  blackList?: Array<string | RegExp>,
}

export default function Tabs (props: TabsProps) {
  const scrollBarRef = useRef<Scrollbars>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ viewingMenu, setIsViewingMenu ] = useState<{
    isViewing: boolean,
    tag?: string,
    x: number,
    y: number,
  }>({
    isViewing: false,
    tag: undefined,
    x: 0,
    y: 0,
  });
  const [ tabs, setTabs ] = useState<Array<string>>([]);
  const routesMap = useRoutesMap();
  const history = useHistory();
  const route = useRouteConfig();
  const blackList = props.blackList || ['/*'];
  useEffect(() => {
    if (!route) {
      return;
    }
    if (
      blackList.some(fn => (
        typeof fn === 'string' ? fn === route.absPath :  fn.test(route.absPath)
      ))
    ) {
      return;
    }
    if (!tabs.includes(route.absPath)) {
      setTabs([ ...tabs, route.absPath ]);
    }
  }, [ route, tabs, blackList ]);
  useLayoutEffect(() => {
    // 校正滚动条位置
    if (!route) {
      return;
    }
    if (!scrollBarRef.current) {
      return;
    }
    if (!containerRef.current) {
      return;
    }
    const container = containerRef.current;
    function isTagInsideView(tagNode: HTMLDivElement) {
      const tagOffsetLeft = tagNode.offsetLeft
      const tagoffsetRight = tagOffsetLeft + tagNode.offsetWidth
      const viewMinLeft = scrollBarRef.current!.getScrollLeft()
      const viewMaxLeft = viewMinLeft + container.offsetWidth
      return tagOffsetLeft >= viewMinLeft && tagoffsetRight <= viewMaxLeft
    }
    const tagNodes = container.children[0].querySelectorAll('.ant-space-item') as NodeListOf<HTMLDivElement>;
    const tagIndex = tabs.indexOf(route.absPath);
    const tagNode = tagNodes[tagIndex];
    const prevTagNode = tagNodes[tagIndex-1];
    const nextTagNode = tagNodes[tagIndex+1];
    if (tagNode == null) {
      return;
    }
    if (!isTagInsideView(tagNode)) {
      scrollBarRef.current!.scrollLeft(Math.max(tagNode.offsetLeft, 0));
    }
    if (prevTagNode && !isTagInsideView(prevTagNode)) {
      scrollBarRef.current!.scrollLeft(Math.max(prevTagNode.offsetLeft, 0));
    }
    if (nextTagNode && !isTagInsideView(nextTagNode)) {
      scrollBarRef.current!.scrollLeft(Math.max(
        nextTagNode.offsetLeft - container.offsetWidth + nextTagNode.offsetWidth,
        0
      ));
    }
  }, [ tabs, route ])

  const handleScroll = useCallback((e: React.WheelEvent<Scrollbars>) => {
    const scrollLeft = scrollBarRef.current!.getScrollLeft();
    scrollBarRef.current!.scrollLeft(scrollLeft + ((e.deltaY > 0) ? 30 : -30));
  }, []);
  const handleCloseMenu = useCallback(() => {
    setIsViewingMenu({
      x: 0,
      y: 0,
      tag: undefined,
      isViewing: false,
    })
  }, [ setIsViewingMenu ])
  const handleCloseTab = useCallback((tag: string) => {
    const index = tabs.indexOf(tag);
    if (index === -1) {
      return;
    }
    const newTags = [ ...tabs ];
    newTags.splice(index, 1);
    setTabs(newTags);
    handleCloseMenu();
    if (newTags.length > 0) {
      if (tag !== route?.absPath) {
        return;
      }
      const nearestIndex = Math.min(
        Math.max(index - 1, 0),
        newTags.length - 1
      );
      history.push(newTags[nearestIndex]);
    }
    if (newTags.length === 0) {
      history.replace('/')
    }
  }, [ tabs, history, handleCloseMenu, route ]);
  const handleCloseOther = useCallback((tag: string) => {
    const index = tabs.indexOf(tag);
    if (index === -1) {
      return;
    }
    const newTabs = [tabs[index]];
    setTabs(newTabs);
    history.replace(newTabs[0]);
    handleCloseMenu();
  }, [ tabs, history, handleCloseMenu ])
  const handleCloseAll = useCallback(() => {
    setTabs([])
    history.replace('/');
    handleCloseMenu();
  }, [ history, handleCloseMenu ])
  const handleTagClick = useCallback((tag: string) => {
    history.push(tag);
  }, [ history ]);
  const handleOpenMenu = useCallback((e: React.MouseEvent, tag?: string) => {
    e.preventDefault();
    setIsViewingMenu({
      x: e.clientX,
      y: e.clientY,
      tag,
      isViewing: true,
    })
  }, [ setIsViewingMenu ]);
  
  const TagItems = useMemo(() => {
    return Array.from(tabs).map(tag => {
      const routeForTag: RouteConfig | undefined = routesMap.get(tag);
      return routeForTag ? (
        <Tag
          key={tag}
          closable={ !(tabs.length === 1 && routeForTag.absPath === '/') }
          color={ route?.absPath === routeForTag.absPath ? "#1890ff" : undefined}
          onClick={e => handleTagClick(tag)}
          onClose={(e: React.MouseEvent) => {
            handleCloseTab(tag);
          }}
          onContextMenu={(e) => handleOpenMenu(e, tag)}
          style={{
            cursor: 'pointer',
            padding: '5px 7px',
            position: 'relative',
          }}
        >
          {routeForTag.title}
        </Tag>
      ) : null;
    });
    
  }, [ tabs, routesMap, handleCloseTab, handleTagClick, route, handleOpenMenu ]);
  return (
    <div ref={containerRef} style={{ position: 'relative', margin: '5px' }}>
      <Scrollbars ref={scrollBarRef} autoHeight autoHide onWheel={handleScroll}>
        <Space size={2}>
          {TagItems}
        </Space>
      </Scrollbars>
       { viewingMenu.isViewing && containerRef.current ?
          <TabsMenu
            {...viewingMenu}
            tag={viewingMenu.tag as string}
            container={containerRef.current}
            onMenuClose={handleCloseMenu}
            onCloseTag={() => handleCloseTab(viewingMenu.tag as string)}
            onCloseOtherTag={() => handleCloseOther(viewingMenu.tag as string)}
            onCloseAllTag={handleCloseAll}
          />
          : null }
    </div>
  );
}