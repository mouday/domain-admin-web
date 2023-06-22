<template>
  <codemirror
    v-model="value_"
    :placeholder="placeholder"
    :style="editorStyle"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
  />
</template>

<script>
// created at 2023-06-22
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { twig } from '@ssddanbrown/codemirror-lang-twig'

export default {
  name: 'CodeEditor',

  props: {
    // v-model
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '200px',
    },
    mode: {
      type: String,
      default: 'json',
    },
  },

  components: {
    Codemirror,
  },

  data() {
    return {}
  },

  computed: {
    value_: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
      },
    },

    editorStyle() {
      return { width: '100%', height: this.height, 'font-size': '16px' }
    },
    // 配置
    extensions() {
      if (this.mode == 'twig') {
        return [twig(), oneDark]
      } else {
        return [json(), oneDark]
      }
    },
  },

  methods: {
    async getData() {},
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
