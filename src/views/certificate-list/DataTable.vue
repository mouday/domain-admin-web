<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
    >
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

      <!-- 证书天数 -->
      <el-table-column
        :label="$t('证书天数')"
        header-align="center"
        align="center"
        width="110"
        sortable="custom"
        prop="expire_days"
      >
        <template #default="scope">
          <ExpireProgress
            :startTime="scope.row.start_time"
            :endTime="scope.row.expire_time"
          ></ExpireProgress>
        </template>
      </el-table-column>

      <!-- 签发时间 -->
      <el-table-column
        label="签发时间"
        header-align="center"
        align="center"
        prop="start_time"
        width="120"
      >
        <template #default="scope">
          <span>{{ scope.row.start_date || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 过期时间 -->
      <el-table-column
        label="过期时间"
        header-align="center"
        align="center"
        prop="expire_time"
        width="120"
      >
        <template #default="scope">
          <span>{{ scope.row.expire_date || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 备注 -->
      <el-table-column
        label="备注"
        header-align="center"
        align="center"
        prop="comment"
      >
        <template #default="scope">
          <span>{{ scope.row.comment || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 创建时间 -->
      <el-table-column
        label="创建时间"
        header-align="center"
        align="center"
        prop="create_time"
        width="120"
      >
        <template #default="scope">
          <span>{{ scope.row.create_time_label || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 部署 -->
      <el-table-column
        label="部署"
        header-align="center"
        align="center"
        prop="create_time"
        width="60"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            type="primary"
            @click="handleDeployCountClick(scope.row)"
          >
            <!-- 有失败 -->
            <span
              v-if="scope.row.deploy_error_count > 0"
              class="color--danger"
            >
              {{ scope.row.deploy_success_count }}/{{
                scope.row.deploy_count
              }}</span
            >
            <!-- 有异常 -->
            <span
              v-else-if="scope.row.deploy_pending_count > 0"
              class="color--warning"
            >
              {{ scope.row.deploy_success_count }}/{{
                scope.row.deploy_count
              }}</span
            >
            <!-- 都成功 -->
            <span
              v-else-if="scope.row.deploy_count > 0"
              class="color--success"
            >
              {{ scope.row.deploy_count }}</span
            >
            <!-- 没有部署 -->
            <span
              v-else
              class="color--info"
            >
              {{ scope.row.deploy_count }}</span
            >
          </el-link>
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

      <!-- 证书 -->
      <el-table-column
        label="证书"
        header-align="center"
        align="center"
        prop="ssl_certificate"
        width="60"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            type="primary"
            @click="downloadSSLFile(scope.row)"
            ><el-icon><Download /></el-icon
          ></el-link>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="80"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            type="primary"
            class="mr-sm"
            @click="handleEditRow(scope.row)"
            ><el-icon><Edit /></el-icon
          ></el-link>

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

    <!-- 证书部署列表 -->
    <DeployCertListDialog
      v-model:visible="deployCertListDialogVisible"
      :certId="currentRow?.certificate_id"
      @on-success="handleUpdateSuccess"
      @on-close="handleDialogClose"
    >
    </DeployCertListDialog>
  </div>
</template>

<script>
/**
 * created 2024-02-25
 */
import DataFormDialog from '@/components/certificate-edit/DataFormDialog.vue'
import FileSaver from 'file-saver'
import JSZip from 'jszip'
import ConnectStatus from '@/components/ConnectStatus.vue'
import ExpireProgress from '@/components/ExpireProgress.vue'
import DeployCertListDialog from '@/components/deploy-cert-list/DataTableDialog.vue'

export default {
  name: '',

  components: {
    DataFormDialog,
    ConnectStatus,
    ExpireProgress,
    DeployCertListDialog,
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
      deployCertListDialogVisible: false,
    }
  },

  methods: {
    handleEditRow(row) {
      this.currentRow = row
      this.dialogVisible = true
    },

    async handleDeleteClick(row) {
      let params = {
        certificate_id: row.certificate_id,
      }

      const res = await this.$http.deleteCertificateById(params)

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

    async downloadSSLFile(row) {
      let name = row.domain

      const zip = new JSZip()

      zip.file(`${name}.pem`, row.ssl_certificate)
      zip.file(`${name}.key`, row.ssl_certificate_key)

      zip.generateAsync({ type: 'blob' }).then(function (content) {
        // see FileSaver.js
        FileSaver.saveAs(content, `${name}.zip`)
      })
    },

    handleDeployCountClick(row) {
      this.currentRow = row
      this.deployCertListDialogVisible = true
    },

    handleDialogClose() {
      this.$emit('on-row-update', this.currentRow)
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
