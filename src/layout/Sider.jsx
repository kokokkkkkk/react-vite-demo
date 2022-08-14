import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';

import { useMenu } from '@/hooks';
import React, { useContext } from 'react';
import { RoutesContext } from '../utils/context';
import {} from 'react-router-dom';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  };
}

function createItems(routes) {
  // eslint-disable-next-line array-callback-return
  const result = routes.map((ele) => {
    if (ele.path) {
      if (!ele.hidden) {
        return getItem(<Link to={ele.path}>{ele.label}</Link>, ele.key, ele.icon);
      }
    } else {
      return getItem(ele.label, ele.key, ele.icon, createItems(ele.children));
    }
  });
  return result;
}

const Sider = (props) => {
  const { collapsed } = props;
  const [selectedKey, openKey] = useMenu();
  const { routes } = useContext(RoutesContext);
  return (
    <div className="sider">
      <div className="log">
        <h1 style={{ color: '#fff', margin: '0', height: '60px', lineHeight: '60px' }}>
          <Link to="/dashboard">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              style={{ width: '28px', marginRight: '12px', marginLeft: collapsed ? '20px' : '' }}
            />
            <span style={{ display: collapsed ? 'none' : '' }}>Ant Design</span>
          </Link>
        </h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={[openKey]}
        items={createItems(routes)}
      />
    </div>
  );
};

export default React.memo(Sider);
