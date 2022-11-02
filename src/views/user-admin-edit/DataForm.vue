<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <!-- 用户名 -->

      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          type="text"
          v-model="form.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="text"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <!-- 头像 -->

      <!-- <el-form-item
        label="头像"
        prop="avatar_url"
      >
        <el-input
          type="text"
          v-model="form.avatar_url"
          placeholder="请输入头像"
        ></el-input>
      </el-form-item> -->

      <!-- 过期前多少天提醒 -->

      <!-- <el-form-item
        label="过期前多少天提醒"
        prop="before_expire_days"
      >
        <el-input
          type="text"
          v-model="form.before_expire_days"
          placeholder="请输入过期前多少天提醒"
        ></el-input>
      </el-form-item> -->

      <!-- 邮件列表 -->

      <!-- <el-form-item
        label="邮件列表"
        prop="email_list"
      >
        <el-input
          type="text"
          v-model="form.email_list"
          placeholder="请输入邮件列表"
        ></el-input>
      </el-form-item> -->
    </el-form>

    <!-- 操作 -->
    <div class="text-center">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >确 定</el-button
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

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {},

  data() {
    return {
      rules: formRules,

      // 引入枚举值

      form: {
        // 用户名
        username: '',
        password: '',
        // 头像
        avatar_url: '',
        // 过期前多少天提醒
        before_expire_days: '',
        // 邮件列表
        email_list: '',
      },
    }
  },

  computed: {},

  methods: {
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
        // 用户名
        this.form.username = data.username
        // 头像
        this.form.avatar_url = data.avatar_url
        // 过期前多少天提醒
        this.form.before_expire_days = data.before_expire_days
        // 邮件列表
        this.form.email_list = data.email_list
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
        // 用户名
        username: this.form.username.trim(),
        password: this.form.password.trim(),
        // 头像
        // avatar_url: this.form.avatar_url,
        // // 过期前多少天提醒
        // before_expire_days: this.form.before_expire_days,
        // // 邮件列表
        // email_list: this.form.email_list,
      }

      // 编辑
      if (this.row) {
        params['id'] = this.row.id
      }

      const res = await this.$http.addUser(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
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
