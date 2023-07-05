<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
    >
      <!-- <el-table-column
        label="ID"
        align="center"
        prop="id"
        width="60"
      >
        <template #default="scope">
          <span>{{ scope.row.id || '-' }}</span>
        </template>
      </el-table-column>
        -->

      <!-- 操作人 -->
      <el-table-column
        label="操作人"
        header-align="center"
        align="center"
        width="100"
        prop="user_name"
        show-overflow-tooltip
      >
        <template #default="scope">
          <span>{{ scope.row.user_name || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 操作表 -->
      <el-table-column
        label="操作表"
        width="120"
        header-align="center"
        align="center"
        prop="table"
        show-overflow-tooltip
      >
        <template #default="scope">
          <span>{{ scope.row.table || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 操作类型 -->
      <el-table-column
        label="操作类型"
        header-align="center"
        align="center"
        prop="type_id"
        width="100"
      >
        <template #default="scope">
          <el-tag :type="scope.row.type_style">{{
            scope.row.type_label
          }}</el-tag>
        </template>
      </el-table-column>

      <!-- 操作类型 -->
      <el-table-column
        label="数据变化"
        header-align="center"
        align="left"
        prop="type_id"
      >
        <template #default="scope">
          <!-- <pre
            v-if="scope.row.type_style == ''"
            class="code"
            v-html="scope.row.data"
          ></pre> -->

          <!-- <highlightjs
            v-else
            language="json"
            :code="scope.row.data"
          /> -->

          <pre
            v-if="scope.row.type_style == ''"
          ><code class="language-diff" v-html="scope.row.data"></code></pre>
          <pre
            v-else
          ><code class="language-json" v-html="scope.row.data"></code></pre>
        </template>
      </el-table-column>

      <!-- 操作前 -->
      <!-- <el-table-column
        label="操作前"
        header-align="center"
        align="left"
        prop="before"
        show-overflow-tooltip
      >
        <template #default="scope">
          批量删除 -->
      <!-- <template v-if="scope.row.type_id == 4">
            <template v-if="scope.row.before && scope.row.before.length > 0">
              <div v-for="(item, index) in scope.row.before">
                <div v-for="(value, key) in item">{{ key }}: {{ value }}</div>
                <el-divider v-if="index + 1 < scope.row.before.length" />
              </div>
            </template>
            <span v-else>-</span>
          </template> -->

      <!-- 其他 -->
      <!-- <template v-else>
            <template v-if="scope.row.before">
              <div v-for="(value, key) in scope.row.before">
                {{ key }}: {{ value }}
              </div>
            </template>

            <span v-else>-</span>
          </template>
        </template>
      </el-table-column> -->

      <!-- 操作后 -->
      <!-- <el-table-column
        label="操作后"
        header-align="center"
        align="left"
        prop="after"
        show-overflow-tooltip
      >
        <template #default="scope">
          <template v-if="scope.row.after">
            <div v-for="(value, key) in scope.row.after">
              {{ key }}: {{ value }}
            </div>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column> -->

      <!-- 操作时间 -->
      <el-table-column
        label="操作时间"
        header-align="center"
        align="center"
        prop="create_time"
        width="100"
      >
        <template #default="scope">
          <span>{{ scope.row.create_time_label || '-' }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/**
 * created 2023-07-04
 */
import hljs from 'highlight.js'

export default {
  name: '',

  components: {},

  props: {
    list: {
      type: Array,
    },
  },

  computed: {},

  data() {
    return {
      currentRow: null,
      dialogVisible: false,
    }
  },

  methods: {
    handleEditRow(row) {
      this.currentRow = row
      this.dialogVisible = true
    },

    async handleDeleteClick(row) {
      let params = {
        id: row.id,
      }

      const res = await this.$http.function(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },

    async handleStatusChange(row) {
      let params = {
        id: row.id,
      }

      const res = await this.$http.function(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },

    handleUpdateSuccess() {
      this.$emit('on-success')
    },
  },

  mounted() {
    hljs.highlightAll()
  },

  created() {},
}
</script>

<style lang="less">
.removed,
.added {
  position: relative;
}

.removed::before,
.added::before {
  position: absolute;
  padding-left: 4px;
}

.removed,
.hljs-deletion {
  // background-color: rgb(251, 233, 235);
  background-color: #ffebe9;
}

.removed::before {
  content: '-';
}

.added,
.hljs-addition {
  // background-color: rgb(236, 253, 240);
  background-color: #e6ffec;
}
.added::before {
  content: '+';
}
</style>

<style lang="less" scoped></style>
