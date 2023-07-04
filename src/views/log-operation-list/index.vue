<template>
  <div class="app-container">
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
      layout="total, prev, pager, next"
      :total="total"
      v-model:page-size="size"
      v-model:current-page="page"
      @current-change="getData"
    />
  </div>
</template>

<script>
/**
 * created 2023-07-04
 */

import DataTable from './DataTable.vue'
import * as Diff from 'diff'

export default {
  name: 'log_operation-list',

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

    async getData() {
      this.loading = true

      let params = {
        page: this.page,
        size: this.size,
        keyword: this.keyword,
      }

      try {
        const res = await this.$http.getOperationLogList(params)

        if (res.code == 0) {
          this.list = res.data.list.map((item) => {
            try {
              item.before = JSON.parse(item.before)
            } catch (e) {}

            try {
              item.after = JSON.parse(item.after)
            } catch (e) {}

            // 更新
            if (item.type_id == 2) {
              // let before = this.getObjectString(item.before)
              // let after = this.getObjectString(item.after)
              let ret = Diff.diffJson(item.before, item.after)
              console.log(ret)

              let lst = []
              ret.forEach((part) => {
                console.log(part)

                if (part.added) {
                  lst.push('<div class="added">' + part.value + '</div>')
                } else if (part.removed) {
                  lst.push('<div class="removed">' + part.value + '</div>')
                } else {
                  lst.push('<div>' + part.value + '</div>')
                }
              })

              // console.log(lst.join(''));
              item.data = lst.join('')
            } else if (item.type_id == 1) {
              item.data = JSON.stringify(item.after, null, 2)
            } else if (item.type_id == 3) {
              item.data = JSON.stringify(item.before, null, 2)
            } else if (item.type_id == 4) {
              item.data = JSON.stringify(item.before, null, 2)
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

    getObjectString(obj) {
      let lst = []
      for (let [key, value] of Object.entries(obj)) {
        lst.push(`${key}: ${value}`)
      }

      return lst.join('\n')
    },

    handleSearch() {
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
