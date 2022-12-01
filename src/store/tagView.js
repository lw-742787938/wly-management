/*
 * @Author: lw
 * @Date: 2022-11-04 16:37:13
 * @LastEditTime: 2022-12-01 09:56:56
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \wly-management\src\store\tagView.js
 */
import { defineStore } from 'pinia'
export const useTagViewStore = defineStore({
  id:"TagView",
  state: () => {
    return {
      visited: [],
      cached: [],
      silderDefaultRoute:''
    }
  },
  getters: {
    visitedViews: (state) => state.visited,
    cachedViews: (state) => state.cached,
    _silderDefaultRoute: (state) => state.silderDefaultRoute,
  },
  actions: {
    ADD_VISITED_VIEW(view) { 
      if(view.meta.affix) return
      if (this.visited.some(v => v.path === view.path)) return
      this.visited.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },
    DEL_VISITED_VIEW(view) {
      return new Promise((resolve, reject) => {
        this.visited.splice(this.visited.findIndex(elm=>elm.name===view), 1);
        resolve({
          visited:[...this.visited]
        })
      })
    },
  },
  persist:{
    enabled: true,
  }
})