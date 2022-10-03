<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <!-- <div class="margin-bottom--20">
      <el-button
        type="primary"
        @click="handleAddRow"
        >添加</el-button
      >
    </div> -->

    <!-- 数据列表 -->
    <DataTable
      v-loading="loading"
      :list="list"
      @on-success="resetData"
      @on-edit-row="handleEditRow"
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
    <!-- <DataFormDailig
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDailig> -->
  </div>
</template>

<script>
/**
 * created 2022-10-02
 */

// import DataFormDailig from '../system-edit/DataFormDailig.vue'
import DataTable from './DataTable.vue'

export default {
  name: 'system-list',

  props: {},

  components: {
    // DataFormDailig,
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

      const res = await this.$http.getAllSystemConfig(params)

      if (res.code == 0) {
        this.list = res.data.list.map((item) => {
          item.is_edit_mode = false
          return item
        })
        this.total = parseInt(res.data.count)
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
