<template>
  <div class="login-container-wrap">
    <div class="login-container">
      <h3 class="title">Domain Admin</h3>

      <!-- 邮箱登录 -->
      <template v-if="enabledRegister && loginTypeEnum.LOGIN_BY_EMAIL == loginType">
        <EmailLogin @on-success="handleSuccess"></EmailLogin>
      </template>

      <!-- 账号密码 -->
      <template v-else>
        <UserLogin @on-success="handleSuccess"></UserLogin>
      </template>

      <!-- 允许注册 -->
      <div
        v-if="enabledRegister"
        class="mt-md"
      >
        <template v-for="item in loginTypeOptions">
          <div
            class="mo-link"
            v-if="loginType == item.value"
            @click="
              () => {
                handleChangeLoginMethod(item)
              }
            "
          >
            {{ item.label }}
          </div>
        </template>
      </div>

      <!-- SSO登录 -->
      <div
        v-if="oidcEnabled"
        class="mt-md"
      >
        <div class="divider">
          <span>或</span>
        </div>
        <button
          class="sso-login-button"
          @click="handleOidcLogin"
        >
          使用 SSO 登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// created at 2022-10-01
import { setToken, removeToken } from '@/utils/token-util.js'
import { useSystemStore } from '@/store/system-store.js'
import { useUserStore } from '@/store/user-store.js'
import { mapState, mapActions } from 'pinia'
import EmailLogin from './EmailLogin.vue'
import UserLogin from './UserLogin.vue'

const loginTypeEnum = {
  LOGIN_BY_USER: 'LOGIN_BY_USER',
  LOGIN_BY_EMAIL: 'LOGIN_BY_EMAIL',
}

const loginTypeOptions = [
  {
    value: loginTypeEnum.LOGIN_BY_EMAIL,
    toValue: loginTypeEnum.LOGIN_BY_USER,
    label: '账号登录',
  },
  {
    value: loginTypeEnum.LOGIN_BY_USER,
    toValue: loginTypeEnum.LOGIN_BY_EMAIL,
    label: '邮箱验证码登录',
  },
]

export default {
  name: 'Login',

  props: {},

  components: {
    EmailLogin,
    UserLogin,
  },

  data() {
    return {
      loginTypeEnum,
      loginType: loginTypeEnum.LOGIN_BY_EMAIL,
      loginTypeOptions,
      oidcEnabled: false,
    }
  },

  computed: {
    ...mapState(useSystemStore, {
      enabledRegister: 'enabledRegister',
    }),
  },

  methods: {
    async getData() {
      // 检查URL参数中是否有token（OIDC回调）
      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token')

      if (token) {
        // 保存token
        setToken(token)

        // 获取用户信息
        const userStore = useUserStore()
        await userStore.updateUserInfo()

        // 检查是否成功获取用户信息
        if (!userStore.hasUserInfo) {
          // API已经显示了错误消息，这里只需要清理状态
          removeToken()

          // 清除URL中的token参数，避免刷新后重复尝试
          const url = new URL(window.location.href)
          url.search = ''
          window.history.replaceState({}, '', url.toString())

          return
        }

        // 确定跳转路径
        let path = this.$route.query.redirect || '/'
        this.$msg.success('登录成功')

        // 清除URL中的token参数（hash之前的query参数）
        const url = new URL(window.location.href)
        url.search = '' // 清除所有query参数
        window.history.replaceState({}, '', url.toString())

        // 跳转到目标页面
        this.$router.replace({ path })
        return
      }

      // 获取OIDC配置
      const res = await this.$http.getOidcConfig()
      if (res.ok) {
        this.oidcEnabled = res.data.enabled
      }
    },

    handleChangeLoginMethod(item) {
      console.log(item)

      this.loginType = item.toValue
    },

    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmSubmit()
        } else {
          return false
        }
      })
    },

    async handleSuccess() {
      this.$msg.success('登录成功')

      let path = '/'
      if (this.$route.query.redirect) {
        path = this.$route.query.redirect
      }

      this.$router.push({
        path,
      })
    },

    handleOidcLogin() {
      // 跳转到OIDC登录端点
      window.location.href = this.$resolve_api_url('/oidc/login')
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less">
.login-container-wrap {
  height: 100%;
  /* background-color: #1e222d; */

  background-color: #1e222d;
  /* padding-top: 180px; */

  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap {
  /* height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center; */
  /* background-image: url(https://api.isoyu.com/bing_images.php); */
}

.login-container {
  /* width: 400px; */
  /* background-color: rgba(0, 0, 0, 0.02); */
  /* padding-top: 20px; */

  /* -webkit-border-radius: 5px; */
  /* border-radius: 5px; */
  border-radius: 12px;
  // /* -moz-border-radius: 5px; */
  // background-clip: padding-box;
  /* margin: 180px auto; */
  /* width: 350px;
  padding: 35px; */
  /* background: #fff; */
  /* border: 1px solid #eaeaea; */
  /* background-color: #1e222d; */
  width: 420px;
  padding: 42px 48px;
  background-color: #fff;
  /* box-shadow: 0 0 25px #cac6c6; */
}

.title {
  /* margin: 0px auto 40px auto; */
  /* margin-bottom: 30px; */
  /* text-align: center; */
  /* color: #505458; */
  /* color: #ffffff; */
  /* font-weight: bold;
  font-size: 26px; */

  font-size: 26px;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
}

.login-form {
  margin-top: 28px;

  .el-input__inner {
    font-size: 16px;
    border-color: transparent;
    // background-color: #f2f5f9;
    height: 48px;
    line-height: 48px;
    color: #333;
  }

  .el-input__inner::placeholder {
    color: #a3acb5;
    font-size: 14px;
    font-weight: normal;
  }

  // 自动填入样式
  .el-input__inner:-internal-autofill-previewed,
  .el-input__inner:-internal-autofill-selected {
    -webkit-text-fill-color: #333;
    font-size: 16px;
    transition: background-color 1000s ease-out 0.5s;
  }

  .el-input__wrapper {
    background-color: #f2f5f9;
    padding: 0 20px;
    box-shadow: unset;
    border-radius: 0;
  }

  .el-form-item.is-error .el-input__wrapper {
    box-shadow: unset;
  }
}

.login-button {
  // transition-property: color, background-color, border-color,
  //   text-decoration-color, fill, stroke;
  // transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  // transition-duration: 0.15s;
  color: #fff;
  height: 48px;
  line-height: 48px;
  background-image: linear-gradient(
    90deg,
    rgb(45, 40, 255) -0.24%,
    rgb(26, 125, 255) 99.96%
  );
  border-radius: 0;
}

.login-button:hover {
  opacity: 0.9;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  color: #a3acb5;
  font-size: 14px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e5e7eb;
}

.divider span {
  padding: 0 10px;
}

.sso-login-button {
  width: 100%;
  height: 48px;
  line-height: 48px;
  border: 1px solid #d1d5db;
  background-color: #fff;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 0;
}

.sso-login-button:hover {
  background-color: #f9fafb;
  border-color: #2d28ff;
}
</style>
