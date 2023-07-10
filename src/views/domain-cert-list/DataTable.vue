<template>
  <div>
    <el-table
      stripe
      border
      v-bind="$attrs"
    >
      <!-- 域名 -->
      <el-table-column
        label="Common Name"
        header-align="center"
        align="center"
        show-overflow-tooltip
        prop="domain"
      >
        <template #default="scope">
          <span>{{ scope.row.common_name }}</span>
        </template>
      </el-table-column>

      <!-- Not Before -->
      <el-table-column
        label="Not Before"
        header-align="center"
        align="center"
        width="200"
        show-overflow-tooltip
        prop="domain"
      >
        <template #default="scope">
          <span>{{ scope.row.not_before }}</span>
        </template>
      </el-table-column>

      <!-- Not After -->
      <el-table-column
        label="Not After"
        header-align="center"
        align="center"
        width="200"
        show-overflow-tooltip
        prop="domain"
      >
        <template #default="scope">
          <span>{{ scope.row.not_after }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/**
 * created 2022-10-01
 */

export default {
  name: '',

  components: {},

  emits: ['on-success', 'selection-change', 'sort-change', 'on-refresh-row'],

  props: {},

  computed: {},

  data() {
    return {
      currentRow: null,
      dialogVisible: false,
      dialogDetailVisible: false,

      AddressListgDialogVisible: false,
    }
  },

  methods: {
    handleEditRow(row) {
      this.currentRow = row
      this.dialogVisible = true
    },

    async handleDeleteClick(row) {
      let params = {
        id: row.id,
      }

      const res = await this.$http.deleteDomainById(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },

    async handleStatusChange(row) {
      let params = {
        id: row.id,
      }

      const res = await this.$Http.function(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },

    async handleMonitorStatusChange(row, value) {
      // console.log(row, value)

      let params = {
        domain_id: row.id,
        is_monitor: value,
      }

      const res = await this.$http.updateDomainExpireMonitorById(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        // this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },

    async handleUpdateRowDomainInfo(row) {
      let loading = this.$loading({
        lock: true,
        text: '更新中',
      })

      let params = {
        id: row.id,
      }

      const res = await this.$http.updateDomainRowInfoById(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      }

      loading.close()
    },

    handleUpdateSuccess() {
      this.$emit('on-success')
    },

    handleDetailSuccess() {
      // this.$emit('on-success')
    },

    handleShowDetail(row) {
      this.currentRow = row
      this.dialogDetailVisible = true
    },

    handleShowAddressListgDialog(row) {
      this.currentRow = row
      this.AddressListgDialogVisible = true
    },

    async handleAutoUpdateStatusChange(row, value) {
      // console.log(row, value)

      let params = {
        domain_id: row.id,
        field: 'auto_update',
        value: value,
      }

      const res = await this.$http.updateDomainFieldById(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        // this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },

    handleRefreshRow(row) {
      this.$emit('on-refresh-row', row)
    },

    handleSelectable(row, index) {
      return row.has_edit_permission
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
