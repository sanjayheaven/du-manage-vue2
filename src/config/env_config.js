const pro = {
  // instance: {
  //   baseURL: "http://dashboard.ebuy.company/test/pos/api/v1/manage",
  // },
  // publicPath: "/test/pos/manage/",
  // socketParam: {
  //   debug: true,
  //   connection: "//dashboard.ebuy.company",
  //   options: {
  //     path: `/test/pos/socket`,
  //   },
  // },
  instance: { baseURL: "http://10.0.217.4:3084/api/v1/manage" },
  manulUrl: "https://10.0.217.4:4000",
  publicPath: "./",
  clientUrl: "",

  socketParam: { debug: true, connection: "//10.0.217.4:3085" },
}

const dev = {
  instance: { baseURL: "http://localhost:3084/api/v1/manage" },
  manulUrl: "https://10.0.217.4:4000",
  socketParam: { debug: true, connection: "//127.0.0.1:3085" },
  clientUrl: "http://dashboard.ebuy.company/test/pos/client/#/", // 客户端地址
}

const test = {
  instance: { baseURL: "http://dashboard.ebuy.company/test/pos/api/v1/manage" },
  manulUrl: "https://dashboard.ebuy.company/test/pos/manual/index.html",
  publicPath: "/test/pos/manage/",
  socketParam: {
    debug: true,
    connection: "//dashboard.ebuy.company",
    options: { path: `/test/pos/socket` },
  },
  clientUrl: "http://dashboard.ebuy.company/test/pos/client/#/", // 客户端地址
}

const env = process.env.NODE_ENV

module.exports = (() => {
  console.log(env, "启动环境")
  if (env == "development") {
    return dev
  } else if (env == "test") {
    return test
  } else {
    return pro
  }
})()
