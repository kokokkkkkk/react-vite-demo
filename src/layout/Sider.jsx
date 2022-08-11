import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import {useMenu} from '@/hooks'
import { useContext } from 'react';
import { RoutesContext } from '../utils/context';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function createItems (routes) {
  const result = routes.map(ele => {
    if (ele.path) {
      if (!ele.hidden) {
        return getItem(
          <Link to={ele.path}>{ ele.label }</Link>
          , ele.key, ele.icon
        )
      }
    } else {
      console.log(1111);
      return getItem(
        ele.label,
        ele.key, ele.icon, createItems(ele.children))
    }
  })
  return result
};

const Sider = (props) => {
  const [selectedKey, openKey] = useMenu()
  const routes = useContext(RoutesContext)
  return (
    <div className="sider">
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={[openKey]}
        items={createItems(routes)}
      />
    </div>
  )
}

export default React.memo(Sider)
