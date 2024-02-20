<template>
  <!-- 编辑框 -->
  <el-dialog
    title="域名主机列表"
    v-model="dialogVisible"
    width="960px"
    center
    append-to-body
    @close="handleDialogClose"
  >
    <DataTableIndex
      v-if="dialogVisible"
      :row="row"
      :role="role"
      :domainRow="domainRow"
      :domainId="domainId"
      @on-cancel="handleClose"
      @on-success="handleSuccess"
    ></DataTableIndex>
  </el-dialog>
</template>

<script>
/**
 * created 2022-10-11
 */
import DataTableIndex from './index.vue'
import { RoleEnum } from '@/emuns/role-enums.js'

export default {
  name: '',

  props: {
    domainRow: {
      type: Object,
      default: null,
    },

    // 数据行
    row: {
      type: Object,
      default: null,
    },

    // 显示
    visible: {
      type: Boolean,
      default: false,
    },
    domainId: {
      type: Number,
      default: null,
    },
    role: {
      type: Number,
    },
  },

  components: {
    DataTableIndex,
  },

  data() {
    return {
      // currentRow: null,
      // dialogVisible: false,
    }
  },

  computed: {
    dialogTitle() {
      if (this.row) {
        return '编辑'
      } else {
        return '添加'
      }
    },

    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
    },
  },

  methods: {
    handleClose() {
      this.dialogVisible = false
    },

    handleOpen() {
      this.dialogVisible = true
    },

    handleSuccess() {
      this.handleClose()
      this.$emit('on-success')
    },

    handleDialogClose() {
      this.$emit('on-close')
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
