import Vue from "vue"

import du_alert from "../components/du/notification/du-alert"
import du_confirm from "../components/du/notification/du-confirm"
import du_loading from "../components/du/display/du-loading"
import du_message from "../components/du/notification/du-message"
const U1_alert = Vue.extend(du_alert)
const U1_confirm = Vue.extend(du_confirm)
const U1_loading = Vue.extend(du_loading)
const U1_message = Vue.extend(du_message)

let instanceIndex = 1
let instances = []
const $du_message = function(options) {
  let id = "message-" + instanceIndex++
  options = options || {}
  options = (typeof options == "string" && { message: options }) || options
  const instance = new U1_message({
    data: options, // 组件内部用的是data
  })
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  // console.log(instance.$el, instance.$el.style, 1111111)
  instance.show = true // 实例中 message
  return instance
}
let types = ["success", "warning", "info", "error"]
types.forEach((type) => {
  $du_message[type] = (options) => {
    options = (typeof options == "string" && { message: options }) || options
    options.type = type
    return $du_message({
      ...options,
      type,
    })
  }
})

export default {
  $du_message,
  $du_alert: function(options) {
    options = (typeof options == "string" && { message: options }) || options
    const instance = new U1_alert({
      data: options, // 组件内部用的是data
    })
    instance.$mount()
    document.body.appendChild(instance.$el)
    instance.show = true // 实例中 打开对话框
    return instance
  },
  $du_confirm: function(options) {
    options = (typeof options == "string" && { message: options }) || options
    const instance = new U1_confirm({
      data: options, // 组件内部用的是data
    })
    instance.$mount()
    document.body.appendChild(instance.$el)
    instance.show = true // 实例中 打开对话框
    return instance
  },
  $du_loading: function(options) {
    options = (typeof options == "string" && { message: options }) || options
    const instance = new U1_loading({
      data: options, // 组件内部用的是data
    })
    instance.$mount()
    document.body.appendChild(instance.$el)
    instance.show = true // 实例中 打开loading
    return instance
  },
}
