import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import keyBoard from '@/components/keyBoard'
import WordList from '@/components/WordList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    components: {
      default: keyBoard,
      // 與 `<router-view>` 上的 `name` 屬性相符
      WordList
    }
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
