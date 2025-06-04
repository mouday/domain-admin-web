<template>
  <div class="app-container">
    <h2 class="text-center">微信禁封查询</h2>

    <!-- 阻止默认行为 -->
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

      <!-- 主题信息 -->
      <div class="">
        <h2>查询结果</h2>

        <div class="mo-form-detail mt-sm">
          <el-form
            label-width="130px"
            label-position="right"
          >
            <el-form-item
              label="状态"
              prop="domain"
            >
              <span>{{ text || '-' }}</span>
            </el-form-item>
          </el-form>
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
      text: '',
      cert_pem: '',

      form: {
        domain: '',
      },

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
        // 域名
        url: this.form.domain,
      }

      let res = await this.$http.validateUrlForWechat(params)

      if (res.ok) {
        this.text = res.data.data
        
        this.$msg.success('查询成功')
      } else {
        this.$msg.error(res.msg)
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
