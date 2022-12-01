/*
 * @Author: lw
 * @Date: 2022-11-07 16:56:13
 * @LastEditTime: 2022-11-28 09:43:31
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \wly-management\src\utils\get-page-title.js
 */
const title = import.meta.env.VITE_APP_TITLE || '综合系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}