import { checkMobileDevice as isMobile } from '@/utils/checkMobileDevice'

export default [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/register',
    component: () => import('@/router/layouts/Main.vue'),
    children: [
      {
        name: 'register',
        path: '',
        component: () => import('@/views/Register.vue')
      },
      {
        path: 'success',
        component: () => import('@/views/Success.vue')
      }
    ]
  },
  {
    path: '/activate',
    component: () => import('@/router/layouts/Main.vue'),
    meta: {
      authRequired: true
    },
    beforeEnter (to, from, next) {
      if (isMobile()) {
        next()
      } else {
        next('/error')
      }
    },
    children: [
      {
        name: 'activate',
        path: '',
        component: () => import('@/views/Activate.vue')
      },
      {
        path: 'success',
        component: () => import('@/views/Success.vue')
      }
    ]
  },
  {
    name: 'error',
    path: '/error',
    component: () => import('@/views/Error.vue')
  },
  {
    path: '*',
    redirect: '/error'
  }
]
