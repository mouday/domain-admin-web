<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
    >
      <!--       
      <el-table-column
        label="ID"
        align="center"
        prop="id"
        width="60"
      >
        <template #default="scope">
          <span>{{ scope.row.id || '-' }}</span>
        </template>
      </el-table-column> -->

      <!-- 配置项 -->
      <el-table-column
        label="配置项"
        header-align="center"
        align="right"
        width="260"
        prop="label"
      >
        <template #default="scope">
          <span>{{ scope.row.label || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 值 -->
      <el-table-column
        label="值"
        header-align="center"
        align="left"
        prop="value"
      >
        <template #default="scope">
          <el-input
            v-if="scope.row.is_edit_mode"
            v-model="scope.row.value"
            :placeholder="scope.row.placeholder"
          ></el-input>
          <span v-else>{{ scope.row.value || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <!-- <el-table-column
        label="状态"
        header-align="center"
        align="center"
        width="80"
      >
        <template #default="scope">
          <mo-switch
            v-model="scope.row.status"
            @change="handleStatusChange(scope.row, $event)"
          ></mo-switch>
        </template>
      </el-table-column> -->

      <el-table-column
        label="编辑"
        width="120"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <template v-if="scope.row.is_edit_mode">
            <el-link
              :underline="false"
              type="success"
              @click="handleSaveRow(scope.row)"
              ><el-icon><Select /></el-icon>保存</el-link
            >
            <el-link
              class="ml-sm"
              :underline="false"
              type="warning"
              @click="handleCancelRow(scope.row)"
              ><el-icon><CloseBold /></el-icon>取消</el-link
            >
          </template>
          <el-link
            v-else
            :underline="false"
            type="primary"
            @click="handleEditRow(scope.row)"
            ><el-icon><Edit /></el-icon>编辑</el-link
          >
        </template>
      </el-table-column>

      <!-- <el-table-column
        label="删除"
        width="50"
        align="center"
        prop="tag"
      >
        <template #default="scope">
          <el-popconfirm
            title="确定删除？"
            @confirm="handleDeleteClick(row)"
          >
            <mo-delete-button slot="reference"></mo-delete-button>
          </el-popconfirm>
        </template>
      </el-table-column> -->
    </el-table>

    <!-- 编辑框 -->
    <!-- <DataFormDailig
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDailig> -->
  </div>
</template>

<script>
/**
 * created 2022-10-02
 */
// import DataFormDailig from '../system-edit/DataFormDailig.vue'

export default {
  name: '',

  components: {
    // DataFormDailig,
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
      row.is_edit_mode = true
      // this.currentRow = row
      // this.dialogVisible = true
    },

    handleCancelRow(row) {
      row.is_edit_mode = false
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

    async handleSaveRow(row) {
      let params = {
        key: row.key,
        value: row.value,
      }

      const res = await this.$http.updateSystemConfig(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        row.is_edit_mode = false
        // this.$emit('on-success')
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
