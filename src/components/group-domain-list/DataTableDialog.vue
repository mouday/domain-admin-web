<template>
  <!-- 编辑框 -->
  <el-dialog
    :title="dialogTitle"
    v-model="dialogVisible"
    width="800px"
    center
    append-to-body
  >
    <DataTableIndex
      v-if="dialogVisible"
      :row="row"
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

export default {
  name: '',

  props: {
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
        return `分组关联域名：${this.row.name}`
      } else {
        return '-'
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
  },

  created() {
    console.log('created')
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
