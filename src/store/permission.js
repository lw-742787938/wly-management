/*
 * @Author: lw
 * @Date: 2022-11-09 14:04:53
 * @LastEditTime: 2022-12-01 10:26:15
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \wly-management\src\store\permission.js
 */
import { defineStore } from 'pinia'
import { setToken } from '@/utils/auth'
import {_POST_} from '@/server/api'
import {constantRoutes,asyncRoutes}  from "../router/index.js"
import Router  from "../router/index.js"
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
 function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
  function filterAsyncRoutes(routes, roles) {
    
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
}
export const usePerMissionStore = defineStore({
  id:"PerMission",
  state: () => {
    return {
      accessedRoutes:[],
      mainSilder:[], // 一级菜单
      childrenSilder:[], // 二级菜单
    }
  },
  getters: {
    _accessedRoutes:  (state) => state.accessedRoutes,
    _routes:(state)=>{
      return constantRoutes.concat(asyncRoutes)
    },
    _mainSilder:  (state) => state.mainSilder,
    _childrenSilder:  (state) => state.childrenSilder,
  },
  actions: {
    generateRoutes(roles){
      return new Promise((resolve) => {
        let accessedRoutes;
        // if (roles.includes("admin")) {
        //   accessedRoutes = asyncRoutes || [];
        // } else {
        //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        // }
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        this.accessedRoutes = accessedRoutes
        resolve(accessedRoutes);
      });
    },
    add_404(){
      return new Promise((resolve, reject) => {
        Router.addRoute({
          path: '/:pathMatch(.*)*',
          redirect: '/404' ,
          meta:{
            hidden:true,
          }
        })
      })
    },
    getMainSilder(){
      let temp = constantRoutes.concat(asyncRoutes)
      this.$patch((state)=>{
        state.mainSilder = temp.map(elm=>{
          return {
            ...elm
          }
        })
       if(!state.mailPath)this.setMainSilder()
      })
    },
    setMainSilder(path='/System'){
      if(!path)return
      let temp = this.mainSilder;
      let index = temp.findIndex(elm=>elm.path==path)
      temp.forEach(elm=>elm.isActive = false)
      temp[index].isActive = true;
      this.$patch((state)=>{
        state.mainSilder = temp
        state.childrenSilder =  temp[index].children
      })
    }
  },
  persist:{
    enabled: true,
  }
})