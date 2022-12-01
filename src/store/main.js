/*
 * @Author: lw
 * @Date: 2022-10-31 10:13:18
 * @LastEditTime: 2022-12-01 09:57:20
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \wly-management\src\store\main.js
 */
import { defineStore } from 'pinia'
import {_POST_} from "@/server/api"
import Dayjs from "dayjs"
import updateLocale from "dayjs/plugin/updateLocale"
import weekday from "dayjs/plugin/weekday"
import {ElLoading} from "element-plus"
Dayjs.extend(updateLocale)
Dayjs.extend(weekday)
export const useMainStore = defineStore({
  id:"main",
  state: () => {
    return {
      loadingCount: 0,
      timeInit: {},
      availableHeight: 0,
      enumList:{},
    }
  },
  getters: {
  },
  actions: {
    /**
     * 显示loadIng
     */
    showLoad() {
      if (this.loadingCount++ == 0) {
        this.loadingInstance=  ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
      }
    },
    /**
     * 隐藏loadIng
     */
    hideLoad() {
      if (--this.loadingCount == 0 && this.loadingInstance) {
        this.loadingInstance.close()
      }
    },
    /**
     * 获取可用高度
     * @param {*} top - 元素距离顶部高度
     * @param {*} height - 元素距离底部高度
     */
    getScrollAvailableHeight(top, height) {
      console.info(top,height)
      const clientHeight = document.body.clientHeight
      this.availableHeight =
        clientHeight - top.value.offsetTop - (height?.value?.offsetHeight || 0)
    },
    /**
     * 设置起止时间
     * ```````````
     * 若无则默认获取当前时间段（1天）
     * ```````````
     * @param start
     * @param end
     */
    setStartEndTime(start, end) {
      // 默认获取今天-明天
      if (start && end) {
        let res = {
          startFull: Dayjs(start).format("YYYY-MM-DD"),
          start: Dayjs(start).format("MM-DD"),
          startText: Dayjs(start).format("MM月DD日"),
          startWeek: weekText[Dayjs(start).day()],
          startMil: new Date(start).getTime(),
          endFull: Dayjs(end).format("YYYY-MM-DD"),
          end: Dayjs(end).format("MM-DD"),
          endText: Dayjs(end).format("MM月DD日"),
          endWeek: weekText[Dayjs(end).day()],
          endMil: new Date(end).getTime(),
          diffDay: Dayjs(end).diff(Dayjs(start), "day"),
        }
        this.timeInit = res
      } else {
        let res = {
          startFull: Dayjs().format("YYYY-MM-DD"),
          start: Dayjs().format("MM-DD"),
          startText: Dayjs().format("MM月DD日"),
          startWeek: weekText[Dayjs().day()],
          startMil: new Date().getTime(),
          endFull: Dayjs().add(1, "day").format("YYYY-MM-DD"),
          end: Dayjs().add(1, "day").format("MM-DD"),
          endText: Dayjs().add(1, "day").format("MM月DD日"),
          endWeek: weekText[Dayjs().add(1, "day").day()],
          endMil: new Date(Dayjs().add(1, "day")).getTime(),
          diffDay: Dayjs().add(1, "day").diff(Dayjs(), "day"),
        }
        this.timeInit = res
      }
    },
    diffSecond(start,end){
      return Dayjs(end).diff(Dayjs(start), "S")
    },
    /**
     * 获取全局枚举
     */
    getEnumTypeList(){
      _POST_('callcenter_queryenumstype_svr').then(res=>{
        
        this.$patch(state=>{
          // if(res.resultData){
          //   res.resultData.forEach(elm=>{
          //     state.enumList.push(elm)
          //   })
          // }
          state.enumList=(res.resultData)
        })
      })
    },
    /**
     * 获取枚举列表
     */
    getEnumList(key){
      
      return this.enumList[key]||[]
    },
    /**
     * 获取枚举值
     */
    getEnumValue(listKey,key,row){
      if(!listKey||!key) return ''
      let temp = this.enumList[listKey]
      return temp?temp[temp.findIndex(elm=>elm.code==row[key])].msg:''
    },
    getEnumKeyValue(listKey,key){
      if(!listKey||!key) return ''
      let temp = this.enumList[listKey]
      return temp?temp[temp.findIndex(elm=>elm.code==key)]?.msg||'':''
    },
     /**
     * 状态转换
     * @param {*} status 
     */
    stateTransition(row){
      debugger
      return row.status==0?'否':"是"
    },


  },
  persist:{
    enabled: true,
  }
})