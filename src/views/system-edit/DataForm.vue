<template>
  <div class="">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <!-- 服务器地址 -->

      <el-form-item
        :label="$t('服务器地址')"
        prop="mail_host"
      >
        <el-input
          type="text"
          v-model="form.mail_host"
          placeholder="请输入服务器地址"
        ></el-input>
      </el-form-item>

      <!-- 服务器端口 -->

      <el-form-item
        :label="$t('服务器端口')"
        prop="mail_port"
      >
        <el-input
          type="text"
          v-model="form.mail_port"
          placeholder="请输入服务器端口"
        ></el-input>
      </el-form-item>

      <!-- 发件人名称 -->

      <el-form-item
        :label="$t('发件人名称')"
        prop="mail_alias"
      >
        <el-input
          type="text"
          v-model="form.mail_alias"
          placeholder="请输入发件人名称"
        ></el-input>
      </el-form-item>

      <!-- 发件人账号 -->

      <el-form-item
        :label="$t('发件人账号')"
        prop="mail_username"
      >
        <el-input
          type="text"
          v-model="form.mail_username"
          placeholder="请输入发件人账号"
        ></el-input>
      </el-form-item>

      <!-- 发件人密码 -->

      <el-form-item
        :label="$t('发件人密码')"
        prop="mail_password"
      >
        <el-input
          type="text"
          v-model="form.mail_password"
          placeholder="请输入发件人密码"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center">
      <el-button @click="handleTest">测 试</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >{{ $t('保存') }}</el-button
      >
    </div>

    <!-- 邮件发送测试 -->
    <EmailTestDataFormDialog
      v-model:visible="dialogVisible"
      :row="form"
      @on-success="handleTestSuccess"
    ></EmailTestDataFormDialog>
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
 * created 2023-07-01
 * */
// 引入枚举值
import { formRules } from './config.js'
import EmailTestDataFormDialog from '@/components/email-test-edit/DataFormDialog.vue'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {
    EmailTestDataFormDialog,
  },

  data() {
    return {
      rules: formRules,

      // 引入枚举值
      dialogVisible: false,

      form: {
        // 服务器地址
        mail_host: '',
        // 服务器端口
        mail_port: '',
        // 发件人名称
        mail_alias: '',
        // 发件人账号
        mail_username: '',
        // 发件人密码
        mail_password: '',
      },
    }
  },

  computed: {},

  methods: {
    async getData() {
      let params = {}

      const res = await this.$http.getAllSystemConfig(params)

      if (res.code != 0) {
        return
      }

      let data = res.data
      // let data = this.row
      // 服务器地址
      this.form.mail_host = data.mail_host
      // 服务器端口
      this.form.mail_port = data.mail_port
      // 发件人名称
      this.form.mail_alias = data.mail_alias
      // 发件人账号
      this.form.mail_username = data.mail_username
      // 发件人密码
      this.form.mail_password = data.mail_password
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
        // 服务器地址
        mail_host: this.form.mail_host,
        // 服务器端口
        mail_port: this.form.mail_port,
        // 发件人名称
        mail_alias: this.form.mail_alias,
        // 发件人账号
        mail_username: this.form.mail_username,
        // 发件人密码
        mail_password: this.form.mail_password,
      }

      const res = await this.$http.updateSystemConfig(params)

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

    handleTest() {
      this.dialogVisible = true
    },

    handleTestSuccess(){}
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
