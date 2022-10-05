import Layout from '@/layout/index.vue'
import Login from '@/views/login/Login.vue'

export const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/domain-list',
    children: [
      {
        path: '/domain-list',
        name: 'domain-list',
        component: () => import('@/views/domain-list/index.vue'),
      },
      {
        path: '/system-list',
        name: 'system-list',
        component: () => import('@/views/system-list/index.vue'),
      },
      {
        path: '/user-edit',
        name: 'user-edit',
        component: () => import('@/views/user-edit/index.vue'),
      },

      {
        path: '/user-admin-list',
        name: 'user-admin-list',
        component: () => import('@/views/user-admin-list/index.vue'),
      },
      {
        path: '/log-scheduler-list',
        name: 'log-scheduler-list',
        component: () => import('@/views/log-scheduler-list/index.vue'),
      },
    ],
  },
]
