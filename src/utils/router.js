import Vue from "vue"
import VueRouter from "vue-router"
import { constantRouterMap } from "@/config/router_config"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }), // bug 不起作用
  routes: constantRouterMap,
})

router.onError((error) => {
  const targetPath = router.history.pending.fullPath
  console.log(targetPath, "目标路径", error)
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 判断登录相关
  if (to.name == "login") {
    return next()
  }
  // 如果是 404路由
  if (!to.name) {
    next({ name: "index" })
  }
  // 处理路由导航 redirect
  if (to.redirect) {
    next({ ...to.redirect, replace: true })
  }

  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
