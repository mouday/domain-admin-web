<template>
  <div class="login-container-wrap">
    <div class="login-container">
      <h3 class="title">Domain Admin</h3>

      <!-- 邮箱登录 -->
      <template v-if="loginTypeEnum.LOGIN_BY_EMAIL == loginType">
        <EmailLogin @on-success="handleSuccess"></EmailLogin>

      </template>

      <!-- 账号密码 -->
      <template v-else>
        <UserLogin @on-success="handleSuccess"></UserLogin>
      </template>

      <!-- 允许注册 -->
      <div v-if="enabledRegister" class="mt-md">
        <template v-for="item in loginTypeOptions">
          <div class="mo-link" v-if="loginType == item.value" @click="() => { handleChangeLoginMethod(item) }">{{
            item.label }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// created at 2022-10-01
import { setToken } from '@/utils/token-util.js'
import { useSystemStore } from '@/store/system-store.js'
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
    label: '账号登录'

  },
  {
    value: loginTypeEnum.LOGIN_BY_USER,
    toValue: loginTypeEnum.LOGIN_BY_EMAIL,
    label: '邮箱验证码登录'
  }
]

export default {
  name: 'Login',

  props: {},

  components: {
    EmailLogin,
    UserLogin
  },

  data() {
    return {
      loginTypeEnum,
      loginType: loginTypeEnum.LOGIN_BY_USER,
      loginTypeOptions
    }
  },

  computed: {
    ...mapState(useSystemStore, {
      enabledRegister: 'enabledRegister',
    }),
  },

  methods: {
    async getData() { },



    handleChangeLoginMethod(item) {
      console.log(item);

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
  background-image: linear-gradient(90deg,
      rgb(45, 40, 255) -0.24%,
      rgb(26, 125, 255) 99.96%);
  border-radius: 0;
}

.login-button:hover {
  opacity: 0.9;
}
</style>
