import Admin from '@/views/admin/Admin.vue'
import Login from '@/views/login/Login.vue'
import Layout from '@/layout/index.vue'

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
    ],
  },
  { path: '/admin', component: Admin },
]
