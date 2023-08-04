<template>
  <div class="app-container">
    <!-- 操作按钮 -->
    <div class="flex items-center">
      <div>子域名证书查询</div>
      <el-input
        class="ml-md"
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

      <!-- <div style="font-size: 14px; color: #333333; margin-left: auto">
        共计 {{ total }} 条数据
      </div> -->

    </div>

    <!-- 数据列表 -->
    <DataTable
      class="mt-md"
      v-loading="loading"
      :data="list"
    />

    <!-- 翻页 -->
    <!-- <el-pagination
      class="mt-md justify-center"
      background
      layout="total, sizes, prev, pager, next"
      :total="total"
      v-model:page-size="size"
      v-model:current-page="page"
      @current-change="getData"
      @size-change="handleSizeChange"
    /> -->
  </div>
</template>

<script>
/**
 * created 2022-10-01
 */

import DataTable from './DataTable.vue'

export default {
  name: 'domain-list',

  props: {},

  components: {
    DataTable,
  },

  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      size: 20,
      keyword: '',

      loading: false,
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
      let loading = this.$loading({ fullscreen: true })

      let params = {
        keyword: this.keyword.trim(),
      }

      const res = await this.$http.getSubDomainCert(params)

      if (res.code == 0) {
        this.list = res.data.list
        this.total = res.data.total
      } else {
        this.$msg.error(res.msg)
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },

    handleSearch() {
      this.resetData()
    },
  },

  created() {
    this.keyword = this.$route.query.keyword || this.keyword
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
