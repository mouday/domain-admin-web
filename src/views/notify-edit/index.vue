<template>
  <div class="app-container notify-edit-container">
    <!-- 菜单 -->
    <div class="notify-edit__menu">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <template v-for="item in options">
          <el-tab-pane
            :label="item.label"
            :name="item.value"
          >
            <div class="notify-edit__main">
              <component :is="item.component" /></div
          ></el-tab-pane>

          <!-- <el-menu-item :index="item.value">
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.label }}</span>
          </el-menu-item> -->
        </template>
      </el-tabs>

      <!-- <el-menu
        :default-active="active"
        menu-trigger="click"
        mode="horizontal"
        @select="handleMenuSelect"
      >
        <template v-for="item in options">
          <el-menu-item :index="item.value">
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </template>
      </el-menu> -->
    </div>

    <!-- 编辑区 -->
    <!-- <div class="notify-edit__main">
      <component :is="currentComponent" />
    </div> -->
  </div>
</template>

<script>
// created at 2022-10-30
import NotifyEditEmail from '@/views/notify-edit-email/DataForm.vue'
import NotifyEditWebhook from '@/views/notify-edit-webhook/DataForm.vue'
import NotifyEditWorkWeixin from '@/views/notify-edit-work-weixin/index.vue'

export default {
  name: 'index',

  props: {},

  components: {
    NotifyEditEmail,
    NotifyEditWebhook,
    NotifyEditWorkWeixin,
  },

  data() {
    return {
      activeName: 'email',

      options: [
        {
          value: 'email',
          label: this.$t('邮件'),
          icon: 'Message',
          component: NotifyEditEmail,
        },
        {
          value: 'webhook',
          label: 'WebHook',
          icon: 'AlarmClock',
          component: NotifyEditWebhook,
        },
        {
          value: 'work-weixin',
          label: this.$t('企业微信'),
          icon: 'ChatSquare',
          component: NotifyEditWorkWeixin,
        },
      ],
    }
  },

  computed: {
    currentComponent() {
      // console.log('active', this.active);
      return this.options.find((item) => item.value == this.active).component
    },
  },

  methods: {
    async getData() {},

    handleMenuSelect(index, indexPath, item, routeResult) {
      // console.log(index, indexPath, item, routeResult)
      this.active = index
    },

    handleClick() {},
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped>
.notify-edit-container {
  // display: flex;
}

.notify-edit__menu {
  // width: 200px;
  // flex-shrink: 0;
}

.notify-edit__main {
  // box-sizing: border-box;
  padding-top: 20px;
  // flex: 1;
}
</style>
