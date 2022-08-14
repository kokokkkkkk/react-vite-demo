import React, { useEffect, useMemo, useState } from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { constantRoutes, asyncRoutes } from './pages';
import { RoutesPovider } from './utils/context';

import { generateRoutes } from './utils/permissionsRoute';
import { localGet, localSet } from '@/utils';

function Permission() {
  const [accessRoutes, setAccessRoutes] = useState([]);
  const [langCurrent, setLangCurrent] = useState(localGet('lang') || 'zh');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = localGet('token') || '';

  useEffect(() => {
    setAccessRoutes(generateRoutes(asyncRoutes, ['admin']));
  }, []);

  useEffect(() => {
    // 在登录流程中，当路由规则生成完成后，跳转到系统首页
    if (accessRoutes.length > 0 && pathname === '/login') {
      navigate('/dashboard', { repalce: true });
    }
  }, [accessRoutes]);

  useEffect(() => {
    // 没有Token，并且你尝试访问非/login页面时，跳转登录页
    if (pathname !== '/login' && !token) {
      navigate('/login', { repalce: true });
    }
    // 有token，访问/ 跳转到/dashboard
    if (pathname === '/' && token) {
      navigate('/dashboard', { repalce: true });
    }
    // 用户已有Token(已登录)，尝试访问登录页，跳转系统首页
    if (pathname === '/login' && token) {
      navigate('/dashboard', { repalce: true });
    }
  }, [pathname]);

  const onSetLange = (value) => {
    setLangCurrent(value);
  };

  const routes = useMemo(() => {
    const arr = [...constantRoutes];
    arr[0].children = accessRoutes;
    return arr;
  }, [accessRoutes]);
  const element = useRoutes(routes);
  return (
    <RoutesPovider routes={accessRoutes} onSetLange={onSetLange} langCurrent={langCurrent}>
      {element}
    </RoutesPovider>
  );
}

export default Permission;
