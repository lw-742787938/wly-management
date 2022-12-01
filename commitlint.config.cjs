/*
 * @Author: lw
 * @Date: 2022-11-09 18:11:16
 * @LastEditTime: 2022-11-10 09:23:01
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \callCenter\commitlint.config.cjs
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 检测规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        
      ]
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
}