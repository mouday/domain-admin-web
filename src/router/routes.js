import Layout from '@/layout/index.vue'
import Login from '@/views/login/Login.vue'
import { RoleEnum } from '@/emuns/role-enums.js'

export const routes = [
  { path: '/login', component: Login },

  {
    path: '/',
    name: 'index',
    component: Layout,
    redirect: '/domain-list',
    children: [
      {
        path: '/domain-list',
        name: 'domain-list',
        component: () => import('../views/domain-list/index.vue'),
        meta: {
          title: '证书列表',
          icon: 'Tickets',
        },
      },

      {
        path: '/domain-info-list',
        name: 'domain-info-list',
        component: () => import('../views/domain-info-list/index.vue'),
        meta: {
          title: '域名列表',
          icon: 'Coin',
        },
      },

      {
        path: '/group-list',
        name: 'group-list',
        component: () => import('../views/group-list/index.vue'),
        meta: {
          title: '分组管理',
          icon: 'Files',
        },
      },

      {
        path: '/notify-edit',
        name: 'notify-edit',
        // component: () => import('../views/notify-edit/index.vue'),
        component: () => import('../views/notify-list/index.vue'),
        meta: {
          title: '通知设置',
          icon: 'Message',
        },
      },

      {
        path: '/user-admin-list',
        name: 'user-admin-list',
        component: () => import('../views/user-admin-list/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'User',
          roles: [RoleEnum.Admin],
        },
      },

      {
        path: '/system-setup',
        name: 'system-setup',
        component: () => import('../views/system-setup/index.vue'),
        meta: {
          title: '系统设置',
          icon: 'Setting',
          roles: [RoleEnum.Admin],
        },
      },

      {
        path: '/log-scheduler-list',
        name: 'log-scheduler-list',
        component: () => import('../views/log-scheduler-list/index.vue'),
        meta: {
          title: '监测日志',
          icon: 'Calendar',
          roles: [RoleEnum.Admin],
        },
      },
      {
        path: '/log-operation-list',
        name: 'log-operation-list',
        component: () => import('../views/log-operation-list/index.vue'),
        meta: {
          title: '操作日志',
          icon: 'Compass',
          roles: [RoleEnum.Admin],
        },
      },
      
      {
        path: '/lab',
        name: 'lab',
        component: () => import('../views/lab/index.vue'),
        meta: {
          title: '实验室',
          icon: 'Box',
          roles: [RoleEnum.Admin],
        },
      },
    ],
  },
]
