// import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'

const Home = () => import('@/components/Home')
const ArticleDetail = () => import('@/components/ArticleDetail')
const Writer = () => import('@/components/Writer')

// import HomeVC_PC from '@/vc/HomeViewControler_PC'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: ArticleDetail,
      props: true
    },
    {
      path: '/writer',
      name: 'Writer',
      component: Writer,
    },
  ]
})
