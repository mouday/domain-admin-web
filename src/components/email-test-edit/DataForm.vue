<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <!-- 收件邮箱 -->

      <el-form-item
        label="收件邮箱"
        prop="email_list"
      >
        <el-input
          type="text"
          v-model="form.email_list"
          placeholder="收件邮箱，多个分号隔开。例如：123456@qq.com"
        ></el-input>
      </el-form-item>

      <!-- 邮件标题 -->

      <el-form-item
        label="邮件标题"
        prop="subject"
      >
        <el-input
          type="text"
          v-model="form.subject"
          placeholder="请输入邮件标题"
        ></el-input>
      </el-form-item>

      <!-- 邮件内容 -->

      <el-form-item
        label="邮件内容"
        prop="content"
      >
        <el-input
          type="textarea"
          :rows="5"
          v-model="form.content"
          placeholder="请输入邮件内容"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 操作 -->

    <div class="text-center">
      <el-button @click="handleCancel">{{ $t('取消') }}</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >{{ $t('发送') }}</el-button
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
 * created 2024-02-27
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

    defaultEamil: {
      type: String,
      default: '',
    },
  },

  components: {},

  data() {
    return {
      rules: formRules,

      // 引入枚举值

      form: {
        // 邮件标题
        subject: 'Domain Admin测试邮件',
        // 邮件内容
        content: '欢迎使用Domain Admin域名证书监控系统',
        // 收件邮箱
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
        // 邮件标题
        this.form.subject = data.subject
        // 邮件内容
        this.form.content = data.content
        // 收件邮箱
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
        // 邮件标题
        subject: this.form.subject,
        // 邮件内容
        content: this.form.content,
        // 收件邮箱
        email_list: this.form.email_list.split(';'),

        mail_host: this.row.mail_host,
        mail_port: this.row.mail_port,
        mail_alias: this.row.mail_alias,
        mail_username: this.row.mail_username,
        mail_password: this.row.mail_password,
      }

      let res = await this.$http.sendTestEmail(params)

      if (res.code == 0) {
        this.$msg.success('发送成功')
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
    this.form.email_list = this.row.mail_username
    // this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
