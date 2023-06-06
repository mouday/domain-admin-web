<template>
  <!-- 筛选器主体 -->
  <div class="condition-filter">
    <!-- 标题 -->
    <div
      class="condition-filter__title"
      v-if="title"
    >
      {{ title }}
    </div>

    <div class="condition-filter__group_button">
      <!-- 清空 -->
      <div
        class="condition-filter__tag condition-filter__clear"
        :class="{ 'condition-filter__tag--seleted': selectedIsEmpty }"
        @click="handleClear"
      >
        不限
      </div>

      <!-- 筛选项 -->
      <div class="condition-filter__list-wrap">
        <!-- 筛选项列表 -->
        <div class="condition-item__list-box">
          <div :class="{ 'condition-item__list--overflow': hiddenMore }">
            <div
              class="condition-item__list"
              ref="condition-item__list"
            >
              <template v-for="item in options">
                <div
                  class="condition-filter__tag"
                  :class="{
                    'condition-filter__tag--seleted':
                      selected.indexOf(item[valueKey]) > -1,
                  }"
                  @click="handleClick(item)"
                >
                  <span>{{ item[labelKey] }}</span>
                  <span class="condition-filter__tag__close">
                    <el-icon><Close /></el-icon>
                  </span>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- 子级 -->
        <div class="condition-filter__children">
          <template v-for="item in options">
            <template v-if="selected.indexOf(item[valueKey]) > -1 && item.child">
              <ConditionFilter
                :key="childrenKey"
                class="condition-filter__child"
                ref="child"
                v-bind="item.child"
                :level="item.level || level + 1"
                @on-change="handleChildrenChange"
              ></ConditionFilter>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// created at 2022-01-19
export default {
  name: 'ConditionFilter',

  props: {
    // 标题，不填写就不显示
    title: {
      type: String,
    },

    // 用于多级传递数据
    field: {
      type: String,
    },

    // 选项 { label, value }
    options: {
      type: Array,
    },

    // 默认选中的值
    selected: {
      type: Array,
      default: () => [],
    },

    // 最大选中个数，默认没有限制
    // 特殊值：1/单选：会将其他选中取消，只选中最后点击的选项
    maxCount: {
      type: Number,
      default: 0,
    },

    // list中选项显示内容的key
    labelKey: {
      type: String,
      default: 'label',
    },
    // list中选项值的key
    valueKey: {
      type: String,
      default: 'value',
    },

    // 筛选器层级 默认从 0 开始 继承父级配置
    level: {
      type: Number,
      default: 0,
    },
  },

  components: {},

  data() {
    return {
      // 选中的值
      //   selected: [],
      childrenKey: 0,

      showMoreButton: false, // 更多
      hiddenMore: true,
      itemTagHeight: 20, // 标签整体高度（包括margin）
    }
  },

  computed: {
    selectedIsEmpty() {
      return this.selected.length == 0
    },
  },

  methods: {
    async getData() {},

    handleClear() {
      this.selected.splice(0, this.selected.length)
      this.handleChange()
    },

    handleClick(item) {
      //   console.log(item);

      let index = this.selected.findIndex((value) => {
        return item[this.valueKey] == value
      })

      if (index > -1) {
        this.selected.splice(index, 1)
      } else {
        // 单选
        if (this.maxCount == 1) {
          this.selected.splice(0, this.selected.length)
        }

        this.selected.push(item[this.valueKey])
      }
      this.childrenKey++
      this.handleChange()
    },

    handleChange() {
      this.$emit('on-change', {
        selected: this.selected,
        title: this.title,
        field: this.field,
        options: this.options,
      })
    },

    handleChildrenChange(data) {
      this.$emit('on-change', data)
    },

    handleMoreClick() {
      this.hiddenMore = !this.hiddenMore
    },

    handleWindowResize() {
      // console.log('handleWindowResize');

      // 如果元素高度比父元素高，就显示【更多】
      if (!this.$refs['condition-item__list']) {
        return
      }

      // console.log(this.$refs['condition-item__list'].clientHeight);

      if (
        this.$refs['condition-item__list'].clientHeight > this.itemTagHeight
      ) {
        this.showMoreButton = true

        // 如果有选中的值，就显示展开
        if (this.selected && this.selected.length > 0) {
          this.hiddenMore = false
        } else {
          this.hiddenMore = true
        }
      } else {
        this.hiddenMore = false
        this.showMoreButton = false
      }
    },
  },

  mounted() {},

  created() {
    // if (this.defaultSelected) {
    //   this.selected = [...this.defaultSelected];
    // }
    this.getData()
  },
}
</script>

<style lang="less">
@base-color: var(--el-color-primary, #409eff);

// 筛选器
.condition-filter {
  display: flex;
  //   align-items: center;
  //   flex-wrap: wrap;
  font-size: 12px;
  line-height: 18px;

  // line-height: 18px;
}

.condition-filter__group_button {
  display: flex;
  background: #F8F8F8;
  align-items: center;
  padding: 0 10px;
  height: 40px;
  border: 1px solid transparent;
  border-radius: 40px;
}

// 标题
.condition-filter__title {
  height: 40px;
  margin-right: 10px;
  margin-top: 1px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.condition-filter__clear {
  flex-shrink: 0;
}

// 列表
.condition-filter__list {
  display: flex;
  flex-wrap: wrap;
}

// 标签样式
.condition-filter__tag {
  cursor: pointer;
  padding: 3px 6px;
  border: 1px solid transparent;
  border-radius: 40px;
  // margin-right: 8px;
  // height: 18px;
  // margin: 1px;
  margin: 1px 2px;
  display: inline-flex;
  align-items: center;
}

// 选中
.condition-filter__tag--seleted,
.condition-filter__tag:hover {
  background-color: @base-color; // 全局主题色
  color: #fff;
  // border-radius: 10px;
}

// 关闭x
.condition-filter__tag__close {
  display: none;
  margin-left: 4px;
  background-color: transparent;
  border-radius: 50%;
  height: 1em;
  line-height: 1em;
  width: 1em;
  // background-color: #fff;
  // color: @base-color;
}

.condition-filter__tag__close:hover {
  background-color: #fff;
  color: @base-color;
}

.condition-filter__tag--seleted .condition-filter__tag__close {
  display: inline-block;
}

// 子节点样式
.condition-filter__child {
  //   margin-left: 102px;
  margin-top: 10px;
}

.condition-filter__list-wrap {
  flex: 1;
}

// 列表
.condition-item__list {
  display: flex;
  flex-wrap: wrap;
}

.condition-item__list-box {
  display: flex;
  // align-items: center;
}

.condition-item__list--overflow {
  // height: 22px;
  // height: 20px;
  // overflow: hidden;
}

.condition-item__list__more {
  width: 12px;
  cursor: pointer;
  line-height: 20px;
  margin-left: auto;
}
</style>
