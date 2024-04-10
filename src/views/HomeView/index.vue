<template>
  <div class="home">
    <!-- 星空 -->
    <div class="trails-box" :style="`top: ${goDetaik ? '-66%' : 0}`">
      <canvas id="trails"></canvas>
    </div>
    <!-- logo 首次展示 -->
    <div class="wm-logo" v-if="!goDetaik">
      <img src="../../assets/wm-logo-1.png" alt="微梦" @click="go">
      <div class="logo-text">
        <span class="red"></span>
        <span class="yellow"></span>
        <span class="green"></span>
        <span>微光耀日月，梦想逐星辰</span>
      </div>
    </div>
    <!-- 主页页面 点击后展示 -->
    <div class="content">
      <!-- 简介 -->
      <div class="text-box" >
        <!-- 文字渐出 -->
        <transition name="fade">  
          <div v-if="showContent">
            <div class="text-1">逆水寒里的偶遇</div>
            <div class="text-1">一定是宿命的相逢</div>
            <div class="text-1">即使游戏的旅途会暂停</div>
            <div class="text-1">友谊的光也会如传说般永恒</div>
            <div class="text-2">We're making the world a better place</div>
          </div>
        </transition>  
      </div>
      <!-- 近期战况 -->
      <div class="situation-line mt-10">
        <div class="text-fff text-kaiti text-font-size-big">最近战况</div>
        <div class="situation-card">
          <div class="situation-card-item win-box">
            <span class="text-fff text-kaiti text-font-size-big">满月 - 蜜雪冰城</span>
          </div>
          <div class="situation-card-item win-box">
            <div class="text-fff text-kaiti text-font-size-big">满月 - 微醺麓栈</div>
          </div>
          <div class="situation-card-item win-box">
            <div class="text-fff text-kaiti text-font-size-big">满月 - 雁回西楼</div>
          </div>
          <div class="situation-card-item lose-box">
            <div class="text-fff text-kaiti text-font-size-big">满月 - 天宫</div>
          </div>
        </div>
      </div>
      <!-- 精英展示区 -->
      <div class="elite-line mt-10">
        <div class="text-fff text-kaiti text-font-size-big">联赛之星</div>
        <div class="elite-card">
          <div class="elite-card-item border-gradation">
            <div class="text-fff text-kaiti text-font-size-big mb-5">法外狂徒</div>
            <div class="text-fff text-kaiti text-font-size-small">击杀之最</div>
          </div>
          <div class="elite-card-item border-gradation">
            <div class="text-fff text-kaiti text-font-size-big mb-5">奶妈</div>
            <div class="text-fff text-kaiti text-font-size-small">治疗之光</div>
          </div>
          <div class="elite-card-item border-gradation">
            <div class="text-fff text-kaiti text-font-size-big mb-5">末醉</div>
            <div class="text-fff text-kaiti text-font-size-small">塔见愁</div>
          </div>
          <div class="elite-card-item border-gradation">
            <div class="text-fff text-kaiti text-font-size-big mb-5">野生小黄鱼</div>
            <div class="text-fff text-kaiti text-font-size-small">控制</div>
          </div>
        </div>
      </div>
      <!-- go 数据分析页面 -->
      <div class="go">
        <div class="go-btn" @click="goCockpit">
          前往数据分析
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      goDetaik: false,
      showContent: false,
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
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
    go() {
      this.goDetaik = true
      setTimeout(() => {
        this.showContent = true
      }, 500);
    },
    goCockpit() {
      this.$router.push('/cockpit')
    },
  },
}
</script >
<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  color: #fff;
  background-color: #000;
  position: relative;
}

.trails-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 1s linear;
  z-index: 1;
}
#trails {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.trails-box::after{
  content: '';
  width: 100%;
  height: 20%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.6);
  z-index: 1;
  -webkit-filter: blur(5px); /* Chrome, Opera */

  -moz-filter: blur(5px);

  -ms-filter: blur(5px);

  filter: blur(5px);
}

