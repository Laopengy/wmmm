<template>
  <div class="session">
    <div class="box-card" v-for="item in 3" :key="item">
      <div class="left-info">
        <div class="vs-line">
          <div v-if="item === 1">
            {{ `对阵： ${our.name} --- ${enemy.name}` }}
          </div>
          <div v-if="item === 2">
            {{ `对阵： ${our2.name} --- ${enemy2.name}` }}
          </div>
          <div v-if="item === 3">
            {{ `对阵： ${our3.name} --- ${enemy3.name}` }}
          </div>
          <div v-if="item === 1" class="time-line mt-10">
            {{ `场次： 周五第一场` }}
          </div>
          <div v-if="item === 2" class="time-line mt-10">
            {{ `场次： 周五第二场` }}
          </div>
          <div v-if="item === 3" class="time-line mt-10">
            {{ `场次： 周六第一场` }}
          </div>
        </div>
        
        <div class="info-card" v-if="item === 1">
          <div class="data-line data-left-box">
            <div class="left-box-item">
              <div class="data-item-left">{{ `我方击杀：${our.AllData.aggregateDefeat}` }}</div>
              <div class="data-item-left">{{ `我方重伤：${our.AllData.aggregateDeath}` }}</div>
              <div class="data-item-left">{{ `我方治疗：${our.AllData.aggregateHeal}` }}</div>
              <div class="data-item-left">{{ `我方资源：${our.AllData.aggregateAssets}` }}</div>
            </div>
          </div>
          <div class="data-line">
            <div class="data-item">{{ `敌方击杀：${enemy.AllData.aggregateDefeat}` }}</div>
            <div class="data-item">{{ `敌方重伤：${enemy.AllData.aggregateDeath}` }}</div>
            <div class="data-item">{{ `敌方治疗：${enemy.AllData.aggregateHeal}` }}</div>
            <div class="data-item">{{ `敌方资源：${enemy.AllData.aggregateAssets}` }}</div>
          </div>
        </div>
        <div class="info-card" v-if="item === 2">
          <div class="data-line data-left-box">
            <div class="left-box-item">
              <div class="data-item-left">{{ `我方击杀：${our2.AllData.aggregateDefeat}` }}</div>
              <div class="data-item-left">{{ `我方重伤：${our2.AllData.aggregateDeath}` }}</div>
              <div class="data-item-left">{{ `我方治疗：${our2.AllData.aggregateHeal}` }}</div>
              <div class="data-item-left">{{ `我方资源：${our2.AllData.aggregateAssets}` }}</div>
            </div>
          </div>
          <div class="data-line">
            <div class="data-item">{{ `敌方击杀：${enemy2.AllData.aggregateDefeat}` }}</div>
            <div class="data-item">{{ `敌方重伤：${enemy2.AllData.aggregateDeath}` }}</div>
            <div class="data-item">{{ `敌方治疗：${enemy2.AllData.aggregateHeal}` }}</div>
            <div class="data-item">{{ `敌方资源：${enemy2.AllData.aggregateAssets}` }}</div>
          </div>
        </div>
        <div class="info-card" v-if="item === 3">
          <div class="data-line data-left-box">
            <div class="left-box-item">
              <div class="data-item-left">{{ `我方击杀：${our3.AllData.aggregateDefeat}` }}</div>
              <div class="data-item-left">{{ `我方重伤：${our3.AllData.aggregateDeath}` }}</div>
              <div class="data-item-left">{{ `我方治疗：${our3.AllData.aggregateHeal}` }}</div>
              <div class="data-item-left">{{ `我方资源：${our3.AllData.aggregateAssets}` }}</div>
            </div>
          </div>
          <div class="data-line">
            <div class="data-item">{{ `敌方击杀：${enemy3.AllData.aggregateDefeat}` }}</div>
            <div class="data-item">{{ `敌方重伤：${enemy3.AllData.aggregateDeath}` }}</div>
            <div class="data-item">{{ `敌方治疗：${enemy3.AllData.aggregateHeal}` }}</div>
            <div class="data-item">{{ `敌方资源：${enemy3.AllData.aggregateAssets}` }}</div>
          </div>
        </div>
      </div>
      <div class="placeholder"></div>
      <!-- 右侧图表 -->
      <div class="right-box">
        <div :id="`echarts${item}`" class="echarts-box"></div>
      </div>
    </div>
  </div>
</template>

<script>


import { mapState } from 'pinia';
import { useFriday01Store } from '@/stores/friday01';
import { useFriday02Store } from '@/stores/friday02';
import { useSaturdaystore } from '@/stores/Saturday';
import * as echarts from 'echarts';


