<template>
  <!-- 编辑框 -->
  <el-dialog
    title="域名详情"
    v-model="dialogVisible"
    width="900px"
    center
    append-to-body
    @close="handleDialogClose"
  >
    <DataForm
      v-if="dialogVisible"
      :row="row"
      @on-cancel="handleClose"
      @on-success="handleSuccess"
    ></DataForm>
  </el-dialog>
</template>

<script>
/**
 * created 2022-10-01
 */
import DataForm from './DataForm.vue'

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

  emits: ['update:visible'],

  components: {
    DataForm,
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
      // this.$emit('update:visible', false)
    },

    handleOpen() {
      this.dialogVisible = true
      // this.$emit('update:visible', true)
    },

    handleSuccess() {
      this.handleClose()
      // this.$emit('on-success')
    },

    handleDialogClose() {
      this.$emit('on-success')
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
