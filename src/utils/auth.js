/*
 * @Author: lw
 * @Date: 2022-11-01 14:50:09
 * @LastEditTime: 2022-11-09 15:17:18
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \callCenter\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

