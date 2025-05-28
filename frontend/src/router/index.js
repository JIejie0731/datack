import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'  // 引入之前创建的Home页面
import Portfolio from '../views/Portfolio.vue'
import Blog from '../views/Blog.vue'
import Database from '../views/Database.vue'
import Livedata from '../views/Livedata.vue'
import Logistics from '../views/Logistics.vue'
import HumanResource from '../views/HumanResource.vue'
import Test from '../views/Test.vue'

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
    name: 'Livedata',
    component: Livedata
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
    path: '/test',
    name: 'Test',
    component: Test
  }
  // 后续可添加其他路由配置
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  // 使用HTML5历史模式
  routes
})

export default router