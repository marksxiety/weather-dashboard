import { createRouter, createWebHistory } from 'vue-router'
import CityListings from '@/views/CityListings.vue'
import CityInfo from '@/views/CityInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'citylistings',
      component: CityListings,
    },
    {
      path: '/city/:city',
      name: 'cityinfo',
      component: CityInfo
    }
  ],
})

export default router
