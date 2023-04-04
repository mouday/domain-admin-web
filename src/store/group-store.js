import { defineStore } from 'pinia'
import { Http } from '@/api/index.js'

/**
 * 域名分组
 */
export const useGroupStore = defineStore({
  id: 'group-store', // id必填，且需要唯一

  state: () => {
    return {
      groupOptions: [],
    }
  },

  getters: {
    getGroupOptions: (state) => state.groupOptions,
  },

  // 修改数据的方法 methods
  actions: {
    setGroupOptions(groupOptions) {
      this.groupOptions = groupOptions.map((item) => {
        return {
          ...item,
          value: item.id,
          label: item.name,
        }
      })
    },

    async updateGroupOptions() {
      const res = await Http.getGroupList()

      if (res.code == 0) {
        this.setGroupOptions(res.data.list)
      }
    },
  },
})
