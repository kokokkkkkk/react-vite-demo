import { useEffect, useMemo, useState } from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { constantRoutes, asyncRoutes } from './pages';
import { RoutesPovider } from './utils/context';

import { generateRoutes } from './utils/permissionsRoute';
import { localGet } from '@/utils';

function Permission() {
  const [accessRoutes, setAccessRoutes] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setAccessRoutes(generateRoutes(asyncRoutes, ['admin']));
  }, []);
  useEffect(() => {
    if (pathname === '/' && localGet('token')) {
      navigate('/dashboard', { repalce: true });
    }
  }, [pathname]);

  const routes = useMemo(() => {
    console.log('memo');
    const arr = [...constantRoutes];
    arr[0].children = accessRoutes;
    return arr;
  }, [accessRoutes]);
  const element = useRoutes(routes);
  return <RoutesPovider routes={accessRoutes}>{element}</RoutesPovider>;
}

export default Permission;
