<template>
  <div class="login-container-wrap">
    <div class="login-container">
      <h3 class="title">Domain Admin</h3>

      <el-form
        class="login-form"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item
          label=""
          prop="username"
        >
          <el-input
            v-model="form.username"
            auto-complete="off"
            placeholder="用户名"
          />
        </el-form-item>

        <el-form-item
          label=""
          prop="password"
        >
          <el-input
            v-model="form.password"
            type="password"
            auto-complete="new-password"
            placeholder="密码"
            @keypress.enter="onSubmit"
          />
        </el-form-item>
      </el-form>

      <div>
        <button
          class="w-full mt-md login-button"
          @click.native.prevent="onSubmit"
        >
          {{ $t('登录') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// created at 2022-10-01
import { setToken } from '@/utils/token-util.js'

export default {
  name: 'Login',

  props: {},

  components: {},

  data() {
    return {
      form: {
        username: '',
        password: '',
      },

      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {},

  methods: {
    async getData() {},

    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmSubmit()
        } else {
          return false
        }
      })
    },

    async confirmSubmit() {
      const res = await this.$http.login({
        username: this.form.username,
        password: this.form.password,
      })

      console.log(res)

      if (res.code == 0) {
        setToken(res.data.token)

        this.$msg.success('登录成功')

        let path = '/'
        if (this.$route.query.redirect) {
          path = this.$route.query.redirect
        }

        this.$router.push({
          path,
        })
      }
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
</style>
