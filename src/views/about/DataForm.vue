<template>
  <div class="mo-form-detail about-system">
    <el-form
      ref="form"
      :model="form"
      label-width="130px"
    >
      <!-- 域名 -->

      <el-form-item
        label="当前版本"
        prop="domain"
      >
        {{ version }}
      </el-form-item>

      <!-- ip -->

      <el-form-item
        label="最新版本"
        prop="ip"
      >
        <a
          href="https://pypi.org/project/domain-admin/"
          target="_blank"
          ><img
            alt="Version"
            src="https://img.shields.io/pypi/v/domain-admin.svg"
        /></a>
      </el-form-item>

      <el-form-item
        label="问题反馈"
        prop="connect_status"
      >
        <a
          class="inline-block"
          href="https://github.com/mouday/domain-admin/issues"
          target="_blank"
          ><img
            alt="GitHub issues"
            src="https://img.shields.io/github/issues/mouday/domain-admin"
        /></a>
      </el-form-item>

      <el-form-item
        label="给我们点赞"
        prop="connect_status"
      >
        <a
          class="inline-block"
          href="https://github.com/mouday/domain-admin"
          target="_blank"
          ><img
            alt="GitHub stars"
            src="https://img.shields.io/github/stars/mouday/domain-admin.svg?style=social"
        /></a>
      </el-form-item>

      <el-form-item
        label="QQ交流群"
        prop="domain"
      >
        <span>731742868</span>
      </el-form-item>

      <el-form-item
        label="微信交流群"
        prop="domain"
      >
        <div class="flex flex-col items-center w-full">
          <img
            class="qr-code"
            src="@/assets/qrcode_for_coding-tree.jpg"
          />
          <div>回复: <span class="font-bold">domain-admin</span> </div>
        </div>
      </el-form-item>

      <!-- 创建时间 -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',

  props: {},

  components: {},

  data() {
    return {
      version: '',
    }
  },

  computed: {},

  methods: {
    async getData() {
      const res = await this.$http.getSystemVersion()
      this.version = res.data.version
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less">
.qr-code {
  width: 100px;
  height: 100px;
}

.about-system {
}
</style>
