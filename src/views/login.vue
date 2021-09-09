<templat>
<div>
<du-button @click="handleLogin">登录</du-button>

</div>
</template>
<script>
const packageJson = require("../../package.json")
export default {
  created() {
  },
  computed: {
    isEn() {
      return this.$store.state.isEn
    },
  },
  data() {
    return {
      version: packageJson.version,
      loginInfo: {
        username: "",
        password: "",
      },
      canteens: [], //
    }
  },
  methods: {
    async handleLogin() {
      // 判断用户名
      let { username, password } = this.loginInfo
      if (username === "") {
        return this.$u1_alert(
          (this.isEn && "Please Input Username Or Phone") || "请输入用户名!"
        )
      }
      if (password === "") {
        return this.$u1_alert(
          (this.isEn && "Please Input Password") || "请输入密码!"
        )
      }
    },
  },
}
</script>
<style scoped></style>
