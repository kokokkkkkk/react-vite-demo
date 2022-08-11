
// roles是用户信息中的角色数组
// route每一个路由规则
function hasPermission(roles, route) {
  if (route.roles) {
    return roles.some(role => route.roles.includes(role))
  } else {
    return true
  }
}

// routes也就是我们将要过滤的asyncRoutes
// roles用户信息中的角色数组
function filterAsyncRoutes(routes, roles) {
  const res = []  // 放置有权访问的路由规则

  routes.forEach(route => {
    const tmp = { ...route } // tmp就是一条具体的路由规则
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

// 用于生成当前用户有权访问的路由规则们
export function generateRoutes(asyncRoutes, roles) {
  const accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
  console.log(accessRoutes);
  return accessRoutes
}
