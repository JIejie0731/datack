<template>
  <div class="navbar-wrapper">
    <div class="navbar-logo">
      <img src="@/assets/logo黑色.png" alt="logo" class="logo-img" />
    </div>
    <div class="navbar-center">
      <a-menu mode="horizontal" :selected-keys="[selectedKey]" class="arco-navbar" @menu-item-click="onMenuClick">
        <a-menu-item key="home">首页</a-menu-item>
        <a-menu-item key="portfolio">作品集</a-menu-item>
        <a-menu-item key="dashboard">数据求索</a-menu-item>
        <a-menu-item key="database">数据库</a-menu-item>
      </a-menu>
    </div>
  </div>
  <div class="portfolio-container">
    <h1>作品集目录</h1>
    <div class="portfolio-list">
      <div class="portfolio-card" @click="goToDashboard">
        <div class="portfolio-card-title">物流中心运营监控大屏</div>
        <div class="portfolio-card-desc">实时监控物流中心各项运营指标，数据可视化大屏展示。</div>
      </div>
      <div class="portfolio-card" @click="goToHRDashboard">
        <div class="portfolio-card-title">人力资源数据分析</div>
        <div class="portfolio-card-desc">企业人力资源数据可视化与分析平台。</div>
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

function goToHRDashboard() {
  router.push('/hr-dashboard')
}
</script>

<style scoped>
.navbar-wrapper {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: #fff;
  height: 64px;
  display: flex;
  align-items: center;
  position: relative;
}
.navbar-logo {
  display: flex;
  align-items: center;
  height: 64px;
  padding-left: 32px;
}
.logo-img {
  width: 32px;
  height: 32px;
}
.navbar-center {
  position: absolute;
  left: calc(50% + 110px);
  top: 0;
  height: 64px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
}
.arco-navbar {
  display: flex;
  align-items: center;
  background: transparent;
  min-width: 600px;
}
:deep(.arco-navbar .arco-menu-item) {
  color: #222 !important;
}
:deep(.arco-navbar .arco-menu-item.arco-menu-selected) {
  color: #222 !important;
  background: #f5f5f5 !important;
}
:deep(.arco-navbar .arco-menu-item:hover) {
  color: #000 !important;
}
:deep(.arco-navbar .arco-menu-selected .arco-menu-item-content) {
  color: #222 !important;
}
:deep(.arco-navbar .arco-menu-selected::after),
:deep(.arco-navbar .arco-menu-item.arco-menu-selected::after),
:deep(.arco-navbar .arco-menu-item::after) {
  background: #222 !important;
}
.portfolio-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
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
  background: #f7f7f7;
  border-radius: 16px;
  box-shadow: none;
  padding: 32px 40px;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s, background 0.2s, border-color 0.2s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 2px solid #e0e0e0;
}
.portfolio-card:hover {
  background: #eaeaea;
  box-shadow: none;
  transform: translateY(-2px) scale(1.01);
  border-color: #222;
}
.portfolio-card-title {
  font-size: 1.35rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 12px;
}
.portfolio-card-desc {
  color: #555;
  font-size: 1.05rem;
}
h1 {
  font-size: 2.2rem;
  color: #222;
  margin-bottom: 1.5rem;
  font-weight: 700;
}
p {
  color: #555;
  font-size: 1.1rem;
}
:deep(.arco-navbar) {
  --color-primary: #222 !important;
}
:deep(.arco-navbar .arco-menu-item::after),
:deep(.arco-navbar .arco-menu-selected::after),
:deep(.arco-navbar .arco-menu-item.arco-menu-selected::after) {
  background: #222 !important;
  border-color: #222 !important;
}
</style> 