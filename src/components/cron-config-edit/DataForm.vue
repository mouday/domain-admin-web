<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <!-- 定时检测 -->

      <el-form-item
        label="定时设置"
        prop="scheduler_cron"
      >
        <el-input
          type="text"
          v-model="form.scheduler_cron"
          @change="parseCrontab"
          placeholder="crontab 表达式：分 时 日 月 周"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="执行计划"
        prop="cronNextList"
      >
        <div v-if="cronNextList && cronNextList.length > 0">
          <div v-for="item in cronNextList">
            {{ item }}
          </div>
        </div>
        <div
          v-else
          class="mo-empty"
        >
          暂无计划
        </div>
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center">
      <!-- <el-button @click="handleCancel">取 消</el-button> -->
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
 * created 2023-07-01
 * */
import dayjs from 'dayjs'
import {
  formRules,
  // 引入枚举值
} from './config.js'
import { getCrontabSchedule } from '@/utils/cron-util.js'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {},

  data() {
    return {
      rules: formRules,

      // 引入枚举值

      form: {
        // 定时检测
        scheduler_cron: '',
      },
      cronNextList: [],
    }
  },

  computed: {},

  methods: {
    async getData() {
      let params = {}

      const res = await this.$http.getCronConfig(params)

      if (res.code != 0) {
        return
      }

      let data = res.data
      // let data = this.row
      // 定时检测
      this.form.scheduler_cron = data.scheduler_cron

      this.parseCrontab()
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
        // 定时检测
        scheduler_cron: this.form.scheduler_cron,
      }

      // 编辑
      if (this.row) {
        params['id'] = this.row.id
      }

      const res = await this.$http.updateCronConfig(params)

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

    parseCrontab() {
      this.cronNextList = getCrontabSchedule(this.form.scheduler_cron)
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
