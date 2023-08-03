<template>
  <div class="">
    <!-- 操作按钮 -->
    <div class="flex justify-between items-center">
      <el-button v-if="RoleEnum.User == role"
        type="primary"
        @click="handleAddRow"
        :disabled="!domainRow.has_edit_permission"
        ><el-icon><Plus /></el-icon>{{ $t('添加') }}</el-button
      >
      <span v-else></span>

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
          :disabled="disableUpdateButton"
          @click="updateAllAddress"
          ><el-icon><Refresh /></el-icon>全部更新</el-link
        >
      </div>

      <!-- <el-input
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
      </el-input> -->
    </div>

    <!-- 数据列表 -->
    <DataTable
      class="mt-sm"
      v-loading="loading"
      :list="list"
      :role="role"
      :domainId="domainId"
      :domainRow="domainRow"
      :disableUpdateButton="disableUpdateButton"
      @on-success="resetData"
      @on-selection-change="handleSelectionChange"
    />

    <!-- 翻页 -->
    <el-pagination
      class="mt-md justify-center"
      background
      layout="total, sizes, prev, pager, next"
      :total="total"
      v-model:page-size="size"
      v-model:current-page="page"
      @current-change="getData"
      @size-change="handleSizeChange"
    />

    <!-- 编辑框 -->
    <DataFormDialog
      v-model:visible="dialogVisible"
      :domainId="domainId"
      @on-success="handleAddSuccess"
    ></DataFormDialog>
  </div>
</template>

<script>
/**
 * created 2023-06-03
 */

import DataFormDialog from '../address-edit/DataFormDialog.vue'
import DataTable from './DataTable.vue'
import { RoleEnum } from '@/emuns/role-enums.js'

export default {
  name: 'address-list',

  props: {
    domainRow: {
      type: Object,
      default: null,
    },

    domainId: {
      type: Number,
      default: null,
    },
    role: {
      type: Number,
    },
  },

  components: {
    DataFormDialog,
    DataTable,
  },

  data() {
    return {
      RoleEnum,
      list: [],
      total: 0,
      page: 1,
      size: 10,
      keyword: '',
      selectedRows: [],
      loading: true,
      dialogVisible: false,
      is_auto_update: true,
    }
  },

  computed: {
    disableUpdateButton() {
      return !this.is_auto_update
    },

    showBatchDeleteButton() {
      if (this.selectedRows && this.selectedRows.length > 0) {
        return true
      } else {
        return false
      }
    },
  },

  methods: {
    async resetData() {
      this.page = 1

      // await this.getDomainById()
      await this.getData()
    },

    async getDomainById() {
      let params = {
        domain_id: this.domainId,
      }

      const res = await this.$http.getDomainById(params)

      if (res.ok) {
        this.is_auto_update = res.data.auto_update
      }
    },

    async getData() {
      this.loading = true

      let params = {
        domain_id: this.domainId,
        page: this.page,
        size: this.size,
      }

      try {
        const res = await this.$http.getAddressListByDomainId(params)

        if (res.code == 0) {
          this.list = res.data.list
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

    async updateAllAddress() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        domain_id: this.domainId,
      }

      // 编辑
      let res = await this.$http.updateAddressListInfoByDomainId(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.resetData()
      } else {
        this.$msg.error(res.msg)
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },

    handleSizeChange(value) {
      this.resetData()
    },

    handleSelectionChange(val) {
      this.selectedRows = val
      // console.log(val.map((item) => item.id))
    },

    async handleBatchDeleteConfirm() {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        address_ids: this.selectedRows.map((item) => item.id),
      }

      try {
        const res = await this.$http.deleteAddressByIds(params)

        if (res.ok) {
          this.$msg.success('操作成功')
          this.resetData()
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
    this.resetData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
