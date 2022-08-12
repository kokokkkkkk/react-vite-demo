import loadable from '@loadable/component';
import { UserOutlined } from '@ant-design/icons';
import { element } from 'prop-types';
const Layout = loadable(() => import('@/layout'));
const Login = loadable(() => import('@/pages/login'));
const Dashboard = loadable(() => import('@/pages/dashboard'));

const Experience = loadable(() => import('@/pages/content/experience'));

const Slideshow = loadable(() => import('@/pages/homeCofig/slideshow'));

const Good = loadable(() => import('@/pages/module/good'));
const GoodAdd = loadable(() => import('@/pages/module/goodAdd'));

// 有权限
export const asyncRoutes = [
  {
    key: 3,
    label: '工作台',
    icon: <UserOutlined />,
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    key: 4,
    label: '首页配置',
    children: [
      {
        key: 402,
        label: '轮播图配置',
        icon: <UserOutlined />,
        path: '/homecofig/slideshow',
        element: <Slideshow />
      }
    ]
  },
  {
    key: 5,
    label: '内容管理',
    roles: ['admin'],
    children: [
      {
        key: 502,
        label: '经验管理',
        icon: <UserOutlined />,
        path: '/content/experience',
        element: <Experience />
      }
    ]
  },
  {
    key: 6,
    label: '模块管理',
    children: [
      {
        key: 602,
        label: '商品管理',
        icon: <UserOutlined />,
        path: '/module/good',
        element: <Good />
      },
      {
        key: 603,
        label: '添加商品',
        icon: <UserOutlined />,
        path: '/module/goodadd',
        element: <GoodAdd />
      }
    ]
  },
  {
    path: '*',
    hidden: true, // 不放在Menu上
    element: <h1>页面走丢了！！</h1>
  }
];

// 无权限
export const constantRoutes = [
  {
    key: 1,
    path: '/',
    element: <Layout />,
    children: [] // 权限待实现
  },
  {
    key: 2,
    path: '/login',
    element: <Login />
  }
];
