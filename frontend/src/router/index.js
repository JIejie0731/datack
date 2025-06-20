import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'  // 引入之前创建的Home页面
import Portfolio from '../views/作品集/Portfolio.vue'
import Blog from '../views/Blog.vue'
import Database from '../views/Database.vue'
import Livedata from '../views/数据求索/Livedata.vue'
import Logistics from '../views/作品集/Logistics.vue'
import HumanResource from '../views/作品集/HumanResource.vue'
import Test from '../views/Test.vue'
import CombatMap from '../views/作品集/CombatMap.vue' // 新增
import DataManage from '../views/数据求索/DataManage.vue'
import DataQuery from '../views/数据求索/DataQuery.vue'
import Login from '../views/数据求索/Login.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home  // 配置首页路由
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/database',
    name: 'Database',
    component: Database
  },
  {
    path: '/livedata',
    name: 'LivedataLogin',
    component: Login,
  },
  {
    path: '/livedata/main',
    name: 'Livedata',
    component: Livedata,
    children: [
      {
        path: 'manage',
        name: 'DataManage',
        component: DataManage
      },
      {
        path: 'mapping',
        name: 'DatasetTableMap',
        component: () => import('../views/数据求索/DatasetTableMap.vue')
      },
      {
        path: 'query',
        name: 'DataQuery',
        component: DataQuery
      },
      {
        path: 'upload',
        name: 'DataUpload',
        component: () => import('../views/数据求索/DataUpload.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/数据求索/Profile.vue')
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/数据求索/Dashboard.vue')
      },
      // 可继续添加其他子页面
    ]
  },
  {
    path: '/logistics',
    name: 'Logistics',
    component: Logistics
  },
  {
    path: '/human-resource',
    name: 'HumanResource',
    component: HumanResource
  },
  {
    path: '/hr-dashboard',
    name: 'HRDashboard',
    component: HumanResource
  },
  {
    path: '/CombatMap',
    name: 'CombatMap',
    component: CombatMap
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/toolbox',
    name: 'Toolbox',
    component: () => import('../views/Toolbox.vue')
  },
  {
    path: '/building-digital-twin',
    name: 'BuildingDigitalTwin',
    component: () => import('../views/作品集/BuildingDigitalTwin.vue')
  }
  // 后续可添加其他路由配置
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  // 使用HTML5历史模式
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 检查是否需要登录权限（只对/livedata/main及其子路由进行检查）
  if (to.path.startsWith('/livedata/main')) {
    const token = localStorage.getItem('token')
    if (!token) {
      // 如果没有token，重定向到登录页
      next('/livedata')
      return
    }
  }
  next()
})

export default router