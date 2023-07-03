<template>
  <el-tooltip
    effect="dark"
    :disabled="disabled"
    :content="content"
    placement="top-start"
  >
    <div
      ref="ShowOverflowTooltip"
      class="overflow-tooltip"
    >
      {{ content }}
    </div>
  </el-tooltip>
</template>

<script>
export default {
  name: 'ShowOverflowTooltip',

  props: {
    content: {
      type: String,
    },
  },

  data() {
    return {
      id: Math.random().toString(36).slice(2),
      disabled: true,
    }
  },

  watch: {
    content() {
      this.handleInit()
    },
  },

  methods: {
    handleInit() {
      function getStyle(element, property = null) {
        const css = window.getComputedStyle(element, null)
        return property ? css[property] : css
      }

      const target = this.$refs.ShowOverflowTooltip

      //   const target = document.getElementById(this.id)
      console.log(target)

      const range = document.createRange()
      range.setStart(target, 0)
      range.setEnd(target, target.childNodes.length)

      // console.log(range)

      const rangeWidth = range.getBoundingClientRect().width

      const padding =
        (parseInt(getStyle(target, 'paddingLeft'), 10) || 0) +
        (parseInt(getStyle(target, 'paddingRight'), 10) || 0)

      let data = {
        rangeWidth,
        padding,
        'rangeWidth+padding': rangeWidth + padding,
        offsetWidth: target.offsetWidth,
        scrollWidth: target.scrollWidth,
      }

      console.table(data)

      if (
        rangeWidth + padding > target.offsetWidth ||
        target.scrollWidth > target.offsetWidth
      ) {
        console.log('有隐藏文字...')

        if (this.content && this.content.length > 5) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      } else {
        console.log('没有隐藏文字')
        this.disabled = true
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.handleInit()
    })
  },
}
</script>

<style scoped>
.overflow-tooltip-outer {
  width: 100%;
}

.overflow-tooltip {
  display: inline-block;
  /* width: 100%; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* line-height: 1; */
  /* vertical-align: middle; */
}
</style>
