<!--
 * @Author: lw
 * @Date: 2022-10-31 09:33:10
 * @LastEditTime: 2022-11-24 14:50:04
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \gohnstudio-quickframework-callcenter\src\components\Dtable.vue
-->
<template>
  <div class="DtableItem" ref="DtableItem" :style="{ width: allWidth + 'px' }">
    <div class="header" ref="DHeader">
      <slot name="header" />
    </div>
    <div class="content scrollItem" ref="tableRef"
      :style="{ height: (state.allHeight - state.headerHeight - state.footerHeight - 20) + 'px' }">
      <!-- <el-table :data="tableData" style="width: 100%;height:100%">
        <slot />
      </el-table> -->
      <slot />
    </div>
    <div class="footer" ref="Dfooter">
      <el-pagination background layout="prev, pager, next" page-size="15" :page-count="pages"
        :current-page="currentPage" class="paginationItem" @current-change="currentChange" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue"
import { useMainStore } from "@/store/main"
const mainStore = useMainStore()
const DtableItem = ref(null)
const DHeader = ref(null)
const Dfooter = ref(null)
const props = defineProps(['pages', 'currentPage'])
const emit = defineEmits(['changePages'])
const state = reactive({
  allHeight: 0,
  headerHeight: 0,
  footerHeight: 0,
})
const currentChange = (event) => {
  emit('changePages', event)
}
onMounted(() => {
  state.allHeight = DtableItem.value.offsetHeight;
  state.allWidth = DtableItem.value.offsetWidth;
  state.headerHeight = DHeader.value.offsetHeight;
  state.footerHeight = Dfooter.value.offsetHeight;
})
onUpdated(() => {
  state.allHeight = DtableItem.value.offsetHeight;
  state.allWidth = DtableItem.value.offsetWidth;
  state.headerHeight = DHeader.value.offsetHeight;
  state.footerHeight = Dfooter.value.offsetHeight;
})
</script>

<style lang="scss" scoped>
.DtableItem {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;

  .header {}

  .content {
    display: block;
    height: 100%;
    margin-bottom: 10px;
    border: 1px solid #f3f3f3;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
  }

  .scrollItem {
    // height: 300px;
    // overflow-y: scroll;
  }
}

.paginationItem {
  padding-left: 0px;
  padding-right: 0px;
}
</style>