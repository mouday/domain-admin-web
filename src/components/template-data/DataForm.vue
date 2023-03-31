<template>
  <div>
    <el-form label-width="0">
      <el-form-item label="">
        <el-input
          type="textarea"
          :rows="20"
          v-model="templateData"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center">
      <el-button
        type="primary"
        @click="handleConfirm"
        >确 定</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  props: {},

  components: {},

  data() {
    return {
      templateData: '',
    }
  },

  computed: {},

  methods: {
    async getData() {
      let loading = this.$loading()

      const res = await this.$http.getTemplateData()

      if (res.data) {
        this.templateData = JSON.stringify(res.data, null, 4)
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },

    handleConfirm() {
      this.$emit('on-confirm')
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
