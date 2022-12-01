/*
 * @Author: lw
 * @Date: 2022-11-14 10:15:52
 * @LastEditTime: 2022-11-14 10:31:02
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \callCenter\src\utils\commMath.js
 */

import {evaluate} from "mathjs"
/**
 * 比例
 * @param {*} num1 - 值1
 * @param {*} num2 - 值2
 * @param {*} decimals - 小数位
 */
export const proportion = (num1,num2,decimals=2)=>{
  if(num1&&num2){
   return evaluate(`(${num1}/${num2})*100`).toFixed(decimals)
  }else{
    return 0
  }
}