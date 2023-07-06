<template>
  <div
    class=""
    v-loading="loading"
  >
    <ConditionFilterGroup
      :options="options"
      @on-change="handleChange"
    ></ConditionFilterGroup>
  </div>
</template>

<script>
// created at 2023-04-29
import ConditionFilterGroup from '@/components/condition-filter/ConditionFilterGroup.vue'
import { useGroupStore } from '@/store/group-store.js'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'ConditionFilter',

  props: {},

  components: {
    ConditionFilterGroup,
  },

  data() {
    return {
      loading: true,

      options: [
        {
          title: '域名状态',
          field: 'domain_expire_days',
          selected: [],
          maxCount: 1,
          options: [
            {
              label: '已过期',
              value: [null, 3],
            },
            {
              label: '3天内过期',
              value: [0, 3],
            },
            {
              label: '7天内过期',
              value: [0, 7],
            },
            {
              label: '30天内过期',
              value: [0, 30],
            },
          ],
        },

        {
          title: '域名分组',
          field: 'group_ids',
          hidden: true,
          selected: [],
          options: [],
        },
      ],
    }
  },

  computed: {
    ...mapState(useGroupStore, {
      groupOptions: 'getGroupOptions',
    }),
  },

  methods: {
    async resetData() {
      // const res = await this.$http.getDomainInfoGroupFilter()
      const res = await this.$http.getGroupList()

      if (res.ok) {
        this.options.forEach((item) => {
          if (item.field == 'group_ids') {
            if (res.data.list && res.data.list.length > 0) {
              item.options = res.data.list.map((groupItem) => {
                let label = groupItem.name

                // if (groupItem.domain_count > 0) {
                //   label = `${groupItem.name} ${groupItem.domain_count}`
                // }

                return {
                  ...groupItem,
                  value: groupItem.id,
                  label: label,
                }
              })
              item.hidden = false
            } else {
              item.hidden = true
            }
          }
        })
      }
      this.loading = false
    },

    handleChange(data) {
      this.$emit('on-change', this.options)
    },
  },

  created() {
    this.resetData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
