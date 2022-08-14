import loadable from '@loadable/component';
import {
  ShoppingOutlined,
  PlusOutlined,
  FileProtectOutlined,
  FolderOpenOutlined,
  PictureOutlined
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
const Layout = loadable(() => import('@/layout'));
const Login = loadable(() => import('@/pages/login'));
const Dashboard = loadable(() => import('@/pages/dashboard'));

const Experience = loadable(() => import('@/pages/content/experience'));

const Slideshow = loadable(() => import('@/pages/homeCofig/slideshow'));

const Good = loadable(() => import('@/pages/module/good'));
const GoodAdd = loadable(() => import('@/pages/module/goodAdd'));
const Order = loadable(() => import('@/pages/module/order'));
const OrderDetail = loadable(() => import('@/pages/module/orderDetail'));
// 有权限
export const asyncRoutes = [
  {
    key: 3,
    label: <FormattedMessage id="menu.dashboard" />,
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    key: 4,
    label: <FormattedMessage id="menu.homeCofig" />,
    children: [
      {
        key: 402,
        label: <FormattedMessage id="menu.slideshow" />,
        icon: <PictureOutlined />,
        path: '/homecofig/slideshow',
        element: <Slideshow />
      }
    ]
  },
  {
    key: 5,
    label: <FormattedMessage id="menu.content" />,
    roles: ['admin'],
    children: [
      {
        key: 502,
        label: <FormattedMessage id="menu.experience" />,
        icon: <FolderOpenOutlined />,
        path: '/content/experience',
        element: <Experience />
      }
    ]
  },
  {
    key: 6,
    label: <FormattedMessage id="menu.module" />,
    children: [
      {
        key: 602,
        label: <FormattedMessage id="menu.goodAdd" />,
        icon: <PlusOutlined />,
        path: '/module/goodadd',
        element: <GoodAdd />
      },
      {
        key: 603,
        label: <FormattedMessage id="menu.good" />,
        icon: <ShoppingOutlined />,
        path: '/module/good',
        element: <Good />
      },
      {
        key: 604,
        label: <FormattedMessage id="menu.order" />,
        icon: <FileProtectOutlined />,
        path: '/module/order',
        element: <Order />
      },
      {
        key: 605,
        hidden: true, // 不放在Menu上
        path: '/module/orderdetail/:id', // 动态路由
        element: <OrderDetail />
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
