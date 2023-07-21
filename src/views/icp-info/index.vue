<template>
  <div class="app-container">
    <h2 class="text-center">ICP备案查询</h2>

    <!-- 阻止默认行为 -->
    <div class="flex justify-between items-center">
      <el-form
        class="mt-md"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        @submit.native.prevent
      >
        <!-- 域名 -->
        <el-form-item
          label="域名"
          prop="domain"
        >
          <el-input
            v-model="form.domain"
            style="width: 300px; margin-right: 20px"
            placeholder="输入域名"
            clearable
            @keypress.enter.native="handleSearch"
          ></el-input>

          <el-button @click="handleSearch"
            ><el-icon><Search /></el-icon> 查询</el-button
          >
        </el-form-item></el-form
      >

      <span
        class="color--info text-[14px]"
        >数据来源：<a
          href="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank"
          class="mo-link"
          >ICP/IP地址/域名信息备案管理系统</a
        ></span
      >
    </div>

    <div v-if="row">
      <!-- 主题信息 -->
      <div>
        <h2>备案信息</h2>

        <div class="mo-form-detail mt-sm">
          <el-form
            label-width="130px"
            label-position="right"
          >
            <el-form-item
              label="主办单位名称"
              prop="domain"
            >
              <span>{{ row.icp_company || '-' }}</span>
            </el-form-item>

            <el-form-item
              label="ICP备案"
              prop="icp_licence"
            >
              <span>{{ row.icp_licence || '-' }}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// created at 2023-06-01
export default {
  name: 'index',

  props: {},

  components: {},

  data() {
    return {
      raw_data: '',
      parsed_cert: null,
      cert_text: '',
      cert_pem: '',

      form: {
        domain: '',
      },

      row: null,

      rules: {
        domain: [
          {
            message: '域名不能为空',
            required: true,
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {},

  methods: {
    // 提交
    handleSearch() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.getData()
        } else {
          return false
        }
      })
    },

    async getData() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        domain: this.form.domain,
      }

      const res = await this.$http.getICP(params)

      if (res.ok) {
        this.form.domain = res.data.resolve_domain

        this.row = {
          icp_company: res.data.name,
          icp_licence: res.data.icp,
        }
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped>
pre {
  font-size: 14px;
  padding: 20px;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: 1px solid #ebeef5;
}
</style>
