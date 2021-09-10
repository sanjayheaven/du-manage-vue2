import BasicLayout from "../layouts/BasicLayout"
import login from "../views/login"

/**
 * 常用路由。未登录的页面路由
 *
 */

// 引入组件
// vue-router 懒加载 在electron下 会报错
import Product from "../views/product.vue"
import Order from "../views/order.vue"
import OrderDetail from "../views/orderDetail.vue"
import Console from "../views/console.vue"

export const childrenRoutes = [
  {
    path: "/console",
    name: "console",
    component: Console,
    meta: { title: "控制台", keepAlive: true },
  },
  {
    path: "/order",
    name: "order",
    component: Order,
    meta: { title: "订单", title_en: "Orders", keepAlive: true },
  },
  {
    path: "/orderDetail",
    name: "orderDetail",
    component: OrderDetail,
    hidden: true,
    meta: { title: "订单", title_en: "Orders" },
  },
  {
    path: "/product",
    name: "product",
    component: Product,
    meta: { title: "产品", title_en: "Product", keepAlive: true },
  },
]
export const constantRouterMap = [
  {
    path: "/",
    name: "index",
    redirect: "/console",
    component: BasicLayout,
    children: childrenRoutes,
    meta: { title: "首页" },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { title: "登录页" },
  },
]
