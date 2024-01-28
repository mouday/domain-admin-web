<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="100px"
  >
    <el-form-item
      label="请求方式"
      prop="method"
    >
      <el-select
        v-model="form.method"
        style="width: 140px"
        disabled
      >
        <el-option
          v-for="item in RequestMethodOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item
      label="请求URL"
      prop="url"
    >
      <el-input
        type="text"
        v-model="form.url"
        placeholder="请输入请求URL"
      ></el-input>
    </el-form-item>

    <el-form-item
      label="请求超时"
      prop="timeout"
    >
      <el-input
        style="width: 140px"
        type="number"
        v-model="form.timeout"
        placeholder="请输入超时时间"
      ></el-input>
      <span class="ml-sm">（秒）</span>
    </el-form-item>
  </el-form>
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
} from '../../../emuns/monitor-type-enums.js'

import { RequestMethodOptions } from '../../../emuns/request-method-enums.js'

export default {
  name: '',

  props: {
    // 数据行
    form: { type: Object, default: null },
  },

  components: {},

  data() {
    return {
      rules: formRules,

      // 引入枚举值
      MonitorTypeEnum,
      MonitorTypeOptions,
      RequestMethodOptions,
      // form: {
      //   method: RequestMethodOptions[0].value,
      // },
    }
  },

  computed: {},

  methods: {
    // 提交
    handleSubmit() {
      console.log('handleSubmit')

      this.$refs['form'].validate((valid) => {
        console.log(valid)

        if (valid) {
          this.confirmSubmit()
        } else {
          return false
        }
      })
    },

    confirmSubmit() {
      console.debug('confirmSubmit', this.form)
      this.$emit('on-confirm', this.form)
    },
  },

  created() {},
}
</script>

<style lang="less"></style>
