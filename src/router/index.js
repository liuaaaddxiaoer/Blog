import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ArticleDetail from '@/components/ArticleDetail'
import Writer from '@/components/Writer'
import HomeVC_PC from '@/vc/HomeViewControler_PC'

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
