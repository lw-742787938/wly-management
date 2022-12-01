<!--
 * @Author: lw
 * @Date: 2022-11-02 10:15:45
 * @LastEditTime: 2022-12-01 10:03:00
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \wly-management\src\views\dashboard\index.vue
-->
<template>
  <el-scrollbar height="100%">
    <div class="app-container">
      <div class="one  d-boxShadow">
        <el-skeleton :rows="10" :throttle="500" :loading="loading" animated>
          <template #default>
            <div class="userInfoItem">
              <div class="flex a-center">
                <el-avatar :size="126" :src="circleUrl" />
                <div class="m-l-40 ">
                  <div class="fs-30">{{ callStore._lineCode ? callStore._lineCode : info.code }}</div>
                  <div class="m-t-30">
                    <div class="fs-18 cr-696 m-t-20">姓名： {{ info.userName }} </div>
                    <div class="fs-18 cr-696 m-t-20">工号：{{ callStore._lineCode ? callStore._lineCode : info.code }}
                    </div>
                    <div class="fs-18 cr-696 m-t-20">坐席角色：{{ info.roleName }}</div>
                  </div>
                </div>
              </div>
              <div class="p-r-30">
                <el-button v-if="callStore._lineCode && callStore._lineId" type="primary" auto-insert-space
                  color="#34BFA3" class="cr-fff" @click="callStore.offLineCode()">下线
                </el-button>
                <el-button v-else type="primary" auto-insert-space @click="callStore.onLineCode()">上线</el-button>
              </div>
            </div>
          </template>
        </el-skeleton>
      </div>

      <div class="two  d-boxShadow">
        <el-skeleton :rows="10" :throttle="500" :loading="loading" animated>
          <template #default>
            <div class="fs-18 cr-414">近一周接通率</div>
            <div>
              <span class="d-block m-b-10 fs-14 cr-696">呼入接通率（呼入{{ info.in }}，接通{{
                  info.inCount
              }}）</span>
              <el-progress :percentage="proportion(info.in, info.inCount)" />
            </div>
            <div>
              <span class="d-block m-b-10 fs-14 cr-696">呼出接通率（呼入{{ info.out }}，接通{{
                  info.outCount
              }}）</span>
              <el-progress :percentage="proportion(info.out, info.outCount)" color="#F29F63" />
            </div>
          </template>
        </el-skeleton>

      </div>
      <div class="three  d-boxShadow">
        <el-skeleton :rows="10" :throttle="500" :loading="loading" animated>
          <div class="" id="lineChart" style="height:400px"></div>
        </el-skeleton>
      </div>
      <div class="four  d-boxShadow">
        <Dtable v-loading="loading">
          <template v-slot:header>
            <div class="p-b-10 fs-18 cr-414 bolder">
              最近通话记录
            </div>
          </template>
          <el-table :data="info.list" style="width: 100%;height:100%">
            <el-table-column _fixed="right" label="操作" align="center">
              <template #default="scope">
                <el-icon @click="scope.row.soundUrl ? AudioItem.listen(scope.row) : ''" style="cursor: pointer">
                  <svg-icon iconName="icon-luyin" :color="scope.row.soundUrl ? '#F29F63' : '#999999'"></svg-icon>
                </el-icon>
              </template>
            </el-table-column>
            <el-table-column prop="answerPhone" label="呼入电话" min-width="150" align="center" />
            <el-table-column prop="status" label="是否被接" min-width="100" align="center">
              <template #default="scope">
                <span>{{ scope.row.status == 0 ? '未接听' : scope.row.status == 1 ? '已接听' : scope.row.status == 2 ? '忙碌中' :
                    '未接听'
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="answerPhone" label="接听分机" min-width="100" align="center" />
            <el-table-column prop=" " label="接听人" min-width="100" align="center" />
            <el-table-column prop="createTime" label="开始时间" min-width="170" align="center" />
            <el-table-column prop="endTime" label="结束时间" min-width="170" align="center" />
            <el-table-column prop="callDuraction" label="呼叫时间（秒）" min-width="150" align="center" />
            <el-table-column prop="talkDuraction" label="时长（秒）" min-width="100" align="center" />
          </el-table>
        </Dtable>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import Dayjs from "dayjs"
import Dtable from "@/components/Dtable.vue"
import { proportion } from "@/utils/commMath.js";
import { _POST_ } from "@/server/api"
import * as echarts from 'echarts/core';
// // 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// // 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useLoginStore } from "@/store/login.js"
const loginStore = useLoginStore()
echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);
const listQuery = reactive({
  curPage: 1,
  pages: 1,
  rowNum: 15,
})
const loading = ref(true)
const info = reactive({})
const getInfo = (event) => {
  loading.value = true;
  Promise.all([_POST_('callcenter_consolelist_svr'), _POST_('callcenter_callloglist_svr', {
    startTime: Dayjs().subtract(7, 'd').format("YYYY-MM-DD"),
    endTime: Dayjs().format("YYYY-MM-DD"),
  })]).then(res => {
    // 呼入 呼出 次数记录
    info.in = ref(res[0].resultData.connectionRateVo.callInGotTimes || 0)
    info.inCount = ref(res[0].resultData.connectionRateVo.callInTimes || 0)
    info.out = ref(res[0].resultData.connectionRateVo.callOutGotTimes || 0)
    info.outCount = ref(res[0].resultData.connectionRateVo.callOutTimes || 0)
    // 话务数据

    initChart(res[0].resultData.trafficDataVoList)
    // 用户信息
    info.userName = ref(res[0].resultData.userConsoleVo.loginName)
    info.code = ref(res[0].resultData.userConsoleVo.code)
    info.id = ref(res[0].resultData.userConsoleVo.id)
    info.roleName = ref(res[0].resultData.userConsoleVo.roleName)
    callStore.$patch({
      lastLineCode: res[0].resultData.userConsoleVo.code,
      lastLineId: res[0].resultData.userConsoleVo.codeId,
    })
    // 列表数据
    info.list = reactive(res[1].resultData.list)
    loading.value = false;
  })
}
// 图表生成
const initChart = (data = []) => {
  if (data.length == 0) return;
  const myChart = echarts.init(document.getElementById('lineChart'));
  myChart.setOption({
    title: {
      text: '话务数据'
    },
    legend: {
      right: '0px',
      itemStyle: {
        opacity: 0
      },
      data: ['话务量',]
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      nameRotate: 15,
      axisLabel: {
        interval: 0,
      },
      data: data.map(elm => elm.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '话务量',
        data: data.map(elm => elm.answerNum),
        type: 'line',
        symbol: 'none',
        lineStyle: {
          color: 'rgba(223, 6, 21, 1)'
        },
        areaStyle: {
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(223, 6, 21, 1)'
            },
            {
              offset: 1,
              color: 'rgba(255, 255, 255, 1)'
            }
          ])
        },
      }
    ],
    grid: {
      left: '40px',
      right: '40px'
    }
  });
}
onMounted(() => {

  getInfo()



})
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  grid-template-rows: 252px auto auto;

  .one {
    grid-column-start: 1;
    grid-column-end: 2;
    padding: 15px 20px;

    .userInfoItem {
      height: 100%;
      display: flex;
      // flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }

  .two {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .three {
    height: 100%;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    padding: 15px 20px;
  }

  .four {
    min-height: 500px;
    max-height: 700px;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
    padding: 15px 20px;
  }
}
</style>