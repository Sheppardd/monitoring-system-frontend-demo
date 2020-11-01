import Vue from 'vue'
import VueRouter from 'vue-router'
import Sidebar from '../views/Sidebar.vue'
import Dashboard from '../views/Dashboard.vue'
import Trolleys from '../views/Trolleys.vue'
import Areas from '../views/Areas.vue'
import Stations from '../views/Stations.vue'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/', name: 'sidebar', 
    meta: { requiresAuth: false },
    component: Sidebar, 
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { requiresAuth: false },
        component: Dashboard
      }, 
      {
        path: '/trolleys',
        name: 'trolleys',
        meta: { requiresAuth: false },
        component: Trolleys
      }, 
      {
        path: '/stations',
        name: 'stations',
        meta: { requiresAuth: false },
        component: Stations
      }, 
      {
        path: '/areas',
        name: 'areas',
        meta: { requiresAuth: false },
        component: Areas
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
