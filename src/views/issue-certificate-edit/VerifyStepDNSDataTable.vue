<template>
  <div>
    <el-table
      :data="list"
      stripe
      border
    >
      <!-- 域名 -->
      <el-table-column
        :label="$t('域名')"
        header-align="center"
        align="center"
        prop="domain"
        width="230"
      >
        <template #default="scope">
          <span>{{ scope.row.domain  }}</span>
        </template>
      </el-table-column>

      <!-- 验证状态 -->
      <el-table-column
        :label="$t('验证状态')"
        header-align="center"
        align="center"
        prop="status"
        width="100"
      >
        <template #default="scope">
          <ConnectStatus :value="scope.row.status_value"></ConnectStatus>

          <span style="margin-left: 4px">{{ scope.row.status || '-' }}</span>

          <!-- <el-link
            :underline="false"
            type="primary"
            class="mr-sm"
            @click="handleEditRow(scope.row)"
            :disabled="!domainRow.has_edit_permission"
            ><el-icon><Edit /></el-icon
          ></el-link> -->
        </template>
      </el-table-column>

      <!-- token -->
      <el-table-column
        :label="$t('TXT记录')"
        header-align="center"
        align="center"
        prop="token"
      >
        <template #default="scope">
          <div @click="handleCopyClick(scope.row.token)">
            <span> {{ scope.row.verify_key || '-' }}  </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('记录值')"
        header-align="center"
        align="center"
        prop="token"
      >
        <template #default="scope">
          <div @click="handleCopyClick(scope.row.validation)">
            {{ scope.row.validation || '-' }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/**
 * created 2023-07-27
 */

import ConnectStatus from '@/components/ConnectStatus.vue'
import FileSaver from 'file-saver'
import copy from 'copy-to-clipboard'

export default {
  name: '',

  components: {
    ConnectStatus,
  },

  props: {
    list: {
      type: Array,
    },
  },

  emits: ['on-success'],

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

    downloadVerifyFile(row) {
      // 关于vue下载无后缀名的文件被加上后缀.txt，有后缀名的文件下载正常问题的解决
      // https://blog.csdn.net/yanziit/article/details/127990100
      let blob = new Blob([row.validation], {
        type: 'application/octet-stream;charset=utf-8',
      })
      FileSaver.saveAs(blob, row.token)
    },

    handleCopyClick(value) {
      copy(value)
      this.$msg.success('已复制到剪切板')
    },

    async handleVerifyDomainById(row) {
      let loading = this.$loading({ fullscreen: true })

      let params = {
        // 域名列表
        domain_verify_id: row.id,
      }

      const res = await this.$http.verifyCertificateById(params)

      if (res.code == 0) {
        this.$msg.success('验证成功')
        this.$emit('on-success', res.data)
      } else {
        this.$msg.error(res.msg)
      }

      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loading.close()
      })
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
