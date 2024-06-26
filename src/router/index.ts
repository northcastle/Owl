import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  // 根据环境变量的配置，开发时使用 history模式，打包时使用 hash 模式
  history: (import.meta.env.VITE_ENV == 'DEVELOPMENT') ? createWebHistory(import.meta.env.BASE_URL) : createWebHashHistory(),
  
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children:[
        {
          path:'',
          name:'homi',
          redirect:'/welcome'
        },
        {
          path: '/welcome',
          name: 'welcome',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/welcome/WelcomeView.vue')
        },

        {
          path:'/typingPractice',
          name:'typingPracticeView',
          component: () => import('../views/typePractice/TypingPractice.vue')
        },

        {
          path:'/packageHelper',
          name:'packageHelperView',
          component:() => import('../views/packageHelper/PackageHelper.vue')
        },

        {
          path:'/mathCalculater',
          name:'mathCalculaterView',
          component:() => import('../views/mathCalculater/MathCalculater.vue')
        }
      ]
    },
   
    
  ]
})

export default router
