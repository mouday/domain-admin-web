<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div>
      <el-button
        type="primary"
        @click="handleAddRow"
        >添加</el-button
      >
    </div>

    <!-- 数据列表 -->
    <DataTable
      class="margin-top--20"
      v-loading="loading"
      :list="list"
      @on-success="resetData"
    />

    <!-- 翻页 -->
    <div class="pagination">
      <mo-pagination
        :total="total"
        :page-size.sync="size"
        :current-page.sync="page"
        @change="getData"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>

    <!-- 编辑框 -->
    <DataFormDialog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDialog>
  </div>
</template>

<script>
/**
 * created 2022-10-01
 */

import DataFormDialog from '../domain-edit/DataFormDialog.vue'
import DataTable from './DataTable.vue'

export default {
  name: 'domain-list',

  props: {},

  components: {
    DataFormDialog,
    DataTable,
  },

  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      size: 20,
      keywords: '',

      loading: true,
      dialogVisible: false,
    }
  },

  computed: {},

  methods: {
    resetData() {
      this.page = 1
      this.getData()
    },

    refreshData() {
      this.getData()
    },

    async getData() {
      this.loading = true

      let params = {
        ticket: this.ticket,
        page: this.page,
        num: this.size,
        keywords: this.keywords,
      }

      const res = await this.$http.getDomainList(params)

      if (res.code == 0) {
        this.list = res.data.list.map((item) => {
          if (item.expire_days && item.total_days) {
            item.percentage = (item.expire_days / item.total_days) * 100
          } else {
            item.percentage = null
          }
          return item
        })
        this.total = parseInt(res.data.count)
      } else {
        this.$msg.error(e.msg)
      }

      this.loading = false
    },

    handleAddRow() {
      this.dialogVisible = true
    },

    handleAddSuccess() {
      this.resetData()
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
