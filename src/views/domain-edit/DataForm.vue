<template>
  <div v-loading="loading">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="70px"
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
        ></el-input>
      </el-form-item>

      <!-- 端口 -->
      <el-form-item
        label="端口"
        prop="port"
      >
        <el-input
          type="text"
          v-model="form.port"
          placeholder="请输入端口"
        ></el-input>
      </el-form-item>

      <!-- 动态主机 -->
      <el-form-item
        label="动态主机"
        prop="is_dynamic_host"
      >
        <el-switch v-model="form.is_dynamic_host" />

        <el-tooltip
          effect="dark"
          content="动态主机IP地址：每次自动更新将会重新获取主机列表"
          placement="top-start"
          :show-after="500"
        >
          <el-link :underline="false"
            ><el-icon class="ml-sm"><Warning /></el-icon
          ></el-link>
        </el-tooltip>
      </el-form-item>

      <!-- 分组 -->
      <el-form-item
        label="分组"
        prop="group_id"
      >
        <SelectGroup
          class="w-[150px]"
          v-model="form.group_id"
          clearable
        ></SelectGroup>
      </el-form-item>

      <!-- 备注 -->
      <el-form-item
        label="备注"
        prop="alias"
      >
        <el-input
          type="textarea"
          v-model="form.alias"
          :rows="3"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center">
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

      form: {
        // 域名
        domain: '',
        // 备注
        alias: '',
        // 端口
        port: 443,
        // 分组
        group_id: '',

        // 动态ip
        is_dynamic_host: false,
      },

      rules: formRules,
    }
  },

  computed: {
    disabledDomain() {
      if (this.row) {
        return true
      } else {
        return false
      }
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

        let data = res.data
        // let data = this.row
        // 域名
        this.form.domain = data.domain
        this.form.alias = data.alias
        this.form.group_id = data.group_id
        this.form.port = data.port
        this.form.is_dynamic_host = data.is_dynamic_host

        if (this.form.group_id == 0) {
          this.form.group_id = ''
        }
      }

      this.loading = false
    },

    // 取消
    handleCancel() {
      this.$emit('on-cancel')
    },

    // 提交
    handleSubmit() {
      console.log('handleSubmit', this.form)

      this.$refs['form'].validate((valid) => {
        console.log(valid)

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
        domain: this.form.domain.trim(),
        alias: this.form.alias.trim(),
        group_id: this.form.group_id,
        port: this.form.port,
        is_dynamic_host: this.form.is_dynamic_host,
      }

      let res = null

      if (this.row) {
        // 编辑
        params['id'] = this.row.id
        res = await this.$http.updateDomainById(params)
      } else {
        // 添加
        res = await this.$http.addDomain(params)
      }

      if (res.ok) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
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
