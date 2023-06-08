<template>
  <el-select
    v-bind="$attrs"
    v-on="$events"
    placeholder="分组"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
// created at 2023-04-04
import { useGroupStore } from '@/store/group-store.js'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'SelectGroup',

  props: {
    // 显示未分组
    showNotGroup: {
      type: Boolean,
      default: false,
    },
  },

  components: {},

  data() {
    return {}
  },

  computed: {
    ...mapState(useGroupStore, {
      groupOptions: 'getGroupOptions',
    }),

    options() {
      if (this.showNotGroup) {
        return [
          ...this.groupOptions,
          {
            value: 0,
            label: '未分组',
          },
        ]
      } else {
        return this.groupOptions
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
