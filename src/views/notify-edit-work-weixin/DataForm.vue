<template>
  <div v-loading="loading">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="labelWidth"
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
        href="https://developer.work.weixin.qq.com/document/path/90236"
        class="color--brand"
        target="_blank"
        >企业微信-发送应用消息</a
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
    labelWidth: { type: String, default: '' },
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
        corpid: '',
        corpsecret: '',
        body: '',
      },

      defaultBody: JSON.stringify(
        {
          touser: '@all',
          msgtype: 'text',
          agentid: 1,
          text: {
            content: `你的域名证书即将到期\n点击查看<a href="${window.location.href}">Domain Admin</a>`,
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
      // this.loading = true

      let data = this.rowData

      console.log(this.rowData)

      if (data && data.value) {
        this.form = {
          corpid: data.value.corpid,
          corpsecret: data.value.corpsecret,
          body: data.value.body,
        }
      } else {
        this.form.body = this.defaultBody
      }

      // this.loading = false
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
      // let loading = this.$loading({ fullscreen: true })

      let params = {
        // type_id: NotifyTypeEnum.WorkWeixin,
        value: {
          corpid: this.form.corpid,
          corpsecret: this.form.corpsecret,
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
