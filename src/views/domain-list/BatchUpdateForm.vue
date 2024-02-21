<template>
  <div v-loading="loading">
    <div class="text-center">已选中：{{ selectedRows.length }} 条数据</div>

    <el-form
      class="mt-md"
      ref="form"
      :inline="true"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item
        :label="$t('自动更新')"
        prop="auto_update"
      >
        <el-switch
          v-model="form.auto_update"
          @change="handleValueChange('auto_update', $event)"
        />
      </el-form-item>

      <el-form-item
        :label="$t('到期提醒')"
        prop="is_monitor"
      >
        <el-switch
          v-model="form.is_monitor"
          @change="handleValueChange('is_monitor', $event)"
        />
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="text-center">
      <el-button @click="handleCancel">{{ $t('取消') }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  props: {
    // 数据行
    selectedRows: { type: Array, default: [] },
  },

  components: {},

  data() {
    return {
      loading: false,

      form: {
        auto_update: true,
        is_monitor: true,
      },

      rules: {},
    }
  },

  computed: {},

  methods: {
    initData() {
      let auto_update_count = this.selectedRows.filter(
        (item) => item.auto_update
      ).length
      let is_monitor_count = this.selectedRows.filter(
        (item) => item.is_monitor
      ).length

      // 超过一半
      if (auto_update_count > this.selectedRows.length / 2) {
        this.form.auto_update = true
      } else {
        this.form.auto_update = false
      }

      if (is_monitor_count > this.selectedRows.length / 2) {
        this.form.is_monitor = true
      } else {
        this.form.is_monitor = false
      }
    },
    // 取消
    handleCancel() {
      this.$emit('on-cancel')
    },

    async handleValueChange(field, value) {
      let params = {
        domain_ids: this.selectedRows.map((item) => item.id),
        field: field,
        value: value,
      }

      const res = await this.$http.updateDomainFieldByIds(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },
  },

  created() {
    this.initData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
