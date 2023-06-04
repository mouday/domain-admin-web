/**
 * 权限判断
 * @param {*} needRoles 要求的权限列表
 * @param {*} userRoles 用户的权限列表
 * @returns
 */
export function hasPermission(needRoles, userRoles) {
  // 如果有权限控制，进入权限判断
  if (needRoles && needRoles.length > 0) {
    // array
    return needRoles.some((role) => userRoles.includes(role))
  } else {
    return true
  }
}
