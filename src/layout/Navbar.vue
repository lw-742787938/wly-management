<!--
 * @Author: lw
 * @Date: 2022-10-30 16:50:11
 * @LastEditTime: 2022-11-25 17:13:11
 * @LastEditors: lw
 * @Description: 顶部导航
 * @FilePath: \wly-management\src\layout\Navbar.vue
-->
<template>
  <div class="navbarItem">
    <div class="logoItem text-center">
      <el-icon size="35px">
        <svg-icon iconName="icon-wuliangye" color="#fff"></svg-icon>
      </el-icon>
    </div>
    <div class="navBox flex a-center">
      <div class="nav-left-item">
        <span>G-CM（企业综合&业务管理系统）</span>
      </div>
      <!-- setting -->
      <div class="nav-right-item">
        <div class="quickItem flex m-l-25">
          <span class="cr-fff fs-16">消息 </span>
        </div>
        <div class="quickItem flex m-l-25">
          <span class="cr-fff fs-16">admin</span>
        </div>
        <div class="quickItem flex m-l-25">
          <el-dropdown trigger="click">
            <div class="flex a-center">
              <el-avatar :size="30" :src="circleUrl" class="m-r-10" />
              <el-icon color="#FFFFFF">
                <CaretBottom />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="loginStore.loginOut()">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useLoginStore } from "@/store/login.js"
const loginStore = useLoginStore()
onMounted(() => {
})

</script>

<style lang="scss" scoped>
.navbarItem {
  height: 70px;
  background-color: var(--el-color-primary);
  display: flex;
  align-items: center;

  .logoItem {
    width: 92px;
  }

  .navBox {
    display: flex;
    flex: 1;
    padding: 0 20px;
    justify-content: space-between;

    .nav-left-item {
      display: flex;
      font-size: 16px;
      color: #fff;

    }

    .nav-right-item {
      display: flex;
      align-items: center;
    }

    .quickItem {
      cursor: pointer;
    }
  }

}
</style>