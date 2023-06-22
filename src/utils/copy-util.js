/**
 * 深拷贝
 * @param {*} obj 
 * @returns 
 */
export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}
