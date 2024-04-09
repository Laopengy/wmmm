<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}

// 公共样式
.text-fffc {
  color: #fffc;
}
// 公共样式
.text-fff {
  color: #fff;
}
.text-kaiti {
  font-family: STKaiti;
}
.text-font-size-big {
  font-size: 25px;
}
.text-font-size-small {
  font-size: 15px;
}
.mb-5 {
  margin-bottom: 5px;
}
.mr-5 {
  margin-right: 5px;
}
.mt-5 {
  margin-top: 5px;
}
.ml-5 {
  margin-left: 5px;
}
.mb-10 {
  margin-bottom: 10px;
}
.mr-10 {
  margin-right: 10px;
}
.mt-10 {
  margin-top: 10px;
}
.ml-10 {
  margin-left: 10px;
}

</style>
