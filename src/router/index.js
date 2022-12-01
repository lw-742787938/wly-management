/*
 * @Author: lw
 * @Date: 2022-10-28 17:16:32
 * @LastEditTime: 2022-12-01 10:29:39
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \wly-management\src\router\index.js
 */


import { createRouter, createWebHashHistory   } from 'vue-router';

import Layout from '@/scr/layout/index.vue';
// 
export const constantRoutes = [
  // login
  {
    name:'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta:{
      title:'登录',
      hidden:true,
    }
  },
  // dashboard
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta:{
      icon:'icon-shouye',
      title:'首页',
      hidden:false,
    },
  },
  // {
  //   path: '/404',
  //   component: () => import('@/views/errorPage/404.vue'),
  //   meta:{
  //     title:'Not Found',
  //     hidden:true,
  //   }
  // },
];
export const  asyncRoutes = [
  // 财务
  {
    path: '/Finance',
    name: 'Finance',
    meta:{
      icon:'icon-yonghuguanli',
      hidden:false,
      title:'财务',
      roles: ["admin", "editor"]
    },
    children: [
      {
        parentPath:'/Finance',
        path: 'management',
        name: 'financeManagement',
        component: Layout,
        meta:{
          title:"财务管理",
          hidden:false,
          roles:['admin']
        },
        children: [
          {
            name:'Reimbursement',
            path: 'Reimbursement',
            component: () => import('@/views/Finance/management/Reimbursement.vue'),
            meta:{
              title:"报销管理",
              hidden:false,
              roles:['admin']
            },
          },
          {
            name:'Rank',
            path: 'Rank',
            component: () => import('@/views/Finance/management/Rank.vue'),
            meta:{
              title:"职级管理",
              hidden:false,
              roles:['admin']
            },
          },
          {
            name:'TravelStandards',
            path: 'TravelStandards',
            component: () => import('@/views/Finance/management/TravelStandards.vue'),
            meta:{
              title:"差标管理",
              hidden:false,
              roles:['admin']
            },
          }
        ],
      },
    ]
  },
  // 系统
  {
    path: '/System',
    name: 'System',
    meta:{
      icon:'icon-yonghuguanli',
      hidden:false,
      title:'系统',
      roles: ["admin", "editor"]
    },
    children: [
      {
        parentPath:'/System',
        path: 'set',
        name: 'set',
        component: Layout,
        meta:{
          title:"系统设置",
          hidden:false,
          roles:['admin']
        },
        children: [
          {
            name:'userManagement',
            path: 'userManagement',
            component: () => import('@/views/System/set/userManagement.vue'),
            meta:{
              title:"用户管理",
              hidden:false,
              roles:['admin']
            },
          },
          {
            name:'rulesManagement',
            path: 'rulesManagement',
            component: () => import('@/views/System/set/rulesManagement.vue'),
            meta:{
              title:"权限管理",
              hidden:false,
              roles:['admin']
            },
          },
          {
            name:'roleManagement',
            path: 'roleManagement',
            component: () => import('@/views/System/set/roleManagement.vue'),
            meta:{
              title:"角色管理",
              hidden:false,
              roles:['admin']
            },
          },
          {
            name:'noticeManagement',
            path: 'noticeManagement',
            component: () => import('@/views/System/set/noticeManagement.vue'),
            meta:{
              title:"公告管理",
              hidden:false,
              roles:['admin']
            },
          }
        ],
      },
    ]
  },
]
const routes = [
  ...constantRoutes,
  ...asyncRoutes,
]

const router = createRouter({
  history: createWebHashHistory(), // history 模式则使用 createWebHistory()
  // routes:constantRoutes, // 基础路由
  routes:routes, // 测试使用（全部路由）
});

export default router;