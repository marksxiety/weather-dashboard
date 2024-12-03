import { createRouter, createWebHistory } from 'vue-router'
import CityListings from '../views/CityListings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'citylistings',
      component: CityListings,
    }
  ],
})

export default router
