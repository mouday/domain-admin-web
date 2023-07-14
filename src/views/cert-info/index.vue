<template>
  <div class="app-container">
    <h2 class="text-center">证书信息查询</h2>

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

    <div v-if="parsed_cert">
      <!-- 主题信息 -->
      <div>
        <h2>主题信息</h2>

        <div class="mo-form-detail mt-sm">
          <el-form
            label-width="130px"
            label-position="right"
          >
            <el-form-item
              label="通用名称(CN)"
              prop="domain"
            >
              <span>{{ parsed_cert.subject.CN || '-' }}</span>
            </el-form-item>

            <el-form-item
              label="组织(O)"
              prop="domain"
            >
              <span>{{ parsed_cert.subject.O || '-' }}</span>
            </el-form-item>

            <el-form-item
              label="部门(OU)"
              prop="domain"
            >
              <span>{{ parsed_cert.subject.OU || '-' }}</span>
            </el-form-item>

            <el-form-item
              label="城市(L)"
              prop="domain"
            >
              <span>{{ parsed_cert.subject.L || '-' }}</span>
            </el-form-item>

            <el-form-item
              label="省份(ST)"
              prop="domain"
            >
              <span>{{ parsed_cert.subject.ST || '-' }}</span>
            </el-form-item>

            <el-form-item
              label="国家(C)"
              prop="domain"
            >
              <span>{{ parsed_cert.subject.C || '-' }}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!-- 签发者信息 -->
      <div class="mt-md">
        <h2>签发者信息</h2>

        <div class="mo-form-detail mt-sm">
          <el-form
            label-width="130px"
            label-position="right"
          >
            <el-form-item
              label="通用名称(CN)"
              prop="domain"
            >
              <span>{{ parsed_cert.issuer.CN || '-' }}</span>
            </el-form-item>

            <el-form-item
              label="组织(O)"
              prop="domain"
            >
              <span>{{ parsed_cert.issuer.O || '-' }}</span>
            </el-form-item>

            <el-form-item
              label="国家(C)"
              prop="domain"
            >
              <span>{{ parsed_cert.issuer.C || '-' }}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!-- 证书信息 -->
      <div class="mt-md">
        <h2>证书信息</h2>

        <div class="mo-form-detail mt-sm">
          <el-form
            label-width="130px"
            label-position="right"
          >
            <!-- <el-form-item
              label="版本"
              prop="domain"
            >
              <span>{{ parsed_cert.version || '-' }}</span>
            </el-form-item> -->

            <el-form-item
              label="序列号"
              prop="domain"
            >
              <span>{{ parsed_cert.serialNumber || '-' }}</span>
            </el-form-item>

            <el-form-item
              label="算法"
              prop="domain"
            >
              <span>{{ parsed_cert.signatureAlgorithm || '-' }}</span>
            </el-form-item>

            <el-form-item
              label="颁发日期"
              prop="domain"
            >
              <span>{{ parsed_cert.notBefore || '-' }}</span>
            </el-form-item>

            <el-form-item
              label="颁发日期"
              prop="domain"
            >
              <span>{{ parsed_cert.notAfter || '-' }}</span>
            </el-form-item>

            <el-form-item
              label="剩余天数"
              prop="domain"
            >
              <span>{{ parsed_cert.expireDays || '-' }}</span>
            </el-form-item>

            
            <el-form-item
              label="是否有效"
              prop="domain"
            >
              <span v-if="parsed_cert.hasExpired === true">无效</span>
              <span v-if="parsed_cert.hasExpired === false">有效</span>
              <span v-else>未知</span>
            </el-form-item>

            <el-form-item
              label="备用名称"
              prop="domain"
            >
              <div
                v-if="
                  parsed_cert.subjectAltName &&
                  parsed_cert.subjectAltName.length > 0
                "
              >
                <template v-for="item in parsed_cert.subjectAltName">
                  <div>{{ item }}</div>
                </template>
              </div>
              <span v-else>-</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <!-- OpenSSL -->
    <div
      class="mt-md"
      v-if="cert_text"
    >
      <h2>OpenSSL</h2>

      <pre class="mt-sm">{{ cert_text }}</pre>
    </div>

    <!-- CERTIFICATE -->
    <div
      class="mt-md"
      v-if="cert_pem"
    >
      <h2>CERTIFICATE</h2>

      <pre class="mt-sm">{{ cert_pem }}</pre>
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

        domain: this.form.domain,
      }

      let res = await this.$http.getCertInformation(params)

      if (res.ok) {
        this.cert_pem = res.data.cert_pem
        this.cert_text = res.data.cert_text
        this.parsed_cert = res.data.parsed_cert
        this.form.domain = res.data.resolve_domain

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
