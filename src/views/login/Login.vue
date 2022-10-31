<template>
  <div class="login-container">
    <h3 class="title">登录</h3>

    <el-form
      class=""
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
          auto-complete="off"
          placeholder="密码"
          @keypress.enter="onSubmit"
        />
      </el-form-item>
    </el-form>

    <div>
      <el-button
        class="w-full mt-md"
        type="primary"
        size="large"
        @click.native.prevent="onSubmit"
        >登 录</el-button
      >
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

<style lang="less"></style>

<style scoped>
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
  border-radius: 5px;
  /* -moz-border-radius: 5px; */
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.title {
  /* margin: 0px auto 40px auto; */
  margin-bottom: 30px;
  text-align: center;
  color: #505458;
  font-size: 26px;
}
</style>
