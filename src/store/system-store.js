import { defineStore } from 'pinia'
import { Http } from '@/api/index.js'

export const useSystemStore = defineStore({
  id: 'system-store', // id必填，且需要唯一

  state: () => {
    return {
      // 侧面导航栏展开关闭
      _isCollapse: false,

      // 系统版本号
      _version: '',

      // 允许注册
      _enabled_register: false,
    }
  },

  getters: {
    isCollapse(state) {
      return state._isCollapse
    },

    version(state) {
      return state._version
    },
    
    enabledRegister(state) {
      return state._enabled_register
    },
  },

  // 修改数据的方法 methods
  actions: {
    setIsCollapse(value) {
      this._isCollapse = value
      localStorage.setItem("isCollapse", value)
    },

    toggleCollapse() {
      this.setIsCollapse(!this._isCollapse)
    },

    async updateVersion() {
      const res = await Http.getSystemVersion()

      if (res.code == 0) {
        this._version = res.data.version
        this._enabled_register = res.data.enabled_register
      }
    },
  },
})
