<template>
  <div class="app-container">
    <!-- 数据列表 -->
    <DataTable
      v-loading="loading"
      :list="list"
      @on-success="resetData"
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
  </div>
</template>

<script>
/**
 * created 2023-07-04
 */

import DataTable from './DataTable.vue'
import { OperationEnum } from '@/emuns/operation-enums.js'
import * as Diff from 'diff'
import { highlight } from '@/utils/highlight-util.js'

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
      pageSizeCachekey: 'pageSize',
    }
  },

  computed: {},

  methods: {
    resetData() {
      this.page = 1
      this.list = []
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
            // 格式化
            try {
              item.before = JSON.stringify(JSON.parse(item.before), null, 2)
            } catch (e) {}

            try {
              item.after = JSON.stringify(JSON.parse(item.after), null, 2)
            } catch (e) {}

            // 更新
            if (item.type_id == OperationEnum.UPDATE) {
              let ret = Diff.diffArrays(
                item.before.split('\n'),
                item.after.split('\n')
              )

              let lst = ret.map((part) => {
                // if (part.added) {
                //   return part.value
                //     .map((x) => '<div class="added">' + x + '</div>')
                //     .join('')
                // } else if (part.removed) {
                //   return part.value
                //     .map((x) => '<div class="removed">' + x + '</div>')
                //     .join('')
                // } else {
                //   return part.value.map((x) => '<div>' + x + '</div>').join('')
                // }

                if (part.added) {
                  return part.value.map((x) => '+' + x).join('\n')
                } else if (part.removed) {
                  return part.value.map((x) => '-' + x).join('\n')
                } else {
                  return part.value.map((x) => x).join('\n')
                }
              })

              // console.log(lst.join(''));
              // item.data = lst.join('\n')

              item.data = highlight(lst.join('\n'), { language: 'diff' }).value
              // console.log(item.data);

              item.type_style = ''
            } else if (item.type_id == OperationEnum.CREATE) {
              item.data = highlight(item.after, { language: 'json' }).value
              item.type_style = 'success'
            } else if (item.type_id == OperationEnum.DELETE) {
              item.data = highlight(item.before, { language: 'json' }).value
              item.type_style = 'danger'
            } else if (item.type_id == OperationEnum.BATCH_DELETE) {
              item.data = highlight(item.before, { language: 'json' }).value
              item.type_style = 'danger'
            }
            // console.log(item);
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

    handleSizeChange(value) {
      localStorage.setItem(this.pageSizeCachekey, value)
      this.resetData()
    },

    loadPageSize() {
      let size = localStorage.getItem(this.pageSizeCachekey)
      if (size) {
        this.size = parseInt(size)
      }
    },
  },

  created() {
    this.loadPageSize()
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
