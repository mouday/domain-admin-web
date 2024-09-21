<template>
  <div class="">

    <el-form class="login-form" ref="form" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="" prop="username">
        <el-input v-model="form.username" auto-complete="off" placeholder="用户名" />
      </el-form-item>

      <el-form-item label="" prop="password">
        <el-input v-model="form.password" type="password" auto-complete="new-password" placeholder="密码"
          @keypress.enter="debounceOnSubmit" />
      </el-form-item>
    </el-form>

    <div>
      <button class="w-full mt-md login-button" @click.native.prevent="debounceOnSubmit">
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

  computed: {
    ...mapState(useSystemStore, {
      enabledRegister: 'enabledRegister',
    }),
  },

  methods: {
    async getData() { },

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
        
        this.$emit('on-success')
      }
    },
  },

  created() {
    this.debounceOnSubmit = lodash.debounce(this.onSubmit, 500);
    this.getData()
  },
}
</script>

<style lang="less">
</style>
