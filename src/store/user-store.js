import { defineStore } from 'pinia'
import { Http } from '@/api/index.js'
import { RoleEnum } from '@/emuns/role-enums.js'

export const useUserStore = defineStore({
  id: 'user-store', // id必填，且需要唯一

  state: () => {
    return {
      _userInfo: null,
    }
  },

  getters: {
    hasUserInfo(state) {
      return state._userInfo != null
    },

    isAdmin(state) {
      if (state._userInfo) {
        return state._userInfo.username == 'admin'
      }
    },

    userRoles(state) {
      let roles = []

      if (this.isAdmin) {
        roles.push(RoleEnum.Admin)
      }

      return roles
    },

    userInfo(state) {
      return state._userInfo
    },
  },

  // 修改数据的方法 methods
  actions: {
    async updateUserInfo() {
      const res = await Http.getUserInfo()

      if (res.code == 0) {
        this._userInfo = res.data
      }
    },

    removeUserInfo() {
      this._userInfo = null
    },
  },
})
