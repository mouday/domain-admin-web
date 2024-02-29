<template>
  <div class="card-main">
    <div class="card-main__header">
      <div class="card-main__title">{{ $t(title) }}</div>
      <div class="card-main__desc">{{ $t(desc) }}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题',
    },
    desc: {
      type: String,
      default: '描述',
    },
  },
}
</script>

<style lang="less">
.card-main {
  border-radius: 8px;
  background: #fff;
  // margin-bottom: 20px;
  // padding-bottom: 10px;
  border: 1px solid #f5f7f9;
}

.card-main__header {
  color: #060606;
  font-size: 16px;
  padding: 15px 32px;
  display: flex;
  align-items: center;
}

.card-main__title {
}

.card-main__desc {
  padding-left: 17px;
  font-size: 12px;
  color: #dededf;
  // align-self: flex-end;
}
</style>
