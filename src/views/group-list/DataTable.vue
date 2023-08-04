<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
      @selection-change="$emit('selection-change', $event)"
    >
      <el-table-column
        v-if="role == RoleEnum.User"
        type="selection"
        header-align="center"
        align="center"
        width="40"
        :selectable="handleSelectable"
      />

      <el-table-column
        label="ID"
        align="center"
        prop="id"
        width="60"
      >
        <template #default="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <!-- 名称 -->
      <el-table-column
        :label="$t('名称')"
        header-align="center"
        align="center"
        prop="name"
      >
        <template #default="scope">
          <span>{{ scope.row.name || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 证书数量 -->
      <el-table-column
        :label="$t('证书数量')"
        header-align="center"
        align="center"
        prop="name"
        width="100"
      >
        <template #default="scope">
          <span>{{ scope.row.cert_count || '0' }}</span>
        </template>
      </el-table-column>

      <!-- 域名数量 -->
      <el-table-column
        :label="$t('域名数量')"
        header-align="center"
        align="center"
        prop="name"
        width="120"
      >
        <template #default="scope">
          <span>{{ scope.row.domain_count || '0' }}</span>
        </template>
      </el-table-column>

      <!-- 成员数量 -->
      <el-table-column
        :label="$t('成员数量')"
        header-align="center"
        align="center"
        prop="name"
        width="100"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            type="primary"
            @click="handleEditRowGroupUser(scope.row)"
            >{{ scope.row.group_user_count || '0' }}</el-link
          >
        </template>
      </el-table-column>

      <!-- 创建时间 -->
      <!-- <el-table-column
        label="创建时间"
        header-align="center"
        align="center"
        prop="create_time"
      >
        <template #default="scope">
          <span>{{ scope.row.create_time || '-' }}</span>
        </template>
      </el-table-column> -->

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

      <template v-if="role == RoleEnum.User">
        <!-- 关联证书 -->
        <el-table-column
          :label="$t('关联证书')"
          width="130"
          header-align="center"
          align="center"
        >
          <template #default="scope">
            <el-link
              :underline="false"
              type="primary"
              :disabled="!scope.row.is_leader"
              @click="handleCountClick(scope.row)"
              ><el-icon><Link /></el-icon
            ></el-link>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('编辑')"
          width="60"
          header-align="center"
          align="center"
        >
          <template #default="scope">
            <el-link
              :underline="false"
              type="primary"
              :disabled="!scope.row.is_leader"
              @click="handleEditRow(scope.row)"
              ><el-icon><Edit /></el-icon
            ></el-link>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('删除')"
          width="60"
          align="center"
          prop="tag"
        >
          <template #default="scope">
            <el-popconfirm
            :title="`${$t('确定删除')}？`"
              @confirm="handleDeleteClick(scope.row)"
              :disabled="!scope.row.is_leader"
            >
              <template #reference>
                <el-link
                  :underline="false"
                  type="danger"
                  :disabled="!scope.row.is_leader"
                  ><el-icon><Delete /></el-icon
                ></el-link>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 编辑框 -->
    <DataFormDialog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleUpdateSuccess"
    ></DataFormDialog>

    <!-- 分组 + 域名 关联-->
    <GroupDomainListDialog
      :row="currentRow"
      v-model:visible="groupDomainListDialogVisible"
      @on-success="handleUpdateSuccess"
    ></GroupDomainListDialog>

    <!-- 组员 -->
    <GroupUserListDialog
      :groupRow="currentRow"
      :role="role"
      v-model:visible="GroupUserListDialogVisible"
      @on-success="handleUpdateSuccess"
      @on-close="$emit('on-success')"
    ></GroupUserListDialog>
  </div>
</template>

<script>
/**
 * created 2023-04-04
 */
import DataFormDialog from '../group-edit/DataFormDialog.vue'

import GroupDomainListDialog from '@/components/group-domain-list/DataTableDialog.vue'
import GroupUserListDialog from '@/components/group-user-list/DataTableDialog.vue'
import { RoleEnum } from '@/emuns/role-enums.js'

export default {
  name: '',

  components: {
    DataFormDialog,
    GroupDomainListDialog,
    GroupUserListDialog,
  },

  props: {
    list: {
      type: Array,
    },

    role: {
      type: Number,
      default: RoleEnum.User,
    },
  },

  emits: ['selection-change'],

  computed: {},

  data() {
    return {
      RoleEnum,
      currentRow: null,
      dialogVisible: false,
      groupDomainListDialogVisible: false,
      GroupUserListDialogVisible: false,
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

      const res = await this.$http.deleteGroupById(params)

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

    handleCountClick(row) {
      console.log('handleCountClick')
      // this.$emit('on-count-click', row)
      this.currentRow = row
      this.groupDomainListDialogVisible = true
    },

    handleEditRowGroupUser(row) {
      this.currentRow = row
      this.GroupUserListDialogVisible = true
    },

    handleSelectable(row, index) {
      return row.is_leader
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
