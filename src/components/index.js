import Vue from "vue"

const files = require.context("@/components", true, /\.vue$/)

files.keys().forEach((key) => {
  let name = key.match("[^/]+(?=\\.[^/.]*$)")[0]
  const componentConfig = files(key).default
  Vue.component(name, componentConfig)
})
