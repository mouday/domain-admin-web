<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <!-- 名称 -->

      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input
          type="text"
          v-model="form.name"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>

      <!-- 类型 -->

      <el-form-item
        label="类型"
        prop="dns_type_id"
      >
        <el-select
          v-model="form.dns_type_id"
          :placeholder="$t('请选择类型')"
        >
          <el-option
            v-for="item in DNSTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- Access Key -->

      <el-form-item
        label="Access Key"
        prop="access_key"
      >
        <el-input
          type="text"
          v-model="form.access_key"
          placeholder="请输入Access Key"
        ></el-input>
      </el-form-item>

      <!-- Secret Key -->

      <el-form-item
        label="Secret Key"
        prop="secret_key"
      >
        <el-input
          type="text"
          v-model="form.secret_key"
          placeholder="请输入Secret Key"
        ></el-input>
      </el-form-item>

      <!-- 创建时间 -->
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
 * created 2024-06-21
 * */
import {
  formRules,
  // 引入枚举值
} from './config.js'
import { DNSTypeOptions } from '@/emuns/dns-type-enums.js'

export default {
  name: '',

  props: {
    // 数据行
    row: { type: Object, default: null },
  },

  components: {},

  data() {
    return {
      DNSTypeOptions,
      rules: formRules,

      // 引入枚举值

      form: {
        // 类型
        dns_type_id: DNSTypeOptions[0].value,
        // 名称
        name: '',
        // Access Key
        access_key: '',
        // Secret Key
        secret_key: '',
        // 创建时间
        create_time: '',
      },
    }
  },

  computed: {},

  methods: {
    async getData() {
      if (this.row) {
        let params = {
          dns_id: this.row.id,
        }

        const res = await this.$http.getDnsById(params)

        if (res.code != 0) {
          return
        }

        let data = res.data
        // let data = this.row
        // 类型
        this.form.dns_type_id = data.dns_type_id
        // 名称
        this.form.name = data.name
        // Access Key
        this.form.access_key = data.access_key
        // Secret Key
        this.form.secret_key = data.secret_key
        // 创建时间
        // this.form.create_time = data.create_time
      }
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
        // 类型
        dns_type_id: this.form.dns_type_id,
        // 名称
        name: this.form.name,
        // Access Key
        access_key: this.form.access_key,
        // Secret Key
        secret_key: this.form.secret_key,
        // 创建时间
        // create_time: this.form.create_time,
      }

      let res = null

      if (this.row) {
        params['dns_id'] = this.row.id
        res = await this.$http.updateDnsById(params)
      } else {
        res = await this.$http.addDns(params)
      }

      if (res.code == 0) {
        const detailRes = await this.$http.getDnsById({
          dns_id: this.row?.id || res.data.id,
        })

        this.$msg.success('操作成功')
        this.$emit('on-success', detailRes.data)
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
