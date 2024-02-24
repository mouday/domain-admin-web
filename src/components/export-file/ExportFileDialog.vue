<template>
  <!-- 编辑框 -->
  <el-dialog
    title="数据导出"
    v-model="dialogVisible"
    width="400px"
    center
    append-to-body
  >
    <ExportFile
      v-if="dialogVisible"
      :row="row"
      :allowExts="allowExts"
      @on-cancel="handleClose"
      @on-confirm="handleSuccess"
    ></ExportFile>
  </el-dialog>
</template>

<script>
/**
 * created 2023-07-01
 */
import ExportFile from './ExportFile.vue'

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

    allowExts: {
      type: Array,
      default: () => ['csv', 'xlsx', 'txt'],
    },
  },

  emits: ['update:visible'],

  components: {
    ExportFile,
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
      this.$emit('update:visible', false)
    },

    handleOpen() {
      this.$emit('update:visible', true)
    },

    handleSuccess(data) {
      this.handleClose()
      this.$emit('on-confirm', data)
    },
  },

  created() {},
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
