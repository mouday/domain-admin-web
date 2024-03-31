<template>
  <!-- 编辑框 -->
  <el-dialog
    :title="dialogTitle"
    v-model="dialogVisible"
    width="1200px"
    center
    append-to-body
    @close="handleClose"
  >
    <DataTableIndex
      v-if="dialogVisible"
      :certId="certId"
      :row="row"
      @on-cancel="handleCancel"
      @on-success="handleSuccess"
    ></DataTableIndex>
  </el-dialog>
</template>

<script>
/**
 * created 2022-10-11
 */
import DataTableIndex from './index.vue'

export default {
  name: '',

  props: {
    certId: { type: Number, default: null },

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
      this.$emit('on-close')
    },

    handleCancel() {
      this.dialogVisible = false
    },
    handleOpen() {
      this.dialogVisible = true
    },

    handleSuccess() {
      this.handleClose()
      this.$emit('on-success')
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
