module.exports = {
  table: {
    columns: [
      {
        comment: '用户名',
        name: 'username',
        default: '',
      },

      {
        comment: '头像',
        name: 'avatar_url',
        default: '',
      },
      {
        comment: '过期前多少天提醒',
        name: 'before_expire_days',
        default: '',
      },
      {
        comment: '收件列表',
        name: 'email_list',
        default: '',
      },
    ],
  },
}
