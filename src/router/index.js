import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'double-eleven',
    component: () => import('@/views/double-eleven'),
    meta: {
      title: '双十一活动页'
    }
  },
  {
    path: '/double-eleven-welfare',
    name: 'double-eleven-welfare',
    component: () => import(/* webpackChunkName: "双十一奖励领取" */ '../views/double-eleven-welfare.vue'),
    meta: {
      title: '双十一奖励领取'
    }
  },
  {
    path: '/question',
    name: 'question',
    component: () => import(/* webpackChunkName: "问卷" */ '../views/question.vue'),
    meta: {
      title: '一元实操营问卷'
    }
  }
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
