<!--
 * @Author: lw
 * @Date: 2022-11-10 10:10:56
 * @LastEditTime: 2022-11-20 14:08:40
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \callCenter\src\views\errorPage\404.vue
-->
<template>
  <div class="wscn-http404-container">
    <el-image style="width:362px; height: 306px" :src="img_404" fit="contain" />
  </div>
</template>

<script setup>
import img_404 from "@/assets/404_images/404.png"
const message = ref('The webmaster said that you can not enter this page...')
</script>

<style lang="scss" scoped>
.wscn-http404-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
