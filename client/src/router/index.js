// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Children from '../components/Children.vue'
import Adults from '../components/Adults.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/children', name: 'Children', component: Children },
  { path: '/adults', name: 'Adults', component: Adults },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
