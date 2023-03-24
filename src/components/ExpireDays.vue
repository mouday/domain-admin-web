<template>
  <div class="ExpireDays">
    <span
      v-if="showValue"
      :class="className"
      >{{ value }}</span
    >
    <span v-else>-</span>
  </div>
</template>

<script>
// created at 2023-03-24
export default {
  name: 'ExpiredDays',

  props: {
    value: {
      type: Number,
      default: null,
    },
  },

  components: {},

  data() {
    return {}
  },

  computed: {
    showValue() {
      return Number.isInteger(this.value)
    },
    
    className() {
      if (this.showValue) {
        if (this.value < 3) {
          return ['color--danger']
        } else if (this.value < 30) {
          return ['color--warning']
        } else {
          return ['color--success']
        }
      } else {
        return []
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

<style lang="less">
.ExpireDays {
  // font-weight: bold;
}
</style>
