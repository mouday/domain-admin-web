<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <!-- 旧密码 -->

      <el-form-item
        label="旧密码"
        prop="password"
      >
        <el-input
          type="text"
          v-model="form.password"
          placeholder="请输入旧密码"
        ></el-input>
      </el-form-item>

      <!-- 新密码 -->

      <el-form-item
        label="新密码"
        prop="new_password"
      >
        <el-input
          type="text"
          v-model="form.new_password"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center">
      <el-button @click="handleCancel">{{ $t('取消') }}</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >{{ $t('确定') }}</el-button
      >
    </div>
  </div>
</template>

<script>
/**
 * props:
 *  row
 *
 * event:
 *  on-cancel
 *  on-success
 *
 * created 2022-10-03
 * */
import {
  formRules,
  // 引入枚举值
} from './config.js'
import { useUserStore } from '@/store/user-store.js'
import { useSystemStore } from '@/store/system-store.js'
import { mapState, mapActions } from 'pinia'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {},

  data() {
    return {
      // 引入枚举值
      form: {
        // 旧密码
        password: '',
        // 新密码
        new_password: '',
      },

      rules: formRules,
    }
  },

  computed: {},

  methods: {
    ...mapActions(useUserStore, {
      updateUserInfo: 'updateUserInfo',
      removeUserInfo: 'removeUserInfo',
    }),

    async getData() {
      if (this.row) {
        let params = {
          id: this.row.id,
        }

        const res = await this.$http.function(params)

        if (res.code != 0) {
          return
        }

        let data = res.data
        // let data = this.row
        // 旧密码
        this.form.password = data.password
        // 新密码
        this.form.new_password = data.new_password
      }
    },

    // 取消
    handleCancel() {
      this.$emit('on-cancel')
    },

    // 提交
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.confirmSubmit()
        } else {
          return false
        }
      })
    },

    async confirmSubmit() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        // 旧密码
        password: this.form.password,
        // 新密码
        new_password: this.form.new_password,
      }

      const res = await this.$http.updateUserPassword(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
        // 更新用户信息
        this.updateUserInfo()
      } else {
        this.$msg.error(res.msg)
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
