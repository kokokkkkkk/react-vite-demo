import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { asyncRoutes } from '@/pages';

// 通过useLocation访问当前url，根据url，在routes路由信息中遍历找到对应的key及其父级的key
export function useMenu() {
  const { pathname } = useLocation();
  return useMemo(() => {
    let selectedKey = '';
    let openKey = '';
    // 用两层for写，更方便地退出循环
    asyncRoutes.forEach((ele) => {
      if (!ele.children) {
        if (ele.path === pathname) {
          selectedKey = ele.key;
        }
      }
      if (ele.children) {
        ele.children.forEach((ele2) => {
          // console.log('---ele2')
          if (ele2.path === pathname) {
            selectedKey = ele2.key;
            openKey = ele.key;
            // console.log('---ele2')
          }
        });
      }
    });
    // 坑：Menu高亮要求用 string[] 进行控制
    return [selectedKey + '', openKey + ''];
  }, [pathname]);
}

// 计算面包屑显示
export function useBreadcrumb() {
  const arr = [...asyncRoutes];
  const { pathname } = useLocation();
  let result = [arr[0]]; // 把首页添加面包屑中
  // 找二级菜单
  if (pathname !== '/dashboard') {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].children) {
        for (let j = 0; j < arr[i].children.length; j++) {
          if (arr[i].children[j].path === pathname) {
            result.push(arr[i]);
            result.push(arr[i].children[j]);
          }
        }
      }
    }
  }
  return result;
}
