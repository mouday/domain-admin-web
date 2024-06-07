<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="labelWidth"
    >
      <!-- 通知方式 -->
      <el-form-item
        :label="$t('通知方式')"
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

        <el-tooltip
          effect="dark"
          content="点击查看帮助"
          placement="top-start"
          :show-after="800"
        >
          <div class="ml-sm cursor-pointer">
            <a
              href="https://domain-admin.readthedocs.io/zh-cn/latest/manual/notify.html"
              target="_blank"
              ><el-icon><Warning /></el-icon
            ></a>
          </div>
        </el-tooltip>
      </el-form-item>

      <!-- 触发事件 -->
      <el-form-item
        :label="$t('触发事件')"
        prop="event_id"
      >
        <el-select
          :placeholder="$t('触发事件')"
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

      <template
        v-if="
          [
            EventEnum.SSL_CERT_EXPIRE,
            EventEnum.DOMAIN_EXPIRE,
            EventEnum.SSL_CERT_FILE_EXPIRE,
          ].includes(form.event_id)
        "
      >
        <el-form-item
          :label="$t('剩余天数')"
          prop="expire_days"
        >
          <el-input-number
            v-model="form.expire_days"
            :min="0"
            placeholder="过期通知"
          ></el-input-number>
        </el-form-item>
      </template>

      <template
        v-if="
          [EventEnum.SSL_CERT_EXPIRE, EventEnum.DOMAIN_EXPIRE].includes(
            form.event_id
          )
        "
      >
        <!-- 分组 -->
        <el-form-item
          :label="$t('触发分组')"
          prop="groups"
          v-if="groupList && groupList.length > 0"
        >
          <div class="flex">
            <el-checkbox
              class="mr-sm"
              :model-value="checkAllGroup"
              :indeterminate="indeterminate"
              @change="handleCheckAllGroupChange"
              >全选</el-checkbox
            >
            <el-checkbox-group
              class="ml-md"
              v-model="form.groups"
              @change="handleCheckedGroupChange"
            >
              <el-checkbox
                v-for="item in groupList"
                :key="item.id"
                :label="item.id"
                >{{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </el-form-item>
      </template>

      <!-- 备注 -->
      <el-form-item
        :label="$t('备注')"
        prop="comment"
      >
        <el-input
          v-model="form.comment"
          :placeholder="$t('备注')"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 等待初始化 -->
    <template v-if="hasInit">
      <component
        :is="currentComponent"
        :rowData="rowData"
        :labelWidth="labelWidth"
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
import NotifyEditDingTalk from '@/views/notify-edit-ding-talk/DataForm.vue'
import NotifyEditFeishu from '@/views/notify-edit-feishu/DataForm.vue'
import NotifyEditTelegram from '@/views/notify-edit-telegram/DataForm.vue'
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
    NotifyEditDingTalk,
    NotifyEditFeishu,
    NotifyEditTelegram,
  },

  data() {
    return {
      hasInit: false,

      rowData: null,
      // activeName: NotifyTypeEnum.Email,

      // NotifyTypeOptions,
      labelWidth: '90px',

      groupList: [],

      options: [
        {
          value: NotifyTypeEnum.Email,
          label: this.$t('邮件'),
          icon: 'Message',
          component: NotifyEditEmail,
        },
        {
          value: NotifyTypeEnum.Webhook,
          label: 'WebHook',
          icon: 'AlarmClock',
          component: NotifyEditWebhook,
        },
        {
          value: NotifyTypeEnum.WorkWeixin,
          label: this.$t('企业微信'),
          icon: 'ChatSquare',
          component: NotifyEditWorkWeixin,
        },
        {
          value: NotifyTypeEnum.DingTalk,
          label: this.$t('钉钉'),
          icon: 'ChatSquare',
          component: NotifyEditDingTalk,
        },
        {
          value: NotifyTypeEnum.Feishu,
          label: this.$t('飞书'),
          icon: 'ChatSquare',
          component: NotifyEditFeishu,
        },
        {
          value: NotifyTypeEnum.Telegram,
          label: this.$t('电报'),
          icon: 'ChatSquare',
          component: NotifyEditTelegram,
        },
      ],

      rules: formRules,

      // 引入枚举值
      EventEnum,
      EventOptions,
      form: {
        // 事件类型
        event_id: EventEnum.SSL_CERT_EXPIRE,
        // 通知方式
        type_id: NotifyTypeEnum.Email,
        // 过期通知
        expire_days: 3,
        // 备注
        comment: '',
        // 分组
        groups: [],
      },
    }
  },

  computed: {
    isEdit() {
      return this.row && this.row.id
    },

    currentComponent() {
      // console.log('active', this.active);
      return this.options.find((item) => item.value == this.form.type_id)
        .component
    },

    disabledType() {
      return Boolean(this.row && this.row.id)
    },

    checkAllGroup() {
      return (
        this.groupList &&
        this.groupList.length > 0 &&
        this.form.groups.length == this.groupList.length
      )
    },

    indeterminate() {
      return (
        this.form.groups.length > 0 &&
        this.form.groups.length < this.groupList.length
      )
    },
  },

  methods: {
    async getData() {
      await this.getGroupList()

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
          this.form.comment = data.comment

          if (data.groups && data.groups.length > 0) {
            this.form.groups = data.groups
          }
        }
      }

      if (this.form.groups.length == 0) {
        this.form.groups = this.groupList.map((item) => item.id)
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
        comment: this.form.comment,
        groups: this.checkAllGroup ? null : this.form.groups,
        // 状态
        // status: this.form.status,
        // 通知配置
        value: data.value,
      }

      // 编辑
      let res = null

      if (this.row && this.row.id) {
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

    handleClose() {
      this.$emit('on-cancel')
    },

    async getGroupList() {
      const res = await this.$http.getGroupList()

      if (res.ok) {
        this.groupList = res.data.list
      }
    },

    handleCheckAllGroupChange() {
      if (this.checkAllGroup) {
        this.form.groups = []
      } else {
        this.form.groups = this.groupList.map((item) => item.id)
      }

      this.$refs.form.validateField('groups')
    },

    handleCheckedGroupChange() {
      this.$refs.form.validateField('groups')
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
