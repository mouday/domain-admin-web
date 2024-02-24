<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <!-- 标题 -->

      <el-form-item
        label="名称"
        prop="title"
      >
        <el-input
          type="text"
          v-model="form.title"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>

      <!-- 监控类型 -->

      <el-form-item
        label="监控类型"
        prop="monitor_type"
      >
        <el-select
          v-model="form.monitor_type"
          style="width: 140px"
          disabled
        >
          <el-option
            v-for="item in MonitorTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 监控参数 -->

      <!-- <el-form-item
        label="监控参数"
        prop="content"
      >
        <el-input
          type="text"
          v-model="form.content"
          placeholder="请输入监控参数"
        ></el-input>
      </el-form-item> -->

      <!-- 监控参数 -->
      <template v-if="MonitorTypeEnum.HTTP == form.monitor_type">
        <HttpDataForm
          ref="MonitorDataForm"
          :form="form.content"
          @on-confirm="handleMonitorDataFormConfirm"
        ></HttpDataForm>
      </template>

      <!-- 检测频率 -->
      <el-form-item
        label="检测频率"
        prop="interval"
      >
        <el-input
          style="width: 140px"
          type="number"
          v-model="form.interval"
          placeholder="请输入检测频率"
        ></el-input>
        <span class="color--info ml-sm">（分钟）</span>
      </el-form-item>

      <!-- 检测频率 -->
      <el-form-item
        label="重试次数"
        prop="allow_error_count"
      >
        <el-input
          style="width: 140px"
          type="number"
          v-model="form.allow_error_count"
          placeholder="请输入重试次数"
        ></el-input>
      </el-form-item>

      <!-- 启用 -->

      <!-- <el-form-item
        label="启用"
        prop="is_active"
      >
        <el-switch v-model="form.is_active" />
      </el-form-item> -->
    </el-form>

    <!-- 操作 -->

    <div class="text-center">
      <el-button @click="handleCancel">{{ $t('取消') }}</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >{{ $t('确定') }}</el-button
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
 * created 2024-01-28
 * */
import {
  formRules,
  // 引入枚举值
} from './config.js'
import {
  MonitorTypeEnum,
  MonitorTypeFilter,
  MonitorTypeOptions,
} from '../../emuns/monitor-type-enums.js'

import { RequestMethodOptions } from '../../emuns/request-method-enums.js'
import HttpDataForm from './HttpDataForm/HttpDataForm.vue'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {
    HttpDataForm,
  },

  data() {
    return {
      rules: formRules,

      // 引入枚举值
      MonitorTypeEnum,
      MonitorTypeOptions,
      RequestMethodOptions,
      form: {
        // 标题
        title: '',
        // 监控类型
        monitor_type: MonitorTypeOptions[0].value,
        // 监控参数
        content: {
          method: RequestMethodOptions[0].value,
          url: '',
          timeout: 3,
        },
        // 检测频率
        interval: '60',
        // 状态
        status: '',
        // 启用
        is_active: true,
        // 下次运行时间
        next_run_time: '',
        allow_error_count: '0',
      },
    }
  },

  computed: {},

  methods: {
    async getData() {
      if (this.row) {
        let params = {
          monitor_id: this.row.id,
        }

        const res = await this.$http.getMonitorById(params)

        if (res.code != 0) {
          return
        }

        let data = res.data
        // let data = this.row
        // 标题
        this.form.title = data.title
        // 监控类型
        this.form.monitor_type = data.monitor_type
        // 监控参数
        this.form.content = data.content
        // 检测频率
        this.form.interval = data.interval
        this.form.allow_error_count = data.allow_error_count
      }
    },

    // 取消
    handleCancel() {
      this.$emit('on-cancel')
    },

    // 提交
    handleSubmit() {
      this.$refs.MonitorDataForm.handleSubmit()
    },

    handleMonitorDataFormConfirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.confirmSubmit()
        } else {
          return false
        }
      })
    },

    async confirmSubmit() {
      console.log('handleMonitorDataFormConfirm')

      let loading = this.$loading({ fullscreen: true })

      let params = {
        // 标题
        title: this.form.title,
        // 监控类型
        monitor_type: this.form.monitor_type,
        // 监控参数
        content: this.form.content,
        // 检测频率
        interval: this.form.interval,
        allow_error_count: this.form.allow_error_count,
        // 状态
        // status: this.form.status,
        // // 启用
        // is_active: this.form.is_active,
      }

      let res = null

      // 编辑
      if (this.row && this.row.id) {
        res = await this.$http.updateMonitorById({
          ...params,
          monitor_id: this.row.id,
        })
      } else {
        res = await this.$http.addMonitor(params)
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
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
