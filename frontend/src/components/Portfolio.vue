<template>
  <a-menu mode="horizontal" :selected-keys="[selectedKey]" class="arco-navbar" @menu-item-click="onMenuClick">
    <a-menu-item key="home">首页</a-menu-item>
    <a-menu-item key="portfolio">作品集</a-menu-item>
    <a-menu-item key="dashboard">数据求索</a-menu-item>
    <a-menu-item key="database">数据库</a-menu-item>
  </a-menu>
  <div class="portfolio-container">
    <h1>作品集目录</h1>
    <div class="portfolio-list">
      <div class="portfolio-card" @click="goToDashboard">
        <div class="portfolio-card-title">物流中心运营监控大屏</div>
        <div class="portfolio-card-desc">实时监控物流中心各项运营指标，数据可视化大屏展示。</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter()
const route = useRoute()

const keyMap = {
  '/': 'home',
  '/portfolio': 'portfolio',
  '/dashboard': 'dashboard',
  '/database': 'database',
}

const selectedKey = ref(keyMap[route.path] || 'portfolio')

watch(
  () => route.path,
  (val) => {
    selectedKey.value = keyMap[val] || 'portfolio'
  }
)

function onMenuClick(key) {
  if (key === 'home') router.push('/')
  else if (key === 'portfolio') router.push('/portfolio')
  else if (key === 'dashboard') router.push('/dashboard')
  else if (key === 'database') router.push('/database')
}

function goToDashboard() {
  router.push('/dashboard')
}
</script>

<style scoped>
.arco-navbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.portfolio-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding-top: 68px;
}
.portfolio-list {
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
  align-items: center;
}
.portfolio-card {
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px #3b5cff22;
  padding: 32px 40px;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 2px solid #e0e7ff;
}
.portfolio-card:hover {
  box-shadow: 0 8px 32px #3b5cff44;
  transform: translateY(-4px) scale(1.02);
  border-color: #3b5cff;
}
.portfolio-card-title {
  font-size: 1.35rem;
  font-weight: bold;
  color: #3b5cff;
  margin-bottom: 12px;
}
.portfolio-card-desc {
  color: #4a4e69;
  font-size: 1.05rem;
}
h1 {
  font-size: 2.2rem;
  color: #22223b;
  margin-bottom: 1.5rem;
}
p {
  color: #4a4e69;
  font-size: 1.1rem;
}
</style> 