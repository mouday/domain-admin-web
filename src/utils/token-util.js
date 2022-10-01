/**
 * Token 存取
 */
import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';

export function setToken(value) {
  Cookies.set(TOKEN_KEY, value, {
    expires: 7, // 7天 有效期
  });
}

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY);
}
