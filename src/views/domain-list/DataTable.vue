<template>
  <div>
    <el-table
      stripe
      border
      v-bind="$attrs"
      @sort-change="$emit('sort-change', $event)"
      @selection-change="$emit('selection-change', $event)"
    >
      <el-table-column
        v-if="RoleEnum.Admin != role"
        type="selection"
        header-align="center"
        align="center"
        width="40"
        :selectable="handleSelectable"
      />

      <!-- 域名 -->
      <el-table-column
        :label="$t('域名')"
        header-align="center"
        align="center"
        width="230"
        show-overflow-tooltip
        prop="domain"
      >
        <template #header>
          <el-tooltip
            effect="dark"
            content="默认端口：443"
            placement="top-start"
            :show-after="800"
          >
            <div class="inline-flex items-center">
              <span class="mr-[2px]">{{ $t('域名') }}</span>
              <el-icon><Warning /></el-icon>
            </div>
          </el-tooltip>
        </template>

        <template #default="scope">
          <el-link
            :underline="false"
            @click="handleShowDetail(scope.row)"
          >
            <span>{{ scope.row.domain }}</span>
            <span v-if="scope.row.port != '443'">:{{ scope.row.port }}</span>
          </el-link>
        </template>
      </el-table-column>

      <!-- ip -->
      <!-- <el-table-column
        label="端口"
        header-align="center"
        align="center"
        width="60"
        sortable="custom"
        prop="port"
      >
        <template #default="scope">
          <span>{{ scope.row.port || '-' }}</span>
        </template>
      </el-table-column> -->

      <!-- 域名天数 -->
      <!-- <el-table-column
        label="域名天数"
        header-align="center"
        align="center"
        width="80"
        prop="domain_expire_days"
      >
        <template #default="scope">
          <ExpireDays :value="scope.row.domain_expire_days"></ExpireDays>
        </template>
      </el-table-column> -->

      <!-- <el-tag
            v-if="!scope.row.domain_auto_update"
            class="ml-[5px] mo-table-tag"
            type="info"
            size="small"
            >手动</el-tag
          > -->

      <!-- <ExpireProgress
            :startTime="scope.row.domain_start_time"
            :endTime="scope.row.domain_expire_time"
          ></ExpireProgress> -->
      <!-- <span>{{ scope.row.real_time_domain_expire_days || '-' }}</span> -->

      <el-table-column
        :label="$t('主机数量')"
        header-align="center"
        align="center"
        width="80"
        prop="address_count"
      >
        <template #default="scope">
          <!-- 动态主机 -->
          <span
            v-if="scope.row.is_dynamic_host"
            class="color--danger"
            >*</span
          >
          <el-link
            :underline="false"
            @click="handleShowAddressListgDialog(scope.row)"
            >{{ scope.row.address_count || '-' }}</el-link
          >
        </template>
      </el-table-column>

      <!-- 域名连接状态 -->
      <el-table-column
        :label="$t('状态')"
        header-align="center"
        align="center"
        width="80"
        sortable="custom"
        prop="expire_status"
      >
        <template #default="scope">
          <ConnectStatus
            :value="scope.row.expire_status"
            @on-click="handleShowAddressListgDialog(scope.row)"
          ></ConnectStatus>
        </template>
      </el-table-column>

      <!-- 证书天数 -->
      <el-table-column
        :label="$t('证书天数')"
        header-align="center"
        align="center"
        width="110"
        sortable="custom"
        prop="expire_days"
      >
        <template #header>
          <el-tooltip
            effect="dark"
            content="如有多个主机IP地址，此处仅显示到期时间最短的证书"
            placement="top-start"
            :show-after="800"
          >
            <div class="inline-flex items-center">
              <span class="mr-[2px]">{{ $t('证书天数') }}</span>
              <el-icon><Warning /></el-icon>
            </div>
          </el-tooltip>
        </template>

        <template #default="scope">
          <!-- <ExpireDays :value="scope.row.real_time_expire_days"></ExpireDays> -->

          <ExpireProgress
            :startTime="scope.row.start_time"
            :endTime="scope.row.expire_time"
          ></ExpireProgress>

          <!-- <span>{{ scope.row.real_time_expire_days }}</span> -->
        </template>
      </el-table-column>

      <!-- 有效期总天数 -->
      <!-- <el-table-column
        label="SSL证书剩余天数"
        header-align="center"
        align="center"
        width="180"
        prop="total_days"
      >
        <template #default="scope">
          
        </template>
      </el-table-column> -->

      <!-- 创建时间 -->
      <!-- <el-table-column
        label="创建时间"
        header-align="center"
        align="center"
        width="110"
        prop="create_time"
      >
        <template #default="scope">
          <span>{{ scope.row.create_time_label || '-' }}</span>
        </template>
      </el-table-column> -->

      <!-- 分组 -->
      <el-table-column
        :label="$t('分组')"
        header-align="center"
        align="center"
        width="100"
        sortable="custom"
        prop="group_name"
      >
        <template #default="scope">
          <span>{{ scope.row.group_name || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 备注 -->
      <el-table-column
        :label="$t('备注')"
        header-align="center"
        align="left"
        prop="check_time"
        min-width="100"
        show-overflow-tooltip
      >
        <template #default="scope">
          <span>{{ scope.row.alias || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 更新时间 -->
      <el-table-column
        :label="$t('更新时间')"
        header-align="center"
        align="center"
        width="120"
        prop="update_time"
        sortable="custom"
        show-overflow-tooltip
      >
        <template #default="scope">
          <span>{{ scope.row.update_time_label || '-' }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        label="更新"
        width="60"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          
        </template>
      </el-table-column> -->

      <!-- <el-table-column
        label="详细"
        header-align="center"
        align="center"
        width="60"
        prop="connect_status"
      >
        <template #default="scope">
         
        </template>
      </el-table-column> -->

      <template v-if="RoleEnum.Admin != role">
        <!-- 自动更新 -->
        <el-table-column
          :label="$t('自动更新')"
          width="120"
          header-align="center"
          align="center"
          sortable="custom"
          prop="auto_update"
        >
          <template #default="scope">
            <el-switch
              :disabled="!scope.row.has_edit_permission"
              v-model="scope.row.auto_update"
              @change="handleAutoUpdateStatusChange(scope.row, $event)"
            />
          </template>
        </el-table-column>

        <!-- 监测 -->
        <el-table-column
          :label="$t('到期提醒')"
          width="90"
          header-align="center"
          align="center"
          sortable="custom"
          prop="is_monitor"
        >
          <template #default="scope">
            <el-switch
              :disabled="!scope.row.has_edit_permission"
              v-model="scope.row.is_monitor"
              @change="handleMonitorStatusChange(scope.row, $event)"
            />
          </template>
        </el-table-column>
      </template>

      <el-table-column
        :label="$t('操作')"
        width="100"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <!-- 更新 -->
          <el-link
            :underline="false"
            type="primary"
            class="mr-sm"
            @click="handleUpdateRowDomainInfo(scope.row)"
            ><el-icon><Refresh /></el-icon
          ></el-link>

          <!-- 用户可操作 -->
          <template v-if="RoleEnum.Admin != role">
            <el-link
              :underline="false"
              type="primary"
              class="mr-sm"
              :disabled="!scope.row.has_edit_permission"
              @click="handleEditRow(scope.row)"
              ><el-icon><Edit /></el-icon
            ></el-link>

            <el-popconfirm
              :title="`${$t('确定删除')}？`"
              @confirm="handleDeleteClick(scope.row)"
              :disabled="!scope.row.has_edit_permission"
            >
              <template #reference>
                <el-link
                  :underline="false"
                  type="danger"
                  :disabled="!scope.row.has_edit_permission"
                  ><el-icon><Delete /></el-icon
                ></el-link>
              </template>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑框 -->
    <DataFormDialog
      v-model:visible="dialogVisible"
      :row="currentRow"
      @on-success="handleRefreshRow(currentRow)"
    ></DataFormDialog>

    <!-- 详情 -->
    <DataDetailDialog
      :row="currentRow"
      v-model:visible="dialogDetailVisible"
      @on-success="handleRefreshRow(currentRow)"
    ></DataDetailDialog>

    <!-- 域名主机列表 -->
    <AddressListgDialog
      v-if="currentRow"
      :role="role"
      :domainId="currentRow.id"
      :domainRow="currentRow"
      v-model:visible="AddressListgDialogVisible"
      @on-close="handleRefreshRow(currentRow)"
    ></AddressListgDialog>
  </div>
</template>

<script>
/**
 * created 2022-10-01
 */
import DataFormDialog from '../domain-edit/DataFormDialog.vue'
import DataDetailDialog from '../domain-detail/DataFormDailig.vue'
import ConnectStatus from '@/components/ConnectStatus.vue'
import ExpireDays from '@/components/ExpireDays.vue'
import ExpireProgress from '@/components/ExpireProgress.vue'

import AddressListgDialog from '@/components/address-list/DataTableDialog.vue'
import { RoleEnum } from '@/emuns/role-enums.js'

export default {
  name: '',

  components: {
    DataFormDialog,
    DataDetailDialog,
    ConnectStatus,
    ExpireDays,
    ExpireProgress,

    AddressListgDialog,
  },

  emits: ['on-success', 'selection-change', 'sort-change', 'on-refresh-row'],

  props: {
    role: {
      type: Number,
    },
  },

  computed: {},

  data() {
    return {
      RoleEnum,
      currentRow: null,
      dialogVisible: false,
      dialogDetailVisible: false,

      AddressListgDialogVisible: false,
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

      const res = await this.$http.deleteDomainById(params)

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

    async handleMonitorStatusChange(row, value) {
      // console.log(row, value)

      let params = {
        domain_id: row.id,
        is_monitor: value,
      }

      const res = await this.$http.updateDomainExpireMonitorById(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        // this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },

    async handleUpdateRowDomainInfo(row) {
      let loading = this.$loading({
        lock: true,
        text: '更新中',
      })

      let params = {
        id: row.id,
      }

      const res = await this.$http.updateDomainRowInfoById(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        this.$emit('on-success')
      }

      loading.close()
    },

    handleUpdateSuccess() {
      this.$emit('on-success')
    },

    handleDetailSuccess() {
      // this.$emit('on-success')
    },

    handleShowDetail(row) {
      this.currentRow = row
      this.dialogDetailVisible = true
    },

    handleShowAddressListgDialog(row) {
      this.currentRow = row
      this.AddressListgDialogVisible = true
    },

    async handleAutoUpdateStatusChange(row, value) {
      // console.log(row, value)

      let params = {
        domain_id: row.id,
        field: 'auto_update',
        value: value,
      }

      const res = await this.$http.updateDomainFieldById(params)

      if (res.code == 0) {
        this.$msg.success('操作成功')
        // this.$emit('on-success')
      } else {
        this.$msg.error(res.msg)
      }
    },

    handleRefreshRow(row) {
      this.$emit('on-refresh-row', row)
    },

    handleSelectable(row, index) {
      return row.has_edit_permission
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
