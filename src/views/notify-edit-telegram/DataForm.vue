<template>
  <div v-loading="loading">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="labelWidth"
    >
      <el-form-item
        label="Token"
        prop="token"
      >
        <el-input
          type="text"
          v-model="form.token"
          placeholder="Token"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="ChatId"
        prop="chat_id"
      >
        <el-input
          type="text"
          v-model="form.chat_id"
          placeholder="ChatId"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="代理配置"
        prop="proxies"
      >
        <CodeEditor
          v-model="form.proxies"
          height="100px"
          :placeholder="`示例: \n${proxiesExample}`"
        ></CodeEditor>
      </el-form-item>

      <el-form-item
        label="消息内容"
        prop="body"
      >
        <!-- <el-input
          type="textarea"
          :rows="5"
          v-model="form.body"
          placeholder="请求体，支持jinja2模板语法"
        ></el-input> -->

        <CodeEditor
          mode="twig"
          v-model="form.body"
          height="100px"
          :placeholder="bodyPlaceholder"
        ></CodeEditor>
      </el-form-item>
    </el-form>

    <!-- <div class="text-[14px] color--info">
      <span>资源推荐：</span>
      <a
        href="https://pengshiyu.blog.csdn.net/article/details/124135877"
        class="color--brand"
        target="_blank"
        >微信推送消息通知接口汇总</a
      >
    </div> -->

    <!-- 操作 -->
    <div class="text-center mt-md">
      <el-button @click="handleCancel">{{ $t('取消') }}</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >{{ $t('保存') }}</el-button
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

  components: { CodeEditor },

  data() {
    return {
      loading: false,

      rules: formRules,

      // 引入枚举值

      form: {
        // 域名
        token: '',
        chat_id: '',
        proxies: JSON.stringify(
          {
            http: 'http://127.0.0.1:7890',
            https: 'http://127.0.0.1:7890',
          },
          null,
          4
        ),
        body: `{% for row in list %}
{{row.domain}} {{row.start_date or '-' }} - {{row.expire_date or '-' }} ({{row.expire_days}})
{% endfor %}`,
      },
      proxiesExample: JSON.stringify(
        {
          http: 'http://127.0.0.1:7890',
          https: 'http://127.0.0.1:7890',
        },
        null,
        4
      ),
      bodyPlaceholder: '支持jinja2模板语法',
    }
  },

  computed: {},

  methods: {
    async getData() {
      // this.loading = true

      console.log(this.rowData)

      let data = this.rowData

      if (data && data.value) {
        let proxies = ''

        if (data.value.proxies) {
          proxies = JSON.stringify(data.value.proxies, null, 4)
        }

        this.form = {
          token: data.value.token,
          chat_id: data.value.chat_id,
          proxies: proxies,
          body: data.value.body,
        }
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
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.confirmSubmit()
        } else {
          return false
        }
      })
    },

    async confirmSubmit() {
      // let loading = this.$loading({ fullscreen: true })

      let proxies = null
      if (this.form.proxies) {
        proxies = JSON.parse(this.form.proxies)
      }

      let params = {
        // type_id: NotifyTypeEnum.Webkook,
        value: {
          token: this.form.token,
          chat_id: this.form.chat_id,
          proxies: proxies,
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
