import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'Main',
      component: () => import('../views/Main.vue')
    },
    {
      path:'/basket',
      name:'Basket',
      component:()=>import('../views/Basket.vue')
    },
    {
      path:'/pizza/:id',
      name:'pizza',
      component:()=>import('../views/PizzaFull.vue')
    }

  

  ]
})

export default router
