// 注册 axios 请求工具

const axios = require("axios")
const lodash = require("lodash")
import config from "../config/env_config"
import notification from "./notification"
let $du_loading = notification.$du_loading
let $du_message = notification.$du_message

// 加载loading
let du_loading
const showLoading = function() {
  if (!du_loading) {
    du_loading = $du_loading()
    return
  }
}

const hideLoading = function() {
  du_loading = du_loading || $du_loading()
  du_loading.close()
  du_loading = undefined
}

const instance = axios.create({
  baseURL: config.instance.baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})

//
const isEn = localStorage.getItem("isEn") == "en"
instance.interceptors.request.use(
  function(config) {
    showLoading()
    const canteenInfo = localStorage.getItem("canteenInfo")
    // console.log(config, canteenInfo, 22222)
    if (canteenInfo) {
      config.headers["canteenInfo"] = encodeURIComponent(canteenInfo) //  包含中文需要编码
    }
    return config
  },
  function(error) {
    hideLoading()
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    hideLoading()
    let { method } = response.config
    if (["post", "put"].includes(method)) {
      $u1_message.success((isEn && "Success!") || "操作成功!")
      // console.log(response, 2222222777171)
    }
    return response.data
  },
  function(error) {
    hideLoading()
    let info = {}
    if (!error.response) {
      info.code = 404
      info.message = "网络连接错误,请稍等"
      info.message_en = "Network Error"
      $u1_message.error((isEn && info.message_en) || info.message)
    } else {
      info.code = error.response.code
      info.message = error.response.data.message
      info.message_en = error.response.data.message_en
      // if (info.status === 500) {
      //   info.message = "服务器内部错误"
      //   info.message_en = "Internal Server Error"
      // }
      $du_message.error((isEn && info.message_en) || info.message)
    }
    return Promise.reject(info)
  }
)

export default instance
