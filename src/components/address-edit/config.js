// 表单验证
export const formRules = {
    
    // 主机地址
    host: [
      {
        message: '主机地址不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 主机连接状态
    host_connect_status: [
      {
        message: '主机连接状态不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 主机检查时间
    host_check_time: [
      {
        message: '主机检查时间不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 证书颁发时间
    // ssl_start_time: [
    //   {
    //     message: '证书颁发时间不能为空',
    //     required: true,
    //     trigger: 'blur',
    //   },
    // ],
    
    // 证书过期时间
    // ssl_expire_time: [
    //   {
    //     message: '证书过期时间不能为空',
    //     required: true,
    //     trigger: 'blur',
    //   },
    // ],
    
    // 证书检查时间
    // ssl_check_time: [
    //   {
    //     message: '证书检查时间不能为空',
    //     required: true,
    //     trigger: 'blur',
    //   },
    // ],
    
    // 过期剩余天数
    // ssl_expire_days: [
    //   {
    //     message: '过期剩余天数不能为空',
    //     required: true,
    //     trigger: 'blur',
    //   },
    // ],
    
  }


// 引入枚举值














