<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <!-- 通知方式 -->
      <el-form-item
        label="通知方式"
        prop="type_id"
      >
        <el-select
          placeholder="通知方式"
          v-model="form.type_id"
          :disabled="disabledType"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 触发事件 -->
      <el-form-item
        label="触发事件"
        prop="event_id"
      >
        <el-select
          placeholder="触发事件"
          v-model="form.event_id"
        >
          <el-option
            v-for="item in EventOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="剩余天数"
        prop="expire_days"
      >
        <el-input-number
          v-model="form.expire_days"
          :min="0"
          placeholder="过期通知"
        ></el-input-number>
      </el-form-item>
    </el-form>

    <!-- 等待初始化 -->
    <template v-if="hasInit">
      <component
        :is="currentComponent"
        :rowData="rowData"
        @on-submit="handleSubmit"
        @on-cancel="handleClose"
    /></template>
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
 * created 2023-06-20
 * */
import {
  formRules,
  // 引入枚举值
} from './config.js'
import NotifyEditEmail from '@/views/notify-edit-email/DataForm.vue'
import NotifyEditWebhook from '@/views/notify-edit-webhook/DataForm.vue'
import NotifyEditWorkWeixin from '@/views/notify-edit-work-weixin/DataForm.vue'
import { NotifyTypeEnum } from '@/emuns/notify-type-enums.js'
import { EventOptions, EventEnum } from '@/emuns/event-enums.js'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  emits: ['on-success', 'on-cancel'],

  components: {
    NotifyEditEmail,
    NotifyEditWebhook,
    NotifyEditWorkWeixin,
  },

  data() {
    return {
      hasInit: false,

      rowData: null,
      // activeName: NotifyTypeEnum.Email,

      // NotifyTypeOptions,

      options: [
        {
          value: NotifyTypeEnum.Email,
          label: '邮件通知',
          icon: 'Message',
          component: NotifyEditEmail,
        },
        {
          value: NotifyTypeEnum.Webkook,
          label: 'WebHook',
          icon: 'AlarmClock',
          component: NotifyEditWebhook,
        },
        {
          value: NotifyTypeEnum.WorkWeixin,
          label: '企业微信',
          icon: 'ChatSquare',
          component: NotifyEditWorkWeixin,
        },
      ],

      rules: formRules,

      // 引入枚举值
      EventOptions,
      form: {
        // 事件类型
        event_id: EventEnum.SSL_CERT_EXPIRE,
        // 通知方式
        type_id: NotifyTypeEnum.Email,
        // 过期通知
        expire_days: 3
      },
    }
  },

  computed: {
    currentComponent() {
      // console.log('active', this.active);
      return this.options.find((item) => item.value == this.form.type_id)
        .component
    },

    disabledType() {
      return Boolean(this.row && this.row.id)
    },
  },

  methods: {
    async getData() {
      if (this.row) {
        let params = {
          notify_id: this.row.id,
        }

        const res = await this.$http.getNotifyById(params)

        if (res.ok) {
          this.rowData = res.data

          let data = res.data
          // let data = this.row
          // 事件类型
          this.form.event_id = data.event_id
          // 通知方式
          this.form.type_id = data.type_id
          // 状态
          // this.form.status = data.status
          // 通知配置
          this.form.value = data.value
          this.form.expire_days = data.expire_days
        }
      }

      this.hasInit = true
    },

    // 取消
    handleCancel() {
      this.$emit('on-cancel')
    },

    // 提交
    handleSubmit(data) {
      console.log(data)

      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.confirmSubmit(data)
        } else {
          return false
        }
      })
    },

    async confirmSubmit(data) {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        // 事件类型
        event_id: this.form.event_id,
        // 通知方式
        type_id: this.form.type_id,
        expire_days: this.form.expire_days,
        // 状态
        // status: this.form.status,
        // 通知配置
        value: data.value,
      }

      // 编辑
      let res = null

      if (this.row) {
        params['notify_id'] = this.row.id

        res = await this.$http.updateNotifyById(params)
      } else {
        res = await this.$http.addNotify(params)
      }

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

    handleClose(){
      this.$emit('on-cancel')
    }
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
