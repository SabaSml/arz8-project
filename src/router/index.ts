import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import detailCountry from '../views/DetailCountry.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/home', component: HomeView },
    { path: '/detail/:alpha3Code', component: detailCountry, name: 'detail' }
  ]
})

export default router
