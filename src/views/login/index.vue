<!--
 * @Author: lw
 * @Date: 2022-10-28 17:16:14
 * @LastEditTime: 2022-11-25 15:53:10
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \wly-management\src\views\login\index.vue
-->
<template>
  <div class="loginBox">
    <div class="main flex  a-center relative">
      <div class="logoItem absolute ">
        <el-image style="width: 310px; height: 74px" :src="img_logo" :fit="fit" />
      </div>
      <el-form :model="form" ref="ruleFormRef" :rules="rules" status-icon class="formItem  p-80">
        <div class="titleItem text-center">
          <span class="d-block fs-26 cr-333">您好，欢迎登录</span>
          <span class="d-block fs-14 cr-989 m-t-5">欢迎来到G-CM（企业综合&业务管理系统）</span>
        </div>
        <el-form-item class="" prop="loginName">
          <el-input v-model="form.loginName" :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" :prefix-icon="Lock" />
        </el-form-item>
        <div class="flex j-between a-center">
          <el-checkbox v-model="autoLogin" label="下次自动登录" size="large" />
          <el-button @click="forgotPassWord" plain auto-insert-space class="forgotPassWordItem">忘记密码？</el-button>
        </div>
        <el-form-item class="btnBox ">
          <el-button type="primary" :loading="loading" @click="submitForm(ruleFormRef)" auto-insert-space
            class="submitItem">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import userName from "@/assets/login/userName.png"
import passWord from "@/assets/login/passWord.png"
import img_logo from "@/assets/login/logo.png"
import img_bg from "@/assets/login/bg.png"
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive, onMounted, onBeforeMount } from "vue"
import { _POST_ } from "@/server/api.js"
import Cookies from "js-cookie"
import Crypto from "crypto-js"
import { useRouter, useRoute } from "vue-router"
import { useLoginStore } from "@/store/login"
const loginStore = useLoginStore()
// 实例化路由
var router = useRouter()
// 路由参数
var route = useRoute()
const form = reactive({
  loginName: 'admin',
  password: '1111',
})
const autoLogin = ref(false)
const loading = ref(false)
const ruleFormRef = ref()
const rules = reactive({
  loginName: [
    { required: true, message: '请填写用户名~', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请填写密码~', trigger: 'blur' },
  ],
})
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      loginStore.login(form).then(res => {
        loading.value = false
        router.push({
          name: "Dashboard",
        })
      }).catch(err => {
        loading.value = false
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
const setAutoLoginData = () => {
  if (autoLogin.value) {

    Cookies.set("_auto_u", Crypto.MD5(form.userName))
    Cookies.set("_auto_p", Crypto.MD5(form.password))
  }
}
// 忘记密码

const forgotPassWord = () => {
  console.log('忘记密码~')
}
onMounted(() => {

})
</script>

<style lang="scss" scoped>
.loginBox {
  padding: 40px;
  width: 100vw;
  height: 100vh;
}

.main {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/login/bg.png');
  background-size: 1219px 100%;
  background-repeat: no-repeat;

  .logoItem {
    left: 322px;
  }

  .formItem {
    width: 550px;
    // height: 540px;
    padding: 146px 80px;
    position: absolute;
    background: #FFFFFF;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    right: 376px;

    .titleItem {
      margin-bottom: 77px;
    }

    .forgotPassWordItem {
      border: none;
    }

    .btnBox {
      margin-top: 98px;
    }

    .submitItem {
      width: 100%;
      height: 40px;
      box-shadow: 0px 4px 6px 0px rgba(223, 6, 21, 0.2);
      border-radius: 5px;
    }
  }
}
</style>