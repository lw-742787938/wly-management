<!--
 * @Author: lw
 * @Date: 2022-10-28 16:20:56
 * @LastEditTime: 2022-12-01 11:04:09
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \wly-management\src\layout\index.vue
-->
<template>
  <!-- <div class="layout">
    <div class="lay-slider">
      <Silder />
    </div>
    <div class="lay-content">
      <div class="navbar">
        <Navbar />
        <TagView />
      </div>
      <div class="content">
        <AppMain />
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  </div> -->
  <div class="common-layout">
    <!-- 上行布局 顶部栏 内容栏1 -->
    <el-container>
      <!-- 顶部栏 -->
      <el-header class="headerItem">
        <Navbar />
      </el-header>
      <!-- 内容栏1 -->
      <!-- 四栏布局 左通 上中下 aside tag main footer-->
      <el-container class="oneMainItem">
        <!-- 侧边栏 -->
        <el-aside class="asideItem">
          <Silder />
        </el-aside>
        <el-container class="twoMainItem">
          <el-header class="tagItem">
            <TagView />
          </el-header>
          <el-main class="mainItem">
            <AppMain />
          </el-main>
          <el-footer class="footerItem">
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { Silder, Navbar, Footer, AppMain, TagView } from "./index.js"
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  width: 100vw;

  .headerItem {
    height: 70px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .oneMainItem {
    height: calc(100vh - 70px);

    .asideItem {
      height: 100%;
      max-width: 227px;
      width: auto;
    }

  }

  .twoMainItem {

    .tagItem {
      height: 44px;
      padding-left: 0px;
      padding-right: 0px;
    }

    .mainItem {
      background-color: #F3F3F3;
      padding: 20px;
    }

    .footerItem {
      height: 40px;
      padding-left: 0px;
      padding-right: 0px;
    }
  }

}
</style>