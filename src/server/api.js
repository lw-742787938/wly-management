/*
 * @Author: lw
 * @Date: 2022-11-01 14:57:50
 * @LastEditTime: 2022-11-03 10:25:45
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \callCenter\src\server\api.js
 */

import {request} from  "./idnex"
import {formatData} from "./formatRequestData"

export function _POST_(service, requestData,mask) {
  return request({
    url: '/api/test',
    method: 'POST',
    data:formatData(service, requestData),
  },mask)
}