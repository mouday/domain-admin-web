import { defineStore } from 'pinia'

export const useSystemStore = defineStore({
  id: 'system-store', // id必填，且需要唯一

  state: () => {
    return {
      // 侧面导航栏展开关闭
      _isCollapse: true,
    }
  },

  getters: {
    isCollapse(state) {
      return state._isCollapse
    },
  },

  // 修改数据的方法 methods
  actions: {
    setIsCollapse() {
      this._isCollapse = !this._isCollapse
    },
  },
})