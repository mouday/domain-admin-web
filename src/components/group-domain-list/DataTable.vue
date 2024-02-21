<template>
  <div>
    <el-table
      stripe
      border
      v-bind="$attrs"
      v-on="$events"
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

      <el-table-column
        type="selection"
        width="40"
        header-align="center"
        align="center"
        :selectable="handleSelectable"
      />

      <!-- 域名 -->
      <el-table-column
        label="域名"
        header-align="center"
        align="center"
        prop="domain"
      >
        <template #default="scope">
          <span>{{ scope.row.domain || '-' }}</span>
        </template>
      </el-table-column>

      <!-- ip -->
      <!-- <el-table-column
        label="ip"
        header-align="center"
        align="center"
        prop="ip"
      >
        <template #default="scope">
          <span
            >{{ scope.row.ip || '-' }}</span
          >
        </template>
      </el-table-column> -->

      <!-- 证书颁发时间 -->
      <!-- <el-table-column
        label="证书颁发时间"
        header-align="center"
        align="center"
        prop="start_time"
      >
        <template #default="scope">
          <span
            >{{ scope.row.start_time || '-' }}</span
          >
        </template>
      </el-table-column>
       -->
      <!-- 证书过期时间 -->
      <!-- <el-table-column
        label="证书过期时间"
        header-align="center"
        align="center"
        prop="expire_time"
      >
        <template #default="scope">
          <span
            >{{ scope.row.expire_time || '-' }}</span
          >
        </template>
      </el-table-column> -->

      <!-- 证书检查时间 -->
      <!-- <el-table-column
        label="证书检查时间"
        header-align="center"
        align="center"
        prop="check_time"
      >
        <template #default="scope">
          <span
            >{{ scope.row.check_time || '-' }}</span
          >
        </template>
      </el-table-column> -->

      <!-- 域名连接状态 -->
      <!-- <el-table-column
        label="域名连接状态"
        header-align="center"
        align="center"
        prop="connect_status"
      >
        <template #default="scope">
          <span
            >{{ scope.row.connect_status || '-' }}</span
          >
        </template>
      </el-table-column> -->

      <!-- 有效期总天数 -->
      <!-- <el-table-column
        label="有效期总天数"
        header-align="center"
        align="center"
        prop="total_days"
      >
        <template #default="scope">
          <span
            >{{ scope.row.total_days || '-' }}</span
          >
        </template>
      </el-table-column> -->

      <!-- 过期剩余天数 -->
      <!-- <el-table-column
        label="过期剩余天数"
        header-align="center"
        align="center"
        prop="expire_days"
      >
        <template #default="scope">
          <span
            >{{ scope.row.expire_days || '-' }}</span
          >
        </template>
      </el-table-column> -->

      <!-- 创建时间 -->
      <!-- <el-table-column
        label="创建时间"
        header-align="center"
        align="center"
        prop="create_time"
      >
        <template #default="scope">
          <span
            >{{ scope.row.create_time || '-' }}</span
          >
        </template>
      </el-table-column> -->

      <!-- 分组 -->
      <el-table-column
        label="分组"
        header-align="center"
        align="center"
        width="100"
        prop="check_time"
      >
        <template #default="scope">
          <span>{{ scope.row.group_name || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 备注 -->
      <el-table-column
        label="备注"
        header-align="center"
        align="center"
        prop="check_time"
        show-overflow-tooltip
      >
        <template #default="scope">
          <span>{{ scope.row.alias || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <!-- <el-table-column
        :label="$t('操作')"
        header-align="center"
        align="center"
        prop="check_time"
        width="100"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            type="danger"
            :disabled="!scope.row.group_id"
            ><el-icon><Delete /></el-icon
          ></el-link>
        </template>
      </el-table-column> -->
    </el-table>

    <!-- 编辑框 -->
    <!-- <DataFormDialog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDialog> -->
  </div>
</template>

<script>
/**
 * created 2023-04-07
 */
// import DataFormDialog from '../group-domain-edit/DataFormDialog.vue'

export default {
  name: '',

  components: {
    // DataFormDialog,
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

    // 仅对 type=selection 的列有效，类型为 Function，
    // Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
    handleSelectable(row, index) {
      // console.log(row, index)
      return !Boolean(row.group_id)
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
