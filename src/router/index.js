import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import Cockpit from '../views/Cockpit/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cockpit',
    name: 'cockpit',
    component: Cockpit
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
