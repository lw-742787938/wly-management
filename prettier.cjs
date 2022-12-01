/*
 * @Author: lw
 * @Date: 2022-10-30 10:22:37
 * @LastEditTime: 2022-10-30 10:22:54
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \callCenter\prettier.cjs
 */
// prettier.cjs

module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false, // 是否使用tab进行缩进，默认为false
  singleQuote: true, // 是否使用单引号代替双引号，默认为false
  semi: true, // 行尾是否使用分号，默认为true
  arrowParens: 'always',
  endOfLine: 'auto',
  vueIndentScriptAndStyle: true,
  htmlWhitespaceSensitivity: 'strict',
};