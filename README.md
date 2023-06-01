# domain-admin-web

项目地址：[https://github.com/mouday/domain-admin-web](https://github.com/mouday/domain-admin-web)

该项目是 [domain-admin](https://github.com/mouday/domain-admin) 的前端代码

预览地址：[https://mouday.github.io/domain-admin-web/](https://mouday.github.io/domain-admin-web/)

账号密码随意，预览模式仅提供模拟数据，无法操作修改

## 分支说明

- `master` 分支为源码
- `dist` 分支为打包产物，直接clone到目录即可：`domain_admin/public`
- `preview` 分支为在线预览分支：[https://mouday.github.io/domain-admin-web/](https://mouday.github.io/domain-admin-web/)

### 使用master分支

```bash
git clone git@github.com:mouday/domain-admin-web.git

# 安装依赖
pnpm i

# 启动开发环境
make dev
```

### 使用dist分支

```bash
cd domain-admin

git clone -b dist https://github.com/mouday/domain-admin-web.git domain_admin/public
```

## 技术栈

- Vite https://cn.vitejs.dev/
- Vue3.js https://cn.vuejs.org/guide/introduction.html
- Vue Router https://router.vuejs.org/zh/introduction.html
- Pinia https://pinia.vuejs.org/
- Element Plus https://element-plus.org/zh-CN/
- Tailwind CSS https://www.tailwindcss.cn/

