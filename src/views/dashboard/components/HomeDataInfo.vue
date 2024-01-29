<template>
  <HomeCard
    desc="System"
    title="系统数据"
  >
    <ActivePlate :infoList="list" />
  </HomeCard>
</template>

<script>
import ActivePlate from './active-plate.vue'
import HomeCard from './card.vue'
import { getUUID } from '@/utils/uuid.js'

export default {
  name: '',

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  components: { HomeCard, ActivePlate },

  data() {
    return {
      // list: [],
      // infoCardData:
      // list: [
      // {
      //   title: '新增用户',
      //   icon: 'md-person-add',
      //   count: 803,
      //   color: '#11A0F8',
      // },
      // { title: '累计点击', icon: 'md-locate', count: 232, color: '#FFBB44 ' },
      // {
      //   title: '新增问答',
      //   icon: 'md-help-circle',
      //   count: 142,
      //   color: '#7ACE4C',
      // },
      // { title: '分享统计', icon: 'md-share', count: 657, color: '#11A0F8' },
      // {
      //   title: '新增互动',
      //   icon: 'md-chatbubbles',
      //   count: 12,
      //   color: '#91AFC8',
      // },
      // { title: '新增页面', icon: 'md-map', count: 14, color: '#91AFC8' },
      // ],
    }
  },

  computed: {},

  methods: {},

  created() {
    // this.getData()
  },
}
</script>

<style lang="less" scoped></style>
