<template>
  <div class="mo-form-detail">
    <el-form label-width="130px">
      <el-form-item
        label="域名授权验证类型"
        prop="domain"
      >
        <span>文件</span>
      </el-form-item>

      <el-form-item
        label="文件内容"
        prop="create_time"
      >
        <span class="verify-step__value">{{ form.validation }}</span>
      </el-form-item>

      <el-form-item
        label="服务器目录"
        prop="create_time"
      >
        <span class="verify-step__value">/.well-known/acme-challenge/{{ form.token }}</span>
      </el-form-item>

      <el-form-item
        label="HTTP地址"
        prop="isp"
      >
        <template v-for="url in form.domain_validation_urls">
          <div>
            <a
              :href="url"
              class="verify-step__value mo-link"
              target="_blank"
              >{{ url }}</a
            >
          </div>
        </template>
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center mt-md">
      <el-button
        type="primary"
        @click="handleSubmit"
        >验 证</el-button
      >
    </div>
  </div>
</template>

<script>
// created at 2023-07-23
export default {
  name: 'VerifyStep',

  props: {
    form: {
      type: Object,
    },
  },

  components: {},

  data() {
    return {}
  },

  computed: {},

  methods: {
    async getData() {},

    async handleSubmit() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        // 域名列表
        issue_certificate_id: this.form.id,
      }

      const res = await this.$http.verifyCertificateById(params)

      if (res.code == 0) {
        this.$msg.success('验证成功')
        this.$emit('on-success', res.data)
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

<style lang="less" scoped>
.verify-step__value {
  font-size: 12px;
  word-break: break-all;
}
</style>
