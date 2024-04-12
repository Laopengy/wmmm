<template>
  <div class="session">
    <div class="box-card">
      <div class="left-info">
        <div class="vs-line">
          {{ `对阵： ${our.name} --- ${enemy.name}` }}
        </div>
        <div class="info-card">
          <div class="data-line data-left-box">
            <div class="left-box-item">
              <div class="data-item-left">{{ `我方击杀：${our.AllData.aggregateDefeat}` }}</div>
              <div class="data-item-left">{{ `我方重伤：${our.AllData.aggregateDeath}` }}</div>
              <div class="data-item-left">{{ `我方治疗：${our.AllData.aggregateHeal}` }}</div>
              <div class="data-item-left">{{ `我方资源：${our.AllData.aggregateAssets}` }}</div>
            </div>
          </div>
          <div class="data-line">
            <div class="data-item">{{ `我方击杀：${our.AllData.aggregateDefeat}` }}</div>
            <div class="data-item">{{ `我方重伤：${our.AllData.aggregateDeath}` }}</div>
            <div class="data-item">{{ `我方治疗：${our.AllData.aggregateHeal}` }}</div>
            <div class="data-item">{{ `我方资源：${our.AllData.aggregateAssets}` }}</div>
          </div>
        </div>
      </div>
      <div class="placeholder"></div>
      <div></div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'pinia';
import { useFriday01Store } from '@/stores/friday01';


export default {
  name: 'sessionView',
  components: {
  },
  data() {
    return {
    }
  },

  computed:{
    ...mapState(useFriday01Store, ['our', 'enemy']),
  },

  mounted() {

  },
  methods: {

  },
}
</script >
<style lang="scss">

.box-card {
  border-radius: 10px;
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
</style>
