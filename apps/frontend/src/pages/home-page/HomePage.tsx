import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  BookOutlined as NoteIcon,
  CheckCircleTwoTone as DaySummaryIcon,
  DeleteOutlined as TrashIcon,
  MenuFoldOutlined as MenuFoldOutlinedIcon,
  MenuUnfoldOutlined as MenuUnfoldOutlinedIcon,
  UserOutlined as UserPickIcon,
} from '@ant-design/icons'
import { Button, Layout, Menu } from 'antd'
import { PATHS } from '@/app/routes/router'
import { MENU_ITEMS_LABEL } from './constants'
import './HomePage.scss'

const { Sider, Content } = Layout

const HomePage = () => {
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="home-page">
      <Layout className="layout">
        <Sider theme="light" trigger={null} width={320} collapsible collapsed={collapsed}>
          <div className="layout-collapsed">
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlinedIcon style={{ fontSize: '24px' }} />
                ) : (
                  <MenuFoldOutlinedIcon style={{ fontSize: '24px' }} />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
            />
            {!collapsed && (
              <Link to={PATHS.profile}>
                <UserPickIcon style={{ fontSize: '24px', cursor: 'pointer' }} />
              </Link>
            )}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            className="layout-menu"
            items={[
              {
                key: PATHS.notes,
                className: 'layout-menu-item',
                icon: <NoteIcon style={{ fontSize: '16px', color: '#fa8c16' }} />,
                label: <Link to={PATHS.notes}>{MENU_ITEMS_LABEL.notes}</Link>,
              },
              {
                key: PATHS.daySummary,
                className: 'layout-menu-item',
                icon: <DaySummaryIcon twoToneColor="#a0d911" style={{ fontSize: '16px' }} />,
                label: <Link to={PATHS.daySummary}>{MENU_ITEMS_LABEL.daySummary}</Link>,
              },
              {
                key: PATHS.trash,
                className: 'layout-menu-item',
                icon: <TrashIcon style={{ fontSize: '16px', color: '#f5222d' }} />,
                label: <Link to={PATHS.trash}>{MENU_ITEMS_LABEL.trash}</Link>,
              },
            ]}
          />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </div>
  )
}

export default HomePage