.wm-logo {
  width: 200px;
  height: 90px;
  position: absolute;
  bottom: 10%;
  left: 20%;
  z-index: 10;
  img{
    width: 200px;
    height: 75px;
    cursor: pointer;
  }
  img:hover {
    filter: drop-shadow(-8px 8px 5px #fff);
  }
  .logo-text {
    width: 200px;
    height: 10px;
    margin-top: 5px;
    text-align: center;
    color: #fff;
    font-weight: 600;
    font-size: 12px;
    font-family: STKaiti;
    display: flex;
    align-items: center;
    .red {
      margin-top: 3px;
      margin-right: 3px;
      display: inline-block;
      background-color: #e87975;
      border-radius: 50%;
      width: 10px;
      height: 10px;
    }
    .yellow {
      margin-top: 3px;
      margin-right: 3px;
      display: inline-block;
      background-color: #f4cc49;
      border-radius: 50%;
      width: 10px;
      height: 10px;
    }
    .green {
      margin-top: 3px;
      margin-right: 3px;
      display: inline-block;
      background-color: #78da89;
      border-radius: 50%;
      width: 10px;
      height: 10px;
    }
  }
}

.content {
  width: 100%;
  height: 66%;
  background-color: #000;
  position: absolute;
  top: 34%;
  left: 0;
  padding: 20px;
  .text-box {
    position: absolute;
    top: -200px;
    left: 10%;
    z-index: 20;
    .text-1 {
      font-size: 25px;
      font-weight: 500;
      color: #fffc;
      margin-bottom: 20px;
      font-family: STKaiti;
    }
    .text-2 {
      font-size: 18px;
      font-weight: 500;
      color: #fffc;
      margin-bottom: 20px;
      font-family: STKaiti;
    }
  }
  .situation-line {
    width: calc(100vw - 40px);
    .situation-card {
      margin-top: 10px;
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-around;
      overflow: hidden;
      .situation-card-item {
        cursor: pointer;
        width: 20%;
        height: 100px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

      }
    }
  }
  .elite-line {
    width: calc(100vw - 40px);
    .elite-card {
      margin-top: 10px;
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-around;
      .elite-card-item {
        cursor: pointer;
        width: 20%;
        height: 100px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: rgba($color: #595959, $alpha: .3);
      }
      .elite-card-item:hover {
        scale: 1.02;
        background: rgba($color: #595959, $alpha: .6);
      }
    }
  }
}

.go {
  position: fixed;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  width: calc(100vw - 40px);
  height: 40px;
  display: flex;
  justify-content: center;
  .go-btn {
    position: relative;
    cursor: pointer;
    width: 120px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-weight: 500;
    border-radius: 20px;
    font-family: sans-serif;
    text-decoration: none;
    text-transform: uppercase;
    background: linear-gradient(90deg,rgb(39, 122, 218),rgb(74, 230, 121),rgb(201, 214, 13),rgb(226, 20, 233),rgb(16, 172, 219));
    background-size: 400%;
    z-index: 1000;
  }
  .go-btn::after{
    content: '';
    position: absolute;
    top: -5px;
    left: -10px;
    width: 140px;
    height: 50px;
    background: linear-gradient(90deg,rgb(39, 122, 218),rgb(74, 230, 121),rgb(243, 169, 10),rgb(226, 20, 233),rgb(16, 172, 219));
    background-size: 400%;
    opacity: 0;
    z-index: -1;
    border-radius: 45px;
    transition: 0.6s;
  }
  .go-btn:hover::after{
    filter: blur(15px);
    opacity: 1;
    animation: move 8s linear alternate infinite;
  }
  .go-btn:hover{
    animation: move 5s linear alternate infinite;
  }
}

.fade-enter-active, .fade-leave-active {  
  transition: opacity 2s;  
}  
.fade-enter, .fade-leave-to {  
  opacity: 0;  
}

.border-gradation {
  border: 5px solid;
  border-image: linear-gradient(45deg, #ffadad, #fdffb6, #9bf6ff, #a0c4ff, #b2ffd1) 10 / 3px 3px stretch;
}
.border-gradation:hover {
  scale: 1.01;
  animation: moveborder 1s linear alternate infinite;
}

.win-box {
  border: 5px solid;
  border-image: linear-gradient(45deg, #0df958, #005421) 10 / 3px 3px stretch;
}
.win-box:hover {
  scale: 1.01;
  animation: moveborder 3s linear alternate infinite;
}
.lose-box {
  border: 5px solid;
  border-image: linear-gradient(45deg, #ff9696, #ff0000) 10 / 3px 3px stretch;
}
.lose-box:hover {
  scale: 1.01;
  animation: moveborder 3s linear alternate infinite;
}


@keyframes move{
  0%{
    background-position: 0%;
  }
  100%{
    background-position: 100%;
  }
}

@keyframes moveborder{
  from{
    filter: hue-rotate(0deg);
  }
  to{
    filter: hue-rotate(360deg);
  }
}



</style>
