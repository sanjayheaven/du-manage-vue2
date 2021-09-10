<template>
  <div>
    <div id="header">
      <div style="display: flex;align-items: center;">
        <div style="margin-right: 10px;">
          <img
            style="width: 50px;height: 50px;"
            src="@/assets/avatar.jpg"
            alt=""
          />
        </div>
        <div style="color: #40A4FA;font-size: large;font-weight: bold;">
          <div>du-manage-vue2</div>
        </div>
      </div>
      <div style="display: flex;align-items: center;padding: 0px 10px;">
        <lang style="margin-right: 25px;" />
        <el-dropdown>
          <div
            style="display: flex;align-items: center;background-color: #f6f6f6;padding: 10px;"
          >
            <img class="imgItem" src="@/assets/avatar.jpg" />
            <div style="margin:0 10px;color: #333333;">{{ staffName }}</div>
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div style="display: flex;align-items: center;">
                <img class="imgItem" src="@/assets/avatar.jpg" />
                <div style="margin:0 10px;color: #333333;">{{ staffName }}</div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div
                @click.stop="handleLogout"
                style="text-align: center;font-size: larger;"
              >
                {{ (isEn && "Log Out") || "退出" }}
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!--这里的content 需要减去上面的高度 height + paddingTop + paddingBottom  -->
    <div id="content">
      <!-- 侧边栏 -->
      <div id="side">
        <div class="sideContent">
          <div
            class="menuItem"
            :class="[($route.name == item.routeName && 'activeMenu') || '']"
            v-for="(item, index) in menus"
            :key="item._id || index"
            @click="
              $route.name != item.routeName &&
                $router.push({ name: item.routeName })
            "
          >
            {{ (isEn && item.name_en) || item.name_cn }}
          </div>
        </div>
      </div>

      <div
        id="container"
        style="
        width: 100%;height: 100%; overflow-y: auto;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        "
      >
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </div>
  </div>
</template>
<script>
import { childrenRoutes } from "@/config/router_config.js"
import config from "@/config/env_config.js"

console.log(config, "看看环境是什么")
export default {
  computed: {
    isEn() {
      return this.$store.state.isEn
    },
  },
  methods: {
    handleToHelp() {
      console.log("跳转至帮助文档")
    },
    handleLogout() {
      console.log(1111)
      this.$du_confirm({
        message: (this.isEn && "Log out？") || "确认退出？",
        onConfirm: () => {
          // 清空登录信息
        },
      })
    },
  },
  data() {
    return {
      staffName: "admin",
      menus: childrenRoutes
        .map((item) => {
          return (
            (!item.hidden && {
              name_cn: item.meta.title,
              name_en: item.meta.title_en,
              routeName: item.name,
            }) ||
            null
          )
        })
        .filter((i) => i),
    }
  },
}
</script>
<style scoped>
#header {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
}
#content {
  padding: 10px;
  height: calc(100vh - 80px);
  display: flex;
  background-color: #f6f6f6;
}
#side {
  max-height: 100%;
  width: 80px;
  text-align: center;
  position: relative;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #f6f6f6;
}
.menuItem {
  height: 65px;
  line-height: 65px;
  text-align: center;
  /* padding: 20px; */
  color: white;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.sideContent {
  background-color: #333;
  min-height: 100%;
  /* background-color: #001529; */
}
.activeMenu {
  background: linear-gradient(180deg, #31c6fc 0%, #40a4fa 100%);
}

.imgItem {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>
