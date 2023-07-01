<template>
  <div class="app-container">
    <el-tabs
      v-model="activeName"
      @tab-change="handleTabChange"
    >
      <el-tab-pane
        label="邮件设置"
        name="email-config"
        lazy
      >
        <div class="tab-container">
          <SystemEditDataForm></SystemEditDataForm>
        </div>
      </el-tab-pane>

      <el-tab-pane
        label="监测设置"
        name="cron-config"
        lazy
      >
        <div class="tab-container">
          <CronConfigEditDataForm></CronConfigEditDataForm>
        </div>
      </el-tab-pane>

      <el-tab-pane
        label="API KEY"
        name="system-env"
        lazy
      >
        <div class="tab-container">
          <SystemEnvEditDataForm></SystemEnvEditDataForm>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// created at 2023-07-01
import SystemEditDataForm from '../system-edit/DataForm.vue'
import CronConfigEditDataForm from '@/components/cron-config-edit/DataForm.vue'
import SystemEnvEditDataForm from '@/components/system-env-edit/DataForm.vue'

export default {
  name: 'index',

  props: {},

  components: {
    SystemEditDataForm,
    CronConfigEditDataForm,
    SystemEnvEditDataForm,
  },

  data() {
    return {
      activeName: 'email-config',
    }
  },

  computed: {},

  methods: {
    async getData() {},

    handleTabChange(val) {
      localStorage.setItem('system-setup/tab', val)
    },
  },

  created() {
    let tab = localStorage.getItem('system-setup/tab')
    this.activeName = this.$route.query.tab || tab || this.activeName
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped>
.tab-container {
  width: 500px;
}
</style>
