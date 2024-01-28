<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div class="margin-bottom--20">
      <el-button
        type="primary"
        @click="handleAddRow"
        ><el-icon><Plus /></el-icon>{{ $t('添加') }}</el-button
      >
    </div>

    <!-- 数据列表 -->
    <DataTable
      class="mt-md"
      v-loading="loading"
      :list="list"
      @on-success="resetData"
      @on-sort-change="handleSortChange"
    />

    <!-- 翻页 -->
    <el-pagination
      class="mt-md justify-center"
      background
      layout="total, prev, pager, next"
      :total="total"
      v-model:page-size="size"
      v-model:current-page="page"
      @current-change="getData"
    />

    <!-- 编辑框 -->
    <DataFormDialog
      v-model:visible="dialogVisible"
      @on-success="handleAddSuccess"
    ></DataFormDialog>
  </div>
</template>

<script>
/**
 * created 2023-06-20
 */

import DataFormDialog from '../notify-edit/DataFormDialog.vue'
import DataTable from './DataTable.vue'
import { notifyTypeFilter } from '@/emuns/notify-type-enums.js'
import { eventFilter, EventEnum } from '@/emuns/event-enums.js'

export default {
  name: 'notify-list',

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
      keyword: '',

      loading: true,
      dialogVisible: false,

      order_type: '',
      order_prop: '',
    }
  },

  computed: {},

  methods: {
    resetData() {
      this.page = 1
      this.getData()
    },

    async getData() {
      this.loading = true

      let params = {
        page: this.page,
        size: this.size,
        keyword: this.keyword,
        order_type: this.order_type,
        order_prop: this.order_prop,
      }

      try {
        const res = await this.$http.getNotifyListOfUser(params)

        if (res.code == 0) {
          this.list = res.data.list.map((item) => {
            item.type_label = notifyTypeFilter(item.type_id)
            item.event_label = eventFilter(item.event_id)
            
            if (item.event_id == EventEnum.MONITOR_EXCEPTION) {
              item.expire_days = null
              item.disable_test = true
            }

            return item
          })
          this.total = res.data.total
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },

    handleAddRow() {
      this.dialogVisible = true
    },

    handleAddSuccess() {
      this.resetData()
    },

    handleSearch() {
      this.resetData()
    },

    handleSortChange({ column, prop, order }) {
      console.log(column, prop, order)

      // 先清空
      this.order_prop = ''
      this.order_type = ''

      // 如果有排序字段，再赋值
      if (order) {
        this.order_type = order
        this.order_prop = prop
      }

      this.resetData()
    },
  },

  created() {
    this.resetData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
