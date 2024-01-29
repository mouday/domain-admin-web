<template>
  <HomeCard
    desc="Config"
    title="配置信息"
  >
    <div class="home-config">
      <!-- <p>
        <i class="icon" style="background-color:#36cbcb;"></i>
        <span>Spider Admin Version</span>
        <span style="margin-left:20px;">{{spider_admin.version || '-'}}</span>
      </p> -->

      <p>
        <i class="icon"></i>
        <span>Scrapyd</span>
        <span style="margin-left: 20px">{{ scrapyd.url }}</span>

        <template>
          <span style="margin-left: 20px">
            <mo-status :value="scrapyd.status" />
          </span>
        </template>
      </p>
    </div>
  </HomeCard>
</template>

<script>
import HomeCard from './card.vue'
export default {
  name: '',

  props: [],

  components: {
    HomeCard,
  },

  data() {
    return {
      scrapyd: {},
      spider_admin: {},
    }
  },

  computed: {},

  methods: {
    async getData() {
      const res = await this.$Http.systemSystemConfig()
      this.scrapyd = res.data.scrapyd
      this.spider_admin = res.data.spider_admin
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less" scoped>
.home-config {
  font-size: 16px;
  color: #595959;
  padding: 15px 28px;

  p {
    margin: 0;
    line-height: 2;

    i.icon {
      display: inline-block;
      border-radius: 5px;
      width: 10px;
      height: 10px;
      // margin-right: 6px;
      background: #f66;
    }
  }
}
</style>
