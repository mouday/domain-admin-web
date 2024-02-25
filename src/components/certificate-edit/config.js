// 表单验证
export const formRules = {
    
    // 域名
    domain: [
      {
        message: '域名不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 证书
    ssl_certificate: [
      {
        message: '证书不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 证书私钥
    // ssl_certificate_key: [
    //   {
    //     message: '证书私钥不能为空',
    //     required: true,
    //     trigger: 'blur',
    //   },
    // ],
    
    // 签发时间
    start_time: [
      {
        message: '签发时间不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 过期时间
    expire_time: [
      {
        message: '过期时间不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 备注
    // comment: [
    //   {
    //     message: '备注不能为空',
    //     required: true,
    //     trigger: 'blur',
    //   },
    // ],
    
    // 创建时间
    create_time: [
      {
        message: '创建时间不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
  }


// 引入枚举值














