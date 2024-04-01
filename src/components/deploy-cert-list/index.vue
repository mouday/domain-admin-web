<template>
  <div class="">
    <!-- 操作按钮 -->
    <div class="flex justify-between">
      <el-button
        type="primary"
        @click="handleAddRow"
        ><el-icon><Plus /></el-icon>{{ $t('添加') }}</el-button
      >

      <!-- <el-input
        class="ml-sm"
        style="width: 260px"
        v-model="keyword"
        placeholder="输入服务器地址"
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

      <el-popconfirm
        :title="`${$t('确定部署')}？`"
        @confirm="handleDeployAllRow"
      >
        <template #reference>
          <el-button
            type="primary"
            :disabled="selectedRows.length == 0"
            ><el-icon><Position /></el-icon>{{ $t('一键部署') }}</el-button
          >
        </template>
      </el-popconfirm>
    </div>

    <!-- 数据列表 -->
    <DataTable
      class="mt-md"
      v-loading="loading"
      :list="list"
      :certId="certId"
      @on-success="resetData"
      @on-edit-row="handleEditRow"
      @on-deploy="handleDeployOneRow"
      @on-selection-change="handleSelectionChange"
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
      :certId="certId"
      @on-success="handleAddSuccess"
    ></DataFormDialog>
  </div>
</template>

<script>
/**
 * created 2024-03-31
 */

import DataFormDialog from '../deploy-cert-edit/DataFormDialog.vue'
import DataTable from './DataTable.vue'
import * as timeUtil from '@/utils/time-util.js'

export default {
  name: 'deploy-cert-list',

  props: {
    certId: { type: Number, default: null },
  },

  components: {
    DataFormDialog,
    DataTable,
  },

  data() {
    return {
      selectedRows: [],
      list: [],
      total: 0,
      page: 1,
      size: 20,
      keyword: '',

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

    handleRow(item) {
      if (item.status == 1) {
        item.deploy_status = true
        item.deploy_status_label = '部署成功'
      } else if (item.status == 2) {
        item.deploy_status = false
        item.deploy_status_label = '部署失败'
      } else {
        item.deploy_status = null
        item.deploy_status_label = '未部署'
      }

      return item
    },
    async getData() {
      this.loading = true

      let params = {
        cert_id: this.certId,
        page: this.page,
        size: this.size,
        keyword: this.keyword,
      }

      try {
        const res = await this.$http.getDeployListByCertId(params)

        if (res.code == 0) {
          this.list = res.data.list.map((item) => {
            return this.handleRow(item)
          })
          this.total = res.data.total
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },

    async getDeployCertById(deploy_cert_id) {
      let params = {
        deploy_cert_id: deploy_cert_id,
      }

      const res = await this.$http.getDeployCertById(params)

      if (res.ok) {
        this.list = this.list.map((item) => {
          if (item.deploy_cert_id == deploy_cert_id) {
            return this.handleRow(res.data)
          } else {
            return item
          }
        })
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

    handleDeployAll() {},

    async handleDeployRow(row) {
      let params = {
        // 域名列表
        deploy_cert_id: row.deploy_cert_id,
      }

      const res = await this.$http.handleDeployCert(params)

      await this.getDeployCertById(row.deploy_cert_id)

      // if (res.code == 0) {
      //   // this.$emit('on-success', res.data)
      // } else {
      //   this.$msg.error(res.msg)
      // }

      return res
    },

    async handleDeployOneRow(row) {
      let loading = this.$loading({ fullscreen: true })

      const res = await this.handleDeployRow(row)

      if (res.ok) {
        this.$msg.success('部署完成')
      } else {
        this.$msg.error(res.msg)
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },

    async handleDeployAllRow() {
      let loading = this.$loading({ fullscreen: true })
      // console.log(loading)

      let success = 0
      let total = this.selectedRows.length

      // await timeUtil.sleep(3)

      for (let row of this.selectedRows) {
        success++
        loading.setText(`部署中：${success} / ${total}`)
        await this.handleDeployRow(row)
      }

      this.$msg.success('部署完成')

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },

    handleSelectionChange(val) {
      this.selectedRows = val
      console.log(val)
      // console.log(val.map((item) => item.id))
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
