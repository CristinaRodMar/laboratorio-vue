import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/components/HomePage.vue'
import MyPlan   from '@/components/MyPlan.vue'
import MyMeal   from '@/components/MyMeal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/plan',
      name: 'plan',          
      component: MyPlan
    },
    {
      path: '/lista',
      name: 'lista',
      component: MyMeal
    },
    
  ]
})

export default router