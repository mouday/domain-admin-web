<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div class="flex justify-between margin-bottom--20">
      <el-button
        type="primary"
        @click="handleAddRow"
        ><el-icon><Plus /></el-icon>申请</el-button
      >

      <el-input
        class="ml-sm"
        style="width: 260px"
        v-model="keyword"
        placeholder="输入域名"
        clearable
        @keypress.enter="handleSearch"
        @clear="handleSearch"
      >
        <template #append>
          <el-button @click="handleSearch">
            <el-icon><Search /></el-icon
          ></el-button>
        </template>
      </el-input>
    </div>

    <div class="flex justify-between mt-sm items-center">
      <div style="font-size: 14px; color: #333333; line-height: 24px">
        共计 {{ total }} 条数据
      </div>

      <div>
        <el-popconfirm
          v-if="showBatchDeleteButton"
          title="确定删除选中？"
          @confirm="handleBatchDeleteConfirm"
        >
          <template #reference>
            <el-link
              :underline="false"
              type="danger"
              class="mr-sm"
              ><el-icon><Delete /></el-icon>批量删除</el-link
            >
          </template>
        </el-popconfirm>
      </div>
    </div>

    <!-- 数据列表 -->
    <DataTable
      class="mt-sm"
      v-loading="loading"
      :list="list"
      @on-success="resetData"
      @on-close="resetData"
      @on-edit-row="handleEditRow"
      @selection-change="handleSelectionChange"
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
      @on-close="resetData"
    ></DataFormDialog>
  </div>
</template>

<script>
/**
 * created 2023-07-23
 */

import DataFormDialog from '../issue-certificate-edit/DataFormDialog.vue'
import DataTable from './DataTable.vue'

export default {
  name: 'issue-certificate-list',

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
      selectedRows: [],
      loading: true,
      dialogVisible: false,
    }
  },

  computed: {
    showBatchDeleteButton() {
      if (this.selectedRows && this.selectedRows.length > 0) {
        return true
      } else {
        return false
      }
    },
  },

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
      }

      try {
        const res = await this.$http.getCertificateList(params)

        if (res.code == 0) {
          this.list = res.data.list.map((item) => {
            if (item.status == 'pending') {
              item.show_status = null
              item.status_label = '未验证'
            } else if (item.status == 'valid') {
              item.show_status = true
              item.status_label = '已验证'
            } else {
              item.show_status = false
              item.status_label = '未知'
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

    handleSelectionChange(val) {
      this.selectedRows = val
      // console.log(val.map((item) => item.id))
    },

    async handleBatchDeleteConfirm() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        ids: this.selectedRows.map((item) => item.id),
      }

      try {
        const res = await this.$http.deleteCertificateByBatch(params)

        if (res.code == 0) {
          this.$msg.success('操作成功')
          this.resetData()
        } else {
          this.$msg.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.$nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          loading.close()
        })
      }
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
