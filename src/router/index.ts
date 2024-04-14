import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
        }
      ]
    },
   
    
  ]
})

export default router
