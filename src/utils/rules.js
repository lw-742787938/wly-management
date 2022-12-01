/*
 * @Author: lw
 * @Date: 2022-11-16 15:28:45
 * @LastEditTime: 2022-11-16 15:36:04
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \callCenter\src\utils\rules.js
 */
const tempRules = {
  name(options){
    return [
      { required: true, message: '请填写姓名~', trigger: 'blur' },
    ]
  }
};
export default tempRules;