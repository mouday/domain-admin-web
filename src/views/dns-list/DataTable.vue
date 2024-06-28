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
      </el-table-column> -->

      <!-- 类型 -->
      <el-table-column
        label="类型"
        header-align="center"
        align="center"
        prop="dns_type_id"
        width="120"
      >
        <template #default="scope">
          <span>{{ scope.row.dns_type_label || '-' }}</span>
        </template>
      </el-table-column>


      <!-- 名称 -->
      <el-table-column
        label="名称"
        header-align="center"
        align="center"
        prop="name"
        width="140"
      >
        <template #default="scope">
          <span>{{ scope.row.name || '-' }}</span>
        </template>
      </el-table-column>

      <!-- Access Key -->
      <el-table-column
        label="Access Key"
        header-align="center"
        align="center"
        prop="access_key"
      >
        <template #default="scope">
          <span>{{ scope.row.access_key || '-' }}</span>
        </template>
      </el-table-column>

      <!-- Secret Key -->
      <el-table-column
        label="Secret Key"
        header-align="center"
        align="center"
        prop="secret_key"
      >
        <template #default="scope">
          <span>{{ scope.row.secret_key || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 创建时间 -->
      <el-table-column
        label="创建时间"
        header-align="center"
        align="center"
        prop="create_time"
        width="200"
      >
        <template #default="scope">
          <span>{{ scope.row.create_time || '-' }}</span>
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
          <el-switch
            v-model="scope.row.status"
            @change="handleStatusChange(scope.row, $event)"
          />
        </template>
      </el-table-column> -->

      <el-table-column
        label="编辑"
        width="60"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            type="primary"
            @click="handleEditRow(scope.row)"
            ><el-icon><Edit /></el-icon
          ></el-link>
        </template>
      </el-table-column>

      <el-table-column
        label="删除"
        width="60"
        align="center"
        prop="tag"
      >
        <template #default="scope">
          <el-popconfirm
            :title="`${$t('确定删除')}？`"
            @confirm="handleDeleteClick(scope.row)"
          >
            <template #reference>
              <el-link
                :underline="false"
                type="danger"
                ><el-icon><Delete /></el-icon
              ></el-link>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑框 -->
    <DataFormDialog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDialog>
  </div>
</template>

<script>
/**
 * created 2024-06-21
 */
import DataFormDialog from '../dns-edit/DataFormDialog.vue'

export default {
  name: '',

  components: {
    DataFormDialog,
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
        dns_id: row.id,
      }

      const res = await this.$http.deleteDnsById(params)

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

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
