import React, {useMemo} from 'react'
import {Layout, Dropdown, Avatar, Menu} from 'antd'
import {observer, inject} from 'mobx-react'
import {StoreType} from '@/store/'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    DownOutlined,
    LogoutOutlined,
    HomeOutlined,
} from '@ant-design/icons'
import BreadCrumb from '@/layouts/breadcrumb/breadcrumb'
import './header.scss'

function UserDropdownMenu() {
    return (
        <Menu className="q1-dropdown__menu" selectedKeys={[]}>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.dev.q1op.com">
                    <HomeOutlined />
                    主页
                </a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://auth-permit.dev.q1op.com">
                    <LogoutOutlined />
                    退出
                </a>
            </Menu.Item>
        </Menu>
    )
}

interface HeaderProps {}
interface MobxHeaderProps extends HeaderProps, Pick<StoreType, 'UIState' | 'User'> {}
export default inject(
    'UIState',
    'User',
)(
    observer(function Header(props: HeaderProps) {
        const mboxProps = props as MobxHeaderProps
        const {UIState, User} = mboxProps
        const DropdownMenu = useMemo(() => <UserDropdownMenu />, [])

        function formatterUserName(value: string) {
            return value.substr(-2)
        }

        return (
            <Layout.Header className="q1-header" style={{padding: 0}}>
                <div className="q1-header__trigger" onClick={UIState.toggleMenuCollapsed}>
                    {UIState.menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </div>
                <BreadCrumb />
                <div className="q1-dropdown">
                    <Dropdown overlay={DropdownMenu}>
                        <div className="q1-dropdown__container">
                            <Avatar className="q1-avatar" size="small" icon={<UserOutlined />} />
                            <strong className="q1-username">{formatterUserName(User.name)}</strong>
                            <DownOutlined />
                        </div>
                    </Dropdown>
                </div>
            </Layout.Header>
        )
    }),
)
