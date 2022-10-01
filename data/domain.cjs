module.exports = {
  table: {
    columns: [
      {
        comment: '域名',
        name: 'domain',
        default: '',
      },
      {
        comment: 'ip',
        name: 'ip',
        default: '',
      },
      {
        comment: '证书颁发时间',
        name: 'start_time',
        default: '',
      },
      {
        comment: '证书过期时间',
        name: 'expire_time',
        default: '',
      },
      {
        comment: '证书检查时间',
        name: 'check_time',
        default: '',
      },
      {
        comment: '域名连接状态',
        name: 'connect_status',
        default: '',
      },
      {
        comment: '有效期总天数',
        name: 'total_days',
        default: '',
      },
      {
        comment: '过期剩余天数',
        name: 'expire_days',
        default: '',
      },

      {
        comment: '创建时间',
        name: 'create_time',
        default: '',
      },
    ],
  },
}
