<template>
  <div class="active-plate-main">
    <ul class="active-list">
      <li
        v-for="(item, index) in infoList"
        class="item"
        @click="handleClick(item)"
      >
        <p
          class="num"
          :style="{ color: item.color}"
        >
          {{ item.count }}
          <!-- <CountTo :end="item.count"></CountTo> -->
        </p>
        <p class="desc">{{ item.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import CountTo from './count-to.vue'
import { COLORS } from '../../../config/index.js'

export default {
  name: 'activePlate',
  components: {
    CountTo,
  },
  props: {
    // 需要展示的数据集合
    infoList: {
      type: Array,
      require: true,
    },
  },

  data() {
    return {
      COLORS,

      colors: [
        '#409eff',
        '#409eff',
        '#409eff',
        '#f56c6c',
        '#f56c6c',
        '#f56c6c',
      ],
    }
  },

  methods: {
    handleClick(item) {
      console.log(item)
      this.$router.push({ path: item.path })
    },
  },
}
</script>

<style lang="less">
.active-plate-main {
  width: 100%;
  padding-bottom: 10px;

  ul {
    margin: 0;
  }

  .active-list {
    display: flex;
    list-style: none;
    // padding-top:15px;
    .item {
      cursor: pointer;
      position: relative;
      flex: 1;
      text-align: center;
      padding-bottom: 5px;
      // height: 80px;

      &:hover {
        // background-color: WhiteSmoke;
        opacity: 0.8;
      }
      p {
        margin: 0;
      }
      .num {
        font-size: 42px;
        font-weight: bold;
        font-family: sans-serif;
      }
      .desc {
        font-size: 16px;
      }
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        background: #e7eef0;
      }
      &:nth-last-of-type(1) {
        &::after {
          background: none;
        }
      }
    }
  }
}
</style>
