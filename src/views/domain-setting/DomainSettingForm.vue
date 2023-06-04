<template>
  <div v-loading="loading">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <!-- 域名 -->
      <el-form-item
        label="域名"
        prop="domain"
      >
        <el-input
          type="text"
          v-model="form.domain"
          placeholder="请输入域名"
          :disabled="true"
        ></el-input>
      </el-form-item>

      <!-- 域名注册时间 -->
      <el-form-item
        label="注册时间"
        prop="domain_start_time"
      >
        <el-date-picker
          v-model="form.domain_start_time"
          type="date"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="域名注册时间"
          :disabled="disabledTime"
        />
      </el-form-item>

      <!-- 域名到期时间 -->
      <el-form-item
        label="到期时间"
        prop="domain_expire_time"
      >
        <el-date-picker
          v-model="form.domain_expire_time"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="date"
          placeholder="域名到期时间"
          :disabled="disabledTime"
        />
      </el-form-item>

      <el-form-item
        label="自动更新"
        prop="domain_auto_update"
      >
        <el-switch v-model="form.domain_auto_update" />
      </el-form-item>

      <el-form-item
        label="到期监控"
        prop="domain_expire_monitor"
      >
        <el-switch v-model="form.domain_expire_monitor" />
      </el-form-item>

      <!-- 证书颁发时间 -->
      <!-- <el-form-item
        label="证书颁发时间"
        prop="start_time"
      >
        <el-date-picker
          v-model="form.start_time"
          type="date"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="证书颁发时间"
        />
      </el-form-item> -->

      <!-- 证书过期时间 -->
      <!-- <el-form-item
        label="证书过期时间"
        prop="expire_time"
      >
        <el-date-picker
          v-model="form.expire_time"
          type="date"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="证书过期时间"
        />
      </el-form-item> -->

      <!-- 证书自动更新 -->
      <!-- <el-form-item
        label="证书自动更新"
        prop="auto_update"
      >
        <el-switch v-model="form.auto_update" />
      </el-form-item> -->
    </el-form>

    <div class="text-[12px] color--info">
      提示：如需手动设置域名时间，请关闭自动更新
    </div>

    <!-- 操作 -->
    <div class="text-center mt-md">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
        >确 定</el-button
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
// 引入枚举值
import { formRules } from './config.js'
import SelectGroup from '@/components/SelectGroup.vue'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {
    SelectGroup,
  },

  data() {
    return {
      loading: false,

      rules: formRules,

      // 引入枚举值

      form: {
        // 域名信息
        domain: '',

        domain_start_time: '',
        domain_expire_time: '',
        domain_auto_update: true,
        domain_expire_monitor: true,

        // 证书信息
        start_time: '',
        expire_time: '',
        auto_update: true,

        // ip信息
        // ip_auto_update: true,
      },
    }
  },

  computed: {
    disabledTime() {
      return this.form.domain_auto_update
    },
  },

  methods: {
    async getData() {
      this.loading = true

      if (this.row) {
        let params = {
          id: this.row.id,
        }

        const res = await this.$http.getDomainById(params)
        this.form = res.data
        // let data = res.data
        // let data = this.row
        // 域名
        // this.form.domain = data.domain
        // this.form.alias = data.alias
        // this.form.group_id = data.group_id

        // if (this.form.group_id == 0) {
        //   this.form.group_id = ''
        // }
      }

      this.loading = false
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
        // 域名

        domain_start_time: this.form.domain_start_time,
        domain_expire_time: this.form.domain_expire_time,
        domain_auto_update: this.form.domain_auto_update,
        domain_expire_monitor: this.form.domain_expire_monitor,

        // start_time: this.form.start_time,
        // expire_time: this.form.expire_time,
        // auto_update: this.form.auto_update,

        domain_id: this.row.id,
      }

      let res = await this.$http.updateDomainSetting(params)

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
