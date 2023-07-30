<template>
  <div class="code-highlight">
    <pre><code v-html="highlightValue"></code></pre>
  </div>
</template>

<script>
// created at 2023-07-29
import hljs from 'highlight.js'

export default {
  name: 'CodeHighlight',

  props: {
    value: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'nginx',
    },
  },

  components: {},

  data() {
    return {}
  },

  computed: {
    highlightValue() {
      return hljs.highlight(this.value, { language: this.language }).value
    },
  },

  methods: {
    async getData() {},
  },

  mounted() {
    hljs.highlightAll()
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less">
.code-highlight {
  padding: 10px 0;
  overflow-x: auto;
  width: 100%;
}
</style>
