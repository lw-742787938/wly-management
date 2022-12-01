<!--
 * @Author: lw
 * @Date: 2022-11-04 17:20:38
 * @LastEditTime: 2022-11-29 16:16:51
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \wly-management\src\layout\components\TagView.vue
-->
<template>
  <div class="tagViewItem  a-center">
    <router-link to="/">
      <div class="homeItem">
        <el-icon color="#000000" :class="Home ? 'isActive' : ''">
          <House />
        </el-icon>
      </div>
    </router-link>
    <div>
      <el-tabs v-model="Route.name" type="card" closable class="tabsItem" @tab-click="clickRouter"
        @tab-remove="handleTabsRemove">
        <template v-for="item in TagViewStore.visitedViews">
          <el-tab-pane :label="item.title" :name="item.name" class="test"
            :class="isActive(item.name) ? 'isActive' : ''">
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router"
import { useTagViewStore } from "@/store/tagView"
import { usePerMissionStore } from "@/store/index"

const TagViewStore = useTagViewStore()
const PerMissionStore = usePerMissionStore()
const Router = useRouter()
const Route = useRoute()
const affixTags = reactive([])
const Home = ref(true)
watch(Route, async (newQuestion, oldQuestion) => {
  TagViewStore.ADD_VISITED_VIEW(newQuestion)
  PerMissionStore.setMainSilder("/" + newQuestion.path.split("/")[1])
  HomeAcrive()
})
onMounted(() => {
  initTags()
  console.info('刷新  ')
})
const HomeAcrive = (event) => {
  Home.value = Route.name === 'Dashboard'
}
const initTags = () => {
  const temp = affixTags.value = filterAffixTags(Router.getRoutes())
  for (const tag of temp) {
    // Must have tag name
    if (tag.name) {
      TagViewStore.ADD_VISITED_VIEW(tag)
    }
  }
}
// 删除TagView
const handleTabsRemove = (event) => {
  TagViewStore.DEL_VISITED_VIEW(event).then(({ visited }) => {
    if (isActive(event)) {
      toLastView(visited, event)
    }
  })
}
const isActive = (event) => {
  return Route.name === event
}
const toLastView = (visitedViews, event) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    Router.push({ name: latestView.name })
  } else {
    if (event === 'Dashboard') {
      Router.replace({ path: '/' })
    } else {
      Router.push('/')
    }
  }
}

const filterAffixTags = (routes, basePath = '/') => {
  let tags = []
  routes.forEach(route => {
    if (route.meta && route.meta.affix) {
      tags.push(route)
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

const clickRouter = (tab, event) => {
  Router.push({
    name: tab.paneName
  })
}
onMounted(() => {
  PerMissionStore.setMainSilder("/" + Route.path.split("/")[1]);// 刷新界面
})
</script>

<style lang="scss" scoped>
.tagViewItem {
  --el-tabs-header-height: 45px;
  width: 100%;
  display: grid;
  grid-template-columns: 50px calc(100% - 50px);
  height: var(--el-tabs-header-height);
  border-bottom: 1px solid #e4e7ed;

  .homeItem {
    display: flex;
    height: var(--el-tabs-header-height);
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .isActive {

      color: var(--el-color-primary)
    }
  }

  :deep(.tabsItem) {
    --el-tabs-header-height: 45px;

    .el-tabs__header {
      margin-bottom: 0px;
    }

    .el-tabs__item {
      position: relative;



      &::after {
        position: absolute;
        content: "";
        width: 0px;
        background-color: var(--el-color-primary);
        height: 2px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 1px;
        transition: all 0.2s ease-in;
      }

      &.is-active {
        background-color: #F3F3F3;

        &::after {
          width: 100% !important;
        }
      }

    }
  }
}
</style>
