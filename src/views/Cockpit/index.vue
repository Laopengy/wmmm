<template>
  <div class="Cockpit">
    <canvas id="trails"></canvas>
    <div class="content-box">
      <div class="left-menu">
        <div :class="['menu-item', active === 'session' ? 'active-item' : '']" @click="() => choseMenu('session')">联赛场次</div>
        <div :class="['menu-item', active === 'data' ? 'active-item' : '']" @click="() => choseMenu('data')">联赛数据</div>
        <div :class="['menu-item', active === 'member' ? 'active-item' : '']" @click="() => choseMenu('member')">帮会成员</div>
        <div :class="['menu-item', active === 'message' ? 'active-item' : '']" @click="() => choseMenu('message')">留言板</div>
      </div>
      <div class="segmentation"></div>
      <div class="right-data">
        <DataView v-if="active === 'data'"/>
        <Member v-if="active === 'member'"/>
        <MessageView v-if="active === 'message'"/>
        <Session v-if="active === 'session'"/>
      </div>
    </div>
  </div>
</template>

<script>
import DataView from './components/data.vue'
import Member from './components/member.vue'
import MessageView from './components/message.vue'
import Session from './components/session.vue'

import { mapState, mapActions } from 'pinia';
import { useFriday01Store } from '@/stores/friday01';


export default {
  name: 'CockpitView',
  components: {
    DataView,
    Member,
    MessageView,
    Session
  },
  data() {
    return {
      active: 'session'
    }
  },

  computed:{
    ...mapState(useFriday01Store, []),
  },


  mounted() {
    this.initFriday01()
    this.init()
  },
  methods: {
    ...mapActions(useFriday01Store, ['initFriday01']),

    init(){
      // 创建两个 canvas 元素，show 用于显示，help 作为辅助
      const help = document.createElement('canvas')
      const show = document.getElementById('trails')

      // 声明两个变量 showWidth 和 showHeight，用于存储显示区域的宽度和高度
      let showWidth, showHeight

      // 让两个 canvas 的宽高与显示区域的宽高一致
      show.width = help.width = showWidth = show.offsetWidth
      show.height = help.height = showHeight = show.offsetHeight

      const longSide = Math.max(showWidth, showHeight)
      // 使用长边构造成一个大点的正方形
      help.width = longSide * 2.6
      help.height = longSide * 2.6

      // 获取上下文
      const helpContext = help.getContext('2d')
      console.log(helpContext, '======>>>>> helpContext')
      const showContext = show.getContext('2d')

      // 设置显示区域背景色
      showContext.fillStyle = 'rgba(0,0,0,1)'
      showContext.fillRect(0, 0, showWidth, showHeight)

      // 创建随机颜色随机位置的星星
      function rand(Min, Max) {
        return Min + Math.round(Math.random() * (Max - Min))
      }

      // 随机颜色（指定范围）
      function randomColor() {
        const r = rand(120, 255)
        const g = rand(120, 255)
        const b = rand(120, 255)
        const a = rand(30, 100) / 100
        return `rgba(${r},${g},${b},${a})`
      }

      // 星星数组
      const stars = []

      // 创建每个星星的属性
      function createStar() {
        return {
          x: rand(-help.width, help.width),
          y: rand(-help.height, help.height),
          size: 1.2,
          color: randomColor(),
        }
      }

      // 绘制星星实例
      function drawStar() {
        let count = stars.length
        while (count--) {
          const star = stars[count]
          helpContext.beginPath()
          helpContext.arc(star.x, star.y, star.size, 0, Math.PI * 2, true)
          helpContext.fillStyle = star.color
          helpContext.closePath()
          helpContext.fill()
        }
      }

      // 计时
      let drawTimes = 0
      // 循环
      function loop() {
        // 开始绘制
        showContext.drawImage(help, -help.width / 2, -help.height / 2)

        drawTimes++

        if (drawTimes > 200 && drawTimes % 8 === 0) {
          showContext.fillStyle = 'rgba(0,0,0,.04)'
          showContext.fillRect(-(longSide * 3), -(longSide * 3), longSide * 6, longSide * 6)
        }
        // 旋转
        showContext.rotate(0.025 * Math.PI / 180)
      }

      let count = 3000

      while (count--)
        stars.push(createStar())

      drawStar()

      // 根据比例调整圆心
      if (showWidth < showHeight)
        showContext.translate(showWidth, showHeight)
      else
        showContext.translate(showWidth, 0)

      function animate() {
        window.requestAnimationFrame(animate)
        loop()
      }

      animate()

      // 监听浏览器窗口变化，变化则重新执行animate函数
      window.addEventListener('resize', () => {
        showWidth = show.offsetWidth
        showHeight = show.offsetHeight
        show.width = showWidth
        show.height = showHeight
        showContext.fillStyle = 'rgba(0,0,0,1)'
        showContext.fillRect(0, 0, showWidth, showHeight)
      })
    },
    choseMenu(val) {
      this.active = val
    },
  },
}
</script >
<style lang="scss">
.Cockpit {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.content-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  height: 90%;
  box-shadow: 10px 10px 16px rgba(255, 255, 255, 0.4);
  background: rgba($color: #fff, $alpha: .9);
  // background: rgba($color: #000, $alpha: .4);
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  .segmentation{
    width: 3px;
    height: 100%;
    background: linear-gradient(45deg, #ffadad, #fdffb6, #9bf6ff, #a0c4ff, #b2ffd1);
  }
  // 左侧菜单
  .left-menu {
    width: calc(15vw - 3px);
    height: 100%;
    .menu-item {
      cursor: pointer;
      margin: 10px auto;
      width: 80%;
      height: 40px;
      line-height: 40px;
      font-weight: 500;
      text-align: center;
      border-radius: 10px;
    }
    .active-item {
      background: rgba($color: #000, $alpha: .2);
      color: #fff;
    }
  }
  // 右侧数据
  .right-data {
    width: 85%;
    height: 100%;
    padding: 20px;
  }
}


</style>
