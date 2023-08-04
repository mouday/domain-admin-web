<template>
  <div class="data-count">{{ $t('共计') }} {{ value }} {{ $t('条数据') }}</div>
</template>

<script>
// created at 2023-08-04
export default {
  name: 'DataCount',

  props: {
    value: {
      type: Number,
      default: 0,
    },
  },

  components: {},

  data() {
    return {}
  },

  computed: {},

  methods: {
    async getData() {},
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less">
.data-count {
  font-size: 14px;
  color: #333333;
  line-height: 24px;
}
</style>

<style lang="less" scoped></style>
