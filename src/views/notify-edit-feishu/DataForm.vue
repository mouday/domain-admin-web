<template>
  <div v-loading="loading">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="labelWidth"
    >
      <el-form-item
        label="应用key"
        prop="app_id"
      >
        <el-input
          type="text"
          v-model="form.app_id"
          placeholder="app_id"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="应用密钥"
        prop="app_secret"
      >
        <el-input
          type="text"
          v-model="form.app_secret"
          placeholder="app_secret"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="ID类型"
        prop="receive_id_type"
      >
        <!-- <el-input
          type="text"
          v-model="form.app_secret"
          placeholder="app_secret"
        ></el-input> -->

        <el-select
          v-model="form.receive_id_type"
          placeholder="消息接收者id类型"
        >
          <el-option
            v-for="item in receiveIdTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
        href="https://open.feishu.cn/document/server-docs/im-v1/message/create"
        class="color--brand"
        target="_blank"
        >飞书开放平台-发送消息</a
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
  receiveIdTypeOptions,
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
      receiveIdTypeOptions,

      form: {
        app_id: '',
        app_secret: '',
        receive_id_type: 'open_id',
        body: '',
      },

      defaultBody: JSON.stringify(
        {
          receive_id: '<open_id>',
          msg_type: 'text',
          content: JSON.stringify({
            text: '域名或证书过期提醒',
          }),
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
          app_id: data.value.app_id,
          app_secret: data.value.app_secret,
          body: data.value.body,
          receive_id_type: data.value.params.receive_id_type,
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
          app_id: this.form.app_id,
          app_secret: this.form.app_secret,
          params: { receive_id_type: this.form.receive_id_type },
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
