/*
 * @Author: lw
 * @Date: 2022-10-31 10:13:18
 * @LastEditTime: 2022-12-01 10:19:36
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \wly-management\src\store\login.js
 */
import { defineStore } from 'pinia'
import { setToken, removeToken } from '@/utils/auth'
import { _POST_ } from '@/server/api'
import Router from "../router/index.js"
import { useMainStore } from './main'
import { useTagViewStore } from './tagView'
import { usePerMissionStore } from './permission'
export const useLoginStore = defineStore({
  id: "login",
  state: () => {
    return {
      id: '',
      loginName: '',
      phone: '',
      token: '',
      msg: '',
      role: []
    }
  },
  getters: {
    _id: (state) => state.id,
    _loginName: (state) => state.loginName,
    _phone: (state) => state.phone,
    _role: (state) => state.role,
  },
  actions: {
    /**
     * 登录
     * @param {*} formData 登录表单数据
     * @returns
     */
    login (formData) {
      return new Promise(async (resolve, reject) => {
        _POST_("callcenter_userlogin_svr", formData).then(async res => {
          this.$patch({
            id: res.resultData.id,
            loginName: res.resultData.loginName,
            phone: res.resultData.phone,
            token: res.resultData.token,
            msg: res.resultData.msg,
            role: ['admin']
          })
          // this.$patch({
          //   ...res.resultData,
          // })

          setToken(res.resultData.token)
          await useMainStore().getEnumTypeList()
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    resetStore () {
      console.info("resrt before", this)
      useMainStore().$reset()
      useTagViewStore().$reset()
      usePerMissionStore().$reset()
      this.$reset()
      console.info("resrt after", this)
    },
    /**
     * 退出登录
     */
    loginOut () {
      return new Promise( async(resolve, reject) => {
       await _POST_('callcenter_userloginout_svr').then((res) => {
          removeToken()
          this.resetStore()
          Router.replace({ path: '/login' })
          ElMessage.success(res.resultMessage)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    resetToken () {
      return new Promise(resolve => {
        removeToken()
        this.resetStore()
        resolve()
      })
    },

  },
  persist: {
    enabled: true,
  }
})