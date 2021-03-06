import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('@/views/Blog')
    },
    {
      path: '/dungeon-master',
      name: 'Dm',
      component: () => import('@/views/Dm')
    },
    {
      path: '/ultima',
      redirect: '/',
      component: () => import('@/views/ultima/Ultima'),
      children: [
        {
          path: '',
          name: 'Ultima',
          component: () => import('@/views/ultima/UltimaStart')
        },
        {
          path: 'generate',
          name: 'UltimaGenerator',
          component: () => import('@/views/ultima/UltimaGenerator')
        },
        {
          path: 'characters',
          name: 'UltimaCharacters',
          component: () => import('@/views/ultima/UltimaCharacters')
        },
        {
          path: 'play',
          name: 'UltimaPlay',
          component: () => import('@/views/ultima/UltimaPlay')
        }
      ]
    }
  ]
})
