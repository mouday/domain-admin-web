<template>
  <div class="login-wrap">
    <div class="login rounded-sm border-gray-100 p-md">
      <h1 class="text-4xl text-center">登录</h1>

      <el-form
        class="m-8 mt-md"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="form.username" />
        </el-form-item>

        <el-form-item
          label="密 码"
          prop="password"
        >
          <el-input
            v-model="form.password"
            type="password"
          />
        </el-form-item>

        <el-form-item class="text-center">
          <el-button
            class="w-full"
            type="primary"
            size="large"
            @click="onSubmit"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  width: 400px;
  background-color: rgba(0, 0, 0, 0.02);
  padding-top: 20px;
}
</style>
