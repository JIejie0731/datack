import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Dashboard from '../components/Dashboard.vue'
import Portfolio from '../components/Portfolio.vue'
import Database from '../components/Database.vue'
import HRDashboard from '../components/HRDashboard.vue'
import BattleMap from '../components/BattleMap.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard },
  { path: '/portfolio', component: Portfolio },
  { path: '/database', component: Database },
  { path: '/hr-dashboard', component: HRDashboard },
  { path: '/battle-map', component: BattleMap }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 