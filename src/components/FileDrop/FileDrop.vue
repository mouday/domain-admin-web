<template>
  <div
    class="FileDrop"
    :class="{ 'FileDrop--active': isOver }"
    ref="FileDrop"
  >
    <slot></slot>
  </div>
</template>

<script>
// created at 2024-02-25
// https://www.jb51.net/article/135119.htm
// https://blog.csdn.net/weixin_43630831/article/details/126142658
import { getUUID } from '@/utils/uuid.js'

export default {
  name: 'FileDrop',

  props: {},

  components: {},

  data() {
    return {
      uuid: getUUID(),
      isOver: false,
    }
  },

  computed: {},

  methods: {
    // 拖拽文件
    dropEvent(e) {
      e.stopPropagation()
      e.preventDefault()

      this.isOver = false
      this.handleDragLeave()
      this.uploadFile(e.dataTransfer.files)
    },

    uploadFile(files) {
      this.$emit('on-files', files)

      if (this.fileUpload) {
        this.fileUpload(files)
      }
    },

    handleDragEnter() {
      this.$emit('on-dragenter')
    },

    handleDragLeave() {
      this.$emit('on-dragleave')
    },
  },

  beforeUnmount() {
    let dropArea = this.$refs.FileDrop
    dropArea.removeEventListener('drop', this.dropEvent, false)
  },

  mounted() {
    let dropArea = this.$refs.FileDrop
    dropArea.addEventListener('drop', this.dropEvent, false)

    dropArea.addEventListener('dragleave', (e) => {
      e.stopPropagation()
      e.preventDefault()
      this.isOver = false
      this.handleDragLeave()
    })

    dropArea.addEventListener('dragenter', (e) => {
      e.stopPropagation()
      e.preventDefault()
      this.isOver = true
      this.handleDragEnter()
    })

    dropArea.addEventListener('dragover', (e) => {
      e.stopPropagation()
      e.preventDefault()
    })
  },

  created() {},
}
</script>

<style lang="less">
.FileDrop {
  width: 100%;
}

// .FileDrop--active {
//   outline: 0;
//   position: relative;
//   border: 1px solid #0084ff;
//   box-shadow: 0 0 0 1px #006eff inset;
// }

// .FileDrop--active::after {
//   position: absolute;
//   content: '上传文件';
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: #fff;
//   background-color: rgba(0, 0, 0, 0.5);
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   box-sizing: border-box;

// }

.FileDrop--active {
  .el-textarea__inner {
    outline: 0;
    box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
  }
}
</style>
