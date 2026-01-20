// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import MyPlan from '@/components/MyPlan.vue'
import ListCard from '@/components/ListCard.vue'   

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
      component: ListCard   
    },
    {
      path: '/list/:id',
      name: 'list-detail',
      component: ListCard,
      props: true
    },
  ]
})

export default router