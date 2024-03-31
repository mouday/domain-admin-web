// 表单验证
export const formRules = {
    
    // 服务器地址
    deploy_host: [
      {
        message: '服务器地址不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 私钥部署路径
    deploy_key_file: [
      {
        message: '私钥部署路径不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 公钥部署路径
    deploy_fullchain_file: [
      {
        message: '公钥部署路径不能为空',
        required: true,
        trigger: 'blur',
      },
    ],
    
    // 重启命令
    // deploy_reloadcmd: [
    //   {
    //     message: '重启命令不能为空',
    //     required: true,
    //     trigger: 'blur',
    //   },
    // ],
    
  }


// 引入枚举值








