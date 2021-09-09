<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import VConsole from "vconsole"

// import { Howl, Howler } from "howler"

export default {
  name: "App",
  components: {},
  async created() {
    // 初始化 语言
    let info = localStorage.getItem("isEn")
    this.$store.commit("setLang", (info == "en" && info) || "cn")

    // 初始化 餐厅信息
    let canteenInfo = localStorage.getItem("canteenInfo")
    if (canteenInfo) {
      canteenInfo = JSON.parse(canteenInfo)
      this.$store.commit("setCanteenInfo", canteenInfo)

      // 有餐厅信息 就触发socket
      this.$socket.emit("setCanteen", canteenInfo.canteenId)

      this.$store.dispatch("getSetting") // 获取餐厅打印设置信息
    }
    console.log(canteenInfo, "看看保存本地的餐厅信息")
  },
}
</script>

<style>
#app {
  /* color: #333333; 全局字体颜色 */
}
body {
  margin: 0px;
}
</style>
