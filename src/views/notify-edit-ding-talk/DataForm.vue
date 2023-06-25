<template>
  <div v-loading="loading">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item
        label="应用key"
        prop="appkey"
      >
        <el-input
          type="text"
          v-model="form.appkey"
          placeholder="appkey"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="应用密钥"
        prop="appsecret"
      >
        <el-input
          type="text"
          v-model="form.appsecret"
          placeholder="appsecret"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="请求体"
        prop="body"
      >
        <!-- <el-input
          type="textarea"
          :rows="10"
          v-model="form.body"
          placeholder="请求体"
        ></el-input> -->

        <CodeEditor
          mode="json"
          v-model="form.body"
          height="200px"
          placeholder="请求体"
        ></CodeEditor>
      </el-form-item>
    </el-form>

    <div class="text-[14px] color--info">
      <span>开发文档：</span>

      <a
        href="https://open.dingtalk.com/document/orgapp/asynchronous-sending-of-enterprise-session-messages"
        class="color--brand"
        target="_blank"
        >钉钉开放平台-发送工作通知</a
      >
    </div>

    <!-- 操作 -->
    <div class="text-center">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >保 存</el-button
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
 * created 2022-10-01
 * */
import { NotifyTypeEnum } from '@/emuns/notify-type-enums.js'
import { deepCopy } from '@/utils/copy-util.js'
import CodeEditor from '@/components/code-editor/CodeEditor.vue'

import {
  formRules,
  // 引入枚举值
} from './config.js'

export default {
  name: '',

  props: {
    // 数据行
    rowData: { type: Object, default: null },
  },

  emits: ['on-submit', 'on-cancel'],

  components: {
    CodeEditor,
  },

  data() {
    return {
      loading: false,

      rules: formRules,

      // 引入枚举值

      form: {
        appkey: '',
        appsecret: '',
        body: '',
      },

      defaultBody: JSON.stringify(
        {
          agent_id: '',
          userid_list: '',
          msg: {
            msgtype: 'text',
            text: {
              content: '域名或证书过期提醒',
            },
          },
        },
        null,
        4
      ),
    }
  },

  computed: {},

  methods: {
    async getData() {
      let data = this.rowData

      console.log(this.rowData)

      if (data && data.value) {
        this.form = {
          appkey: data.value.appkey,
          appsecret: data.value.appsecret,
          body: data.value.body,
        }
      } else {
        this.form.body = this.defaultBody
      }
    },

    // 取消
    handleCancel() {
      this.$emit('on-cancel')
      // this.getData()
      // this.$refs.form.resetFields()
    },

    // 提交
    handleSubmit() {
      console.log('handleSubmit')
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.confirmSubmit()
        } else {
          console.log('err')
          return false
        }
      })
    },

    async confirmSubmit() {
      console.log('confirmSubmit')
 
      let params = {
        // type_id: NotifyTypeEnum.WorkWeixin,
        value: {
          appkey: this.form.appkey,
          appsecret: this.form.appsecret,
          body: this.form.body,
        },
      }

      this.$emit('on-submit', deepCopy(params))
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
