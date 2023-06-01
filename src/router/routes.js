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
        path: '/notify-edit',
        name: 'notify-edit',
        component: () => import('@/views/notify-edit/index.vue'),
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
      {
        path: '/group-list',
        name: 'group-list',
        component: () => import('@/views/group-list/index.vue'),
      },
      {
        path: '/lab',
        name: 'lab',
        component: () => import('../views/lab/index.vue'),
      },
      
    ],
  },
]
