<!--
 * @Author: lw
 * @Date: 2022-10-28 17:15:35
 * @LastEditTime: 2022-12-01 14:54:58
 * @LastEditors: lw
 * @Description: 侧边栏
 * @FilePath: \wly-management\src\layout\components\silder.vue
-->
<template>
  <div class="sliderItem">
    <div class="mainSilder">
      <div ref="mainSilderBox" class="mainSilderBox">
        <div v-for="item in usePerMissionStore()._mainSilder" class="mainSilderItem test flex a-center p-l-10 "
          :class="mailIndex(item)" v-show="!item.meta.hidden"
          @click="PerMissionStore.setMainSilder(item.path); renderMailSilder()">
          <el-icon :size="14">
            <svg-icon :iconName="item.meta.icon" :color="mainColor(item)">
            </svg-icon>
          </el-icon>
          <span class="textItem p-l-10 fs-14">{{ item.meta.title }}</span>
        </div>
      </div>
    </div>
    <div class="chridrenSilder" v-if="childrenSilder">
      <el-menu v-if="showDom" :default-active="Route.path" class="silder-menu" unique-opened :router="true" @select="">
        <template v-for="item in usePerMissionStore()._childrenSilder">
          <el-sub-menu :index="item.path" class="d-sub-menu" v-show="!item.meta.hidden">
            <template #title>
              <span class="">{{ item.meta.title }} </span>
            </template>
            <template v-for="child in item.children" :key="child.path">
              <el-menu-item :index="resolve(item.parentPath, item.path, child.path)" class="d-menu-item"
                v-show="!child.meta.hidden">
                <template #title>
                  <span class="">{{ child.meta.title }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import icon_shouye from "@/assets/sliderIcon/shouye.png"
import { useRouter, useRoute } from "vue-router"
import { useTagViewStore } from "@/store/tagView"
import { usePerMissionStore } from "@/store/index"
import { resolve } from "path-browserify"
import { evaluate } from "mathjs"
const TagViewStore = useTagViewStore()
const PerMissionStore = usePerMissionStore()
const Router = useRouter()
const Route = useRoute()
const mainSilderBox = ref()
const showDom = ref(false)
const childrenSilder = computed(() => {
  return usePerMissionStore()._childrenSilder
})
watch(childrenSilder, async (newQuestion, oldQuestion) => { // 兼容二级菜单渲染
  showDom.value = false;
  nextTick().then(function () {
    showDom.value = true;
  });
})
// 添加一级菜单渲染效果
const renderMailSilder = () => {
  nextTick().then(() => {
    let temp = mainSilderBox.value.children
    let _index = Array.from(temp).findIndex(elm => Array.from(elm.classList).includes('isActive'))
    let beforeIndex = evaluate(`${_index} - 1`)
    let afterIndex = evaluate(`${_index} + 1`)
    Array.from(temp).forEach(elm => {
      elm.classList.remove("clipItemBefter")
      elm.classList.remove("clipItemAfter")
    })
    temp[beforeIndex]?.classList.add("clipItemBefter")
    temp[afterIndex]?.classList.add("clipItemAfter")
  })
}
// 一级菜单
const mailIndex = (event) => {
  return {
    isActive: event.isActive
  }
}
const mainColor = (event) => {
  return event.isActive ? 'var(--el-color-primary)' : '#fff'
}

onMounted(() => {
  PerMissionStore.getMainSilder()
  renderMailSilder()
  showDom.value = true;
})
</script>

<style lang="scss" scoped>
.sliderItem {
  height: 100%;
  // min-height: 92px;
  // max-width: 227px;
  display: flex;

  .mainSilder {
    display: block;
    background-color: var(--el-color-primary);

    .mainSilderBox {
      background-color: #fff;
    }

    .mainSilderItem {
      height: 54px;
      width: 92px;
      cursor: pointer;
      background-color: var(--el-color-primary);

      .textItem {
        color: #fff;
      }

      &.clipItemAfter {
        clip-path: inset(0% 0 0% 0 round 0 100px 0 0);
      }

      &.clipItemBefter {
        clip-path: inset(0% 0 0% 0 round 0 0 100px 0);
      }

      &.isActive {
        background-color: #fff;

        .textItem {
          color: var(--el-color-primary);
        }
      }

      // &:not(.isActive) {
      //   background-color: var(--el-color-primary);
      // }
    }

    :deep(.silder-menu) {
      --el-menu-text-color: #fff;
      --el-menu-bg-color: var(--el-color-primary);
      --el-menu-border-color: var(--el-color-primary);
      border-right: 0px solid #fff;

      .isActive {
        background-color: #FFF;
        color: var(--el-color-primary);
      }

      .el-menu-item:hover {
        background-color: var(--el-color-primary);
      }
    }

  }

  .chridrenSilder {
    display: block;
    width: 135px;

    :deep(.silder-menu) {
      --el-menu-border-color: #FFF;

      .el-menu-item {
        min-width: auto;
      }

      .textItem {
        color: #333;
        font-size: 14px;
      }

      &:hover {
        .el-icon {
          color: var(--el-color-primary);
        }

        .textItem {
          // color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>