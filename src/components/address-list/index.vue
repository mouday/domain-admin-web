<template>
  <div class="">
    <!-- 操作按钮 -->
    <div class="flex justify-between items-center">
      <el-button
        type="primary"
        @click="handleAddRow"
        ><el-icon><Plus /></el-icon>添加</el-button
      >

      <el-link
        :underline="false"
        type="primary"
        @click="updateAllAddress"
        ><el-icon><Refresh /></el-icon>全部更新</el-link
      >

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
      class="mt-md"
      v-loading="loading"
      :list="list"
      @on-success="resetData"
      @on-edit-row="handleEditRow"
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

export default {
  name: 'address-list',

  props: {
    domainId: {
      type: Number,
      default: null,
    },
  },

  components: {
    DataFormDialog,
    DataTable,
  },

  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      size: 10,
      keyword: '',

      loading: true,
      dialogVisible: false,
    }
  },

  computed: {
    disableUpdateButton() {
      return !(this.list && this.list.length > 0)
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
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
