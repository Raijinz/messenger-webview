import Vue from 'vue'
import VueRouter from 'vue-router'
import checkTouchScreen from '@/utils/checkTouchScreen'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    beforeEnter: (to, from, next) => {
      const touchable = checkTouchScreen()

      if (touchable) {
        next()
      } else {
        next({ path: 'error' })
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import(/* webpackChunkName: "error" */ '@/views/Error.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
