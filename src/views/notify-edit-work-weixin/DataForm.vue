<template>
  <div v-loading="loading">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item
        label="企业ID"
        prop="corpid"
      >
        <el-input
          type="text"
          v-model="form.corpid"
          placeholder="corpid"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="凭证密钥"
        prop="corpsecret"
      >
        <el-input
          type="text"
          v-model="form.corpsecret"
          placeholder="corpsecret"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="请求体"
        prop="body"
      >
        <el-input
          type="textarea"
          :rows="16"
          v-model="form.body"
          placeholder="请求体"
        ></el-input>
      </el-form-item>
    </el-form>

    <div class="text-[14px] color--info">
      <span>开发文档：</span>

      <a
        href="https://developer.work.weixin.qq.com/document/path/90236"
        class="color--brand"
        target="_blank"
        >企业微信-发送应用消息</a
      >
    </div>

    <!-- 操作 -->
    <div class="text-center">
      <el-button @click="handleCancel">重 置</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >保 存</el-button
      >
      <el-tooltip
        content="请保存后再测试"
        placement="top"
      >
        <el-button @click="handleTest">测 试</el-button>
      </el-tooltip>
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
 * created 2022-10-01
 * */
import { NotifyTypeEnum } from '@/emuns/notify-type-enums.js'

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
      loading: false,

      rules: formRules,

      // 引入枚举值

      form: {
        corpid: '',
        corpsecret: '',
        body: '',
      },

      defaultBody: JSON.stringify(
        {
          touser: 'UserID1|UserID2|UserID3',
          toparty: 'PartyID1|PartyID2',
          totag: 'TagID1 | TagID2',
          msgtype: 'text',
          agentid: 1,
          text: {
            content: `你的域名证书即将到期\n点击查看<a href="${window.location.href}">Domain Admin</a>`,
          },
          safe: 0,
          enable_id_trans: 0,
          enable_duplicate_check: 0,
          duplicate_check_interval: 1800,
        },
        null,
        4
      ),
    }
  },

  computed: {},

  methods: {
    async getData() {
      this.loading = true

      let params = {
        type_id: NotifyTypeEnum.WorkWeixin,
      }

      const res = await this.$http.getNotifyOfUser(params)

      let data = res.data

      if (data && data.value) {
        this.form = {
          corpid: data.value.corpid,
          corpsecret: data.value.corpsecret,
          body: data.value.body,
        }
      } else {
        this.form.body = this.defaultBody
      }

      this.loading = false
    },

    // 取消
    handleCancel() {
      // this.$emit('on-cancel')
      // this.getData()
      this.$refs.form.resetFields()
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

      let headers = null
      if (this.form.headers) {
        headers = JSON.parse(this.form.headers)
      }

      let params = {
        type_id: NotifyTypeEnum.WorkWeixin,
        value: {
          corpid: this.form.corpid,
          corpsecret: this.form.corpsecret,
          body: this.form.body,
        },
      }

      let res = await this.$http.updateNotifyOfUser(params)

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

    async handleTest() {
      let loading = this.$loading({ fullscreen: true })

      try {
        const res = await this.$http.testWorkWeixinNotifyOfUser()

        if (res.code == 0) {
          this.$msg.success(res.data)
          // this.$emit('on-success')
        }
      } catch (e) {
      } finally {
        this.$nextTick(() => {
          loading.close()
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

<style lang="less" scoped></style>