export default {
  name: 'sessionView',
  components: {
  },
  data() {
    return {
    }
  },

  computed:{
    ...mapState(useFriday01Store, ['our', 'enemy', 'maxData']),
    ...mapState(useFriday02Store, ['our2', 'enemy2', 'maxData2']),
    ...mapState(useSaturdaystore, ['our3', 'enemy3', 'maxData3']),
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initEcharts1()
        this.initEcharts2()
        this.initEcharts3()
        console.log(this.maxData, '====>>>> maxData');
      }, 500)
    })
  },
  methods: {

    initEcharts1() {
      let chartDom = document.getElementById('echarts1');
      let myChart = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: 'item'
        },
        radar: {
          indicator: [
            { name: '人数', max: 120 },
            { name: '对玩家伤害', max: this.maxData.dp },
            { name: '对建筑伤害', max: this.maxData.dc },
            { name: '战备资源', max: this.maxData.assets },
            { name: '控制', max: this.maxData.controls },
            { name: '治疗量', max: this.maxData.healing },
          ]
        },
        series: [
          {
            name: `${this.our.name} vs ${this.enemy.name}`,
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            areaStyle: {},
            data: [
              {
                value: [this.our.MemberLength, this.our.AllData.aggregateHurt, this.our.AllData.aggregateHurtTower, this.our.AllData.aggregateAssets, this.our.AllData.aggregateControls, this.our.AllData.aggregateHeal],
                name: this.our.name
              },
              {
                value: [this.enemy.MemberLength, this.enemy.AllData.aggregateHurt, this.enemy.AllData.aggregateHurtTower, this.enemy.AllData.aggregateAssets, this.enemy.AllData.aggregateControls, this.enemy.AllData.aggregateHeal],
                name: this.enemy.name
              },
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    initEcharts2() {
      let chartDom = document.getElementById('echarts2');
      let myChart = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: 'item'
        },
        radar: {
          indicator: [
            { name: '人数', max: 120 },
            { name: '对玩家伤害', max: this.maxData2.dp },
            { name: '对建筑伤害', max: this.maxData2.dc },
            { name: '战备资源', max: this.maxData2.assets },
            { name: '控制', max: this.maxData2.controls },
            { name: '治疗量', max: this.maxData2.healing },
          ]
        },
        series: [
          {
            name: `${this.our2.name} vs ${this.enemy2.name}`,
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            areaStyle: {},
            data: [
              {
                value: [this.our2.MemberLength, this.our2.AllData.aggregateHurt, this.our2.AllData.aggregateHurtTower, this.our2.AllData.aggregateAssets, this.our2.AllData.aggregateControls, this.our2.AllData.aggregateHeal],
                name: this.our2.name
              },
              {
                value: [this.enemy2.MemberLength, this.enemy2.AllData.aggregateHurt, this.enemy2.AllData.aggregateHurtTower, this.enemy2.AllData.aggregateAssets, this.enemy2.AllData.aggregateControls, this.enemy2.AllData.aggregateHeal],
                name: this.enemy2.name
              },
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    initEcharts3() {
      let chartDom = document.getElementById('echarts3');
      let myChart = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: 'item'
        },
        radar: {
          indicator: [
            { name: '人数', max: 120 },
            { name: '对玩家伤害', max: this.maxData3.dp },
            { name: '对建筑伤害', max: this.maxData3.dc },
            { name: '战备资源', max: this.maxData3.assets },
            { name: '控制', max: this.maxData3.controls },
            { name: '治疗量', max: this.maxData3.healing },
          ]
        },
        series: [
          {
            name: `${this.our3.name} vs ${this.enemy3.name}`,
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            areaStyle: {},
            data: [
              {
                value: [this.our3.MemberLength, this.our3.AllData.aggregateHurt, this.our3.AllData.aggregateHurtTower, this.our3.AllData.aggregateAssets, this.our3.AllData.aggregateControls, this.our3.AllData.aggregateHeal],
                name: this.our3.name
              },
              {
                value: [this.enemy3.MemberLength, this.enemy3.AllData.aggregateHurt, this.enemy3.AllData.aggregateHurtTower, this.enemy3.AllData.aggregateAssets, this.enemy3.AllData.aggregateControls, this.enemy3.AllData.aggregateHeal],
                name: this.enemy3.name
              },
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
  },
}
</script >
<style lang="scss">

.box-card {
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 300px;
  background-color: #fff;
  box-shadow: 10px 10px 16px rgba(0, 0, 0, 0.4);
  .left-info {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .vs-line{
      width: 100%;
      text-align: center;
      font-family: STKaiti;
      font-weight: 600;
      font-size: 20px;
    }
    .time-line{
      width: 100%;
      color: #999;
      text-align: center;
      font-family: STKaiti;
      font-weight: 600;
      font-size: 16px;
    }
    .info-card {
      width: 100%;
      display: flex;
      .data-line{
        flex: 1;
      }
      .data-left-box {
        text-align: right;
        display: flex;
        justify-content: end;
      }
      .data-item {
        width: 200px;
        margin-left: 10px;
        margin-bottom: 5px;
      }
      .data-item-left {
        text-align: left;
        width: 200px;
        margin-bottom: 5px;
        margin-right: 10px;
      }
    }
  }
  .placeholder{
    width: 2px;
    height: 100%;
    background-color: #c0c0c0;
  }
}
.el-card__body {
  height: 100%;
}
.right-box {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.echarts-box {
  width: 100%;
  height: 300px;
}
</style>
