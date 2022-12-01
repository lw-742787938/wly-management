/*
 * @Author: lw
 * @Date: 2022-11-01 16:46:35
 * @LastEditTime: 2022-11-02 10:13:03
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \callCenter\src\server\formatRequestData.js
 */
const partnerId = "22021016172215600000";
const secretKey = "a4fc9d4a786f0519bdb0996fa6b34b1f";
import Crypto from "crypto-js"
import { getToken } from "../utils/auth";
const randomNum = function (n) {
  let res = ""
  for (let i = 0; i < n; i++) {
    res += Math.floor(Math.random() * 10)
  }
  return res
}
// 提供一个排序方法 
const dictSortByKey = function (dict) {
  let newKeys = Object.keys(dict).sort();

  let newDict = {};
  for (var i = 0; i < newKeys.length; i++) {
    newDict[newKeys[i]] = dict[newKeys[i]];
  }
  return newDict;
}
const signParams = function (context) {
  let temp;
  let signStr;
  if (context) {
    let dict = dictSortByKey(context);
    let data = "";
    //构建待签名参数字符
    let waitSignStr = "";
    for (const propName of Object.keys(dict)) {
      const value = dict[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof value !== "undefined") {
        if (typeof value === "object") {
          data += part + JSON.stringify(value) + "&";
          waitSignStr += part + JSON.stringify(value) + "&";
        } else {
          data += part + encodeURIComponent(value) + "&";
          waitSignStr += part + encodeURIComponent(value) + "&";
        }
      }
    }
    //生成签名参数
    signStr = Crypto.MD5(waitSignStr.slice(0, -1) + secretKey);
    data = encodeURI(data.slice(0, -1)) + "&sign=" + signStr;
    temp = data;
  }
  return temp
};

export const formatData = function (service, context = {}) {
  if(context) context.token=getToken()
  let temp_params = {
    requestNo: randomNum(16),
    // protocol: "HTTP_FORM_JSON",
    service,
    // version: "1.0",
    partnerId: partnerId,
    signType: "MD5",
    requestData: context,
  }
  return signParams(temp_params)
}
