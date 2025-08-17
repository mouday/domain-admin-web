<template>
  <!-- 编辑框 -->
  <el-dialog
    title="参数详情"
    v-model="dialogVisible"
    width="800px"
    center
    append-to-body
    :lock-scroll="false"
    @close="handleDialogClose"
  >
    <div style="max-height: 600px; overflow-y: auto">
      <pre><code class="language-json" v-html="row.params"></code></pre>
    </div>
  </el-dialog>
</template>

<script>
/**
 * created 2022-10-01
 */

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

  components: {},

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
