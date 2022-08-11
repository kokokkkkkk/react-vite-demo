import { useState } from 'react'

import { Layout } from 'antd'

import MyHeader from './Header'
import MyContent from './Content'
import MySider from './Sider'

import './styles.less'

const { Header, Sider, Content } = Layout

const MyLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <MySider />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0
          }}
        >
          <MyHeader
            collapsed={collapsed}
            onCollapsed={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          <MyContent />
        </Content>
      </Layout>
    </Layout>
  )
}
export default MyLayout
