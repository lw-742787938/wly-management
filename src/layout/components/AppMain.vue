<!--
 * @Author: lw
 * @Date: 2022-10-30 17:03:52
 * @LastEditTime: 2022-11-11 17:16:07
 * @LastEditors: lw
 * @Description: 主视图
 * @FilePath: \callCenter\src\layout\components\AppMain.vue
-->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <KeepAlive>
        <transition>
          <component :is="Component" :key="route.path" />
        </transition>
      </KeepAlive>
    </router-view>
  </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: 100%;

}
</style>