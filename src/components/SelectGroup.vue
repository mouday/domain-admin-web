<template>
  <el-select
    v-bind="$attrs"
    v-on="$events"
    placeholder="分组"
  >
    <el-option
      v-for="item in groupOptions"
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

  props: {},

  components: {},

  data() {
    return {}
  },

  computed: {
    ...mapState(useGroupStore, {
      groupOptions: 'getGroupOptions',
    }),
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
