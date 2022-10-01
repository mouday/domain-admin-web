<template>
  <div>
    <el-table :data="list">
      {% raw %}
      <el-table-column
        label="ID"
        align="center"
        prop="id"
        width="60"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id || '-' }}</span>
        </template>
      </el-table-column>
      {% endraw %} {% for item in table.columns %}
      <!-- {{item.comment}} -->
      <el-table-column
        label="{{item.comment or item.name }}"
        header-align="center"
        align="center"
        prop="{{ item.name }}"
      >
        <template slot-scope="scope">
          {% raw %}<span
            >{{ scope.row.{% endraw %}{{ item.name }}{% raw %} || '-' }}</span
          >{% endraw %}
        </template>
      </el-table-column>
      {% endfor %}

      <!-- 操作 -->
      <el-table-column
        label="状态"
        header-align="center"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <mo-switch
            v-model="scope.row.status"
            @change="handleStatusChange(scope.row, $event)"
          ></mo-switch>
        </template>
      </el-table-column>

      <el-table-column
        label="编辑"
        width="60"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <mo-edit-button @click="handleEditRow(scope.row)"></mo-edit-button>
        </template>
      </el-table-column>

      <el-table-column
        label="删除"
        width="50"
        align="center"
        prop="tag"
      >
        <template v-slot="{ row }">
          <el-popconfirm
            title="确定删除？"
            @confirm="handleDeleteClick(row)"
          >
            <mo-delete-button slot="reference"></mo-delete-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑框 -->
    <DataFormDailig
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDailig>
  </div>
</template>

<script>
/**
 * created {{time.date}}
 */
import DataFormDailig from '../{{edit_name}}/DataFormDailig.vue'

export default {
  name: '',

  components: {
    DataFormDailig,
  },

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

      const res = await this.$Http.function(params)

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

      const res = await this.$Http.function(params)

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

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
