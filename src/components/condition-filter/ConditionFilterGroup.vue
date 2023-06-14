<template>
  <div class="ConditionFilterGroup">
    <template v-for="item in options">
      <ConditionFilterRow
        v-if="!item.hidden"
        class="ConditionFilterGroup__row"
        v-bind="item"
        @on-change="handleChange"
      ></ConditionFilterRow>
    </template>
  </div>
</template>

<script>
// created at 2023-04-29
import ConditionFilterRow from './ConditionFilterRow.vue'

export default {
  name: 'ConditionFilterGroup',

  props: {
    // 选项
    options: {
      type: Array,
    },
  },

  components: {
    ConditionFilterRow,
  },

  data() {
    return {}
  },

  computed: {},

  methods: {
    async getData() {},

    handleChange(data) {
      console.log(data)
      this.$emit('on-change', data)
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less">
.ConditionFilterGroup{
  // display: grid;
  // grid-template-columns: repeat(2, 1fr);
  // row-gap: 10px;
}

.ConditionFilterGroup__row + .ConditionFilterGroup__row {
  margin-top: 10px;
}
</style>
