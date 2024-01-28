// 表单验证
export const formRules = {
  url: [
    {
      message: 'URL不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
  method: [
    {
      message: '请求方式不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
  timeout: [
    {
      message: '超时时间不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
}
