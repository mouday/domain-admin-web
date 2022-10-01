import { defineStore } from 'pinia'
import Http from '../api/http-util/index.js'

export const useUserStore = defineStore({
  id: 'user-store', // id必填，且需要唯一

  state: () => {
    return {
      // avatar_url nick_name
      _userInfo: null,
    }
  },

  getters: {
    hasUserInfo: (state) => state._userInfo != null,

    userInfo: (state) => state._userInfo,
  },

  // 修改数据的方法 methods
  actions: {
    async updateUserInfo() {
      const res = await Http.getUserInfoForBasic()
      if (res.code == 0) {
        this._userInfo = res.data
      }
    },
  },
})
