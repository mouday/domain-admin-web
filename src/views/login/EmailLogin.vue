<template>
  <div class="">
    <el-form
      class="login-form"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item
        label=""
        prop="email"
      >
        <el-input
          v-model="form.email"
          auto-complete="off"
          placeholder="邮箱（账号不存在会自动注册）"
        />
      </el-form-item>

      <el-form-item
        label=""
        prop="code"
      >
        <div class="login-code-wrap">
          <el-input
            v-model="form.code"
            type="password"
            auto-complete="new-password"
            placeholder="验证码"
            @keypress.enter="debounceOnSubmit"
          />
          <el-button
            type="primary"
            :disabled="disabled"
            @click="debounceHandleSendCode"
            >{{ codeText }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>

    <div>
      <button
        class="w-full mt-md login-button"
        @click.native.prevent="debounceOnSubmit"
      >
        {{ $t('登录') }}
      </button>
    </div>
  </div>
</template>

<script>
// created at 2022-10-01
import { setToken } from '@/utils/token-util.js'
import { useSystemStore } from '@/store/system-store.js'
import { mapState, mapActions } from 'pinia'
import lodash from 'lodash'
import { isEmail } from '@/utils/validator-util.js'

export default {
  name: 'Login',

  props: {},

  components: {},

  data() {
    return {
      disabledTime: 0,
      timer: null,

      form: {
        email: '',
        code: '',
      },

      rules: {
        email: [
          {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('邮箱不能为空'))
              } else if (!isEmail(value)) {
                return callback(new Error('邮箱不正确'))
              } else {
                callback()
              }
            },
          },
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    ...mapState(useSystemStore, {
      enabledRegister: 'enabledRegister',
    }),

    disabled() {
      return this.disabledTime > 0
    },

    codeText() {
      if (this.disabledTime > 0) {
        return `已发送 ${this.disabledTime}s`
      } else {
        return '发送验证码'
      }
    },
  },

  methods: {
    timerDown() {
      this.disabledTime = 60

      this.timer = setInterval(() => {
        if (this.disabledTime <= 0) {
          this.disabledTime = 0
          clearTimeout(this.timer)
        } else {
          this.disabledTime--
        }
      }, 1000)
    },

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

    async handleSendCode() {
      if (!isEmail(this.form.email)) {
        this.$msg.warning('邮箱不正确')
        return
      }

      this.timerDown()

      const res = await this.$http.sendCode({
        email: this.form.email,
      })

      console.log(res)

      if (res.ok) {
        this.$msg.success('发送成功')
      }
    },

    async confirmSubmit() {
      const res = await this.$http.loginByEmail({
        email: this.form.email,
        code: this.form.code,
      })

      console.log(res)

      if (res.code == 0) {
        setToken(res.data.token)
        this.$emit('on-success')
      }
    },
  },

  created() {
    this.debounceOnSubmit = lodash.debounce(this.onSubmit, 500)
    this.debounceHandleSendCode = lodash.debounce(this.handleSendCode, 500)
    this.getData()
  },
}
</script>

<style lang="less">
.login-code-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f2f5f9;
  padding-right: 10px;
}
</style>
