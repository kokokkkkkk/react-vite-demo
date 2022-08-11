import loadable from "@loadable/component"
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const Layout = loadable(() => import('@/layout'))
const Dashboard = loadable(() => import('@/pages/dashboard'))

const Experience = loadable(() => import('@/pages/content/experience'))

const Slideshow = loadable(() => import('@/pages/HomeCofig/slideshow'))
// 有权限

export const asyncRoutes = [
  {
    key: 2,
    label: '工作台',
    icon: <UserOutlined />,
    path: '/dashboard',
    element: <Dashboard />
  }
  ,
  {
    key: 3,
    label: '首页配置',
    children: [
      {
        key: 302,
        label: '轮播图配置',
        icon: <UserOutlined />,
        path: '/homecofig/slideshow',
        element: <Slideshow />,
      }
    ]
  },
  {
    key: 4,
    label: '内容管理',
    roles: ['admin'],
    children: [
      {
        key: 402,
        label: '经验管理',
        icon: <UserOutlined />,
        path: '/content/experience',
        element: <Experience />,
      }
    ],
  },
  {
    path: '*',
    hidden: true,  // 不放在Menu上
    element: <h1>页面走丢了！！</h1>,
  }
]

// 无权限
export const constantRoutes = [
   {
    key: 1,
    path: '/',
    element: <Layout />,
    children: []  // 权限待实现
  },
]