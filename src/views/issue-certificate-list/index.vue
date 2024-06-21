<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div class="flex justify-between margin-bottom--20">
      <div class="flex items-center">
        <el-button
          type="primary"
          @click="handleAddRow"
          ><el-icon><Plus /></el-icon>{{ $t('申请') }}</el-button
        >
      </div>

      <el-input
        class="ml-sm"
        style="width: 260px"
        v-model="keyword"
        :placeholder="$t('搜索域名')"
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
      <DataCount :value="total"></DataCount>

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

        <el-link
          :underline="false"
          type="primary"
          class="mr-sm"
          @click="handleHostList"
          ><el-icon><Setting /></el-icon>主机列表</el-link
        >

        <el-link
          :underline="false"
          type="primary"
          class="mr-sm"
          @click="handleDNSList"
          ><el-icon><Setting /></el-icon>DNS列表</el-link
        >
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
      @on-refresh-row="handleRefreshRow"
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
import DataCount from '@/components/DataCount.vue'

export default {
  name: 'issue-certificate-list',

  props: {},

  components: {
    DataFormDialog,
    DataTable,
    DataCount,
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
        const res = await this.$http.getIssueCertificateList(params)

        if (res.code == 0) {
          this.list = res.data.list.map((item) => {
            if (item.status == 'pending') {
              item.show_status = null
              item.status_label = this.$t('未验证')
            } else if (item.status == 'valid') {
              item.show_status = true
              item.status_label = this.$t('已验证')
            } else {
              item.show_status = false
              item.status_label = this.$t('未知')
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

    async handleRefreshRow(row) {
      let params = {
        issue_certificate_id: row.id,
      }

      const res = await this.$http.getIssueCertificateById(params)

      if (res.ok) {
        let index = this.list.findIndex((item) => item.id == row.id)

        this.list.splice(index, 1, res.data)
        // console.log(this.list)
      }
    },

    handleHostList() {
      this.$router.push({
        name: 'host-list',
      })
    },

    handleDNSList() {
      this.$router.push({
        name: 'dns-list',
      })
    },

    handleEditRow(row) {},
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
