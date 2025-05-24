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
  <a-modal v-model:visible="showPwdModal" title="请输入数据密码" @ok="checkPwd">
    <a-input-password v-model="inputPwd" placeholder="请输入密码" />
    <template #footer>
      <a-button @click="showPwdModal = false">取消</a-button>
      <a-button type="primary" @click="checkPwd">确定</a-button>
    </template>
  </a-modal>
  <div class="simple-home-wrapper">
    <h1 class="main-title">Hi, I'm Yo Shun! <span>👋</span></h1>
    <div class="avatar-emoji" style="font-size: 90px; margin: 32px 0 24px 0;">🧑🏻‍💻</div>
    <div class="big-label">数据分析师 <span style="font-size: 36px;">👨🏻‍💻</span></div>
    <div class="big-label">街舞爱好者 <span style="font-size: 36px;">🕺</span></div>
    <div class="desc">
      <p>Welcome to my personal page!</p>
      <p>Just a developer and analyst who loves data analysis.</p>
    </div>
    <div class="social-row">
      <a href="mailto:your@email.com" class="social-btn email" title="Email"><span>✉️</span></a>
      <a href="#" class="social-btn x" title="X"><span>𝕏</span></a>
      <a href="#" class="social-btn github" title="GitHub"><span>🐱</span></a>
      <a href="#" class="social-btn instagram" title="Instagram"><span>📸</span></a>
      <a href="#" class="social-btn tiktok" title="TikTok"><span>🎵</span></a>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { Message } from '@arco-design/web-vue'

const router = useRouter()
const route = useRoute()

const keyMap = {
  '/': 'home',
  '/portfolio': 'portfolio',
  '/dashboard': 'dashboard',
  '/database': 'database',
}

const selectedKey = ref(keyMap[route.path] || 'home')
const showPwdModal = ref(false)
const inputPwd = ref('')
const dbPwd = '123456' // 数据库页面密码

watch(
  () => route.path,
  (val) => {
    selectedKey.value = keyMap[val] || 'home'
  }
)

function onMenuClick(key) {
  if (key === 'home') router.push('/')
  else if (key === 'portfolio') router.push('/portfolio')
  else if (key === 'dashboard') router.push('/dashboard')
  else if (key === 'database') showPwdModal.value = true
}

function checkPwd() {
  if (inputPwd.value === dbPwd) {
    showPwdModal.value = false
    inputPwd.value = ''
    router.push('/database')
  } else {
    Message.error('密码错误')
  }
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
.arco-navbar .arco-menu-item {
  color: #222 !important;
}
.arco-navbar .arco-menu-item.arco-menu-selected {
  color: #222 !important;
  background: #f5f5f5 !important;
}
.arco-navbar .arco-menu-item:hover {
  color: #000 !important;
}
.arco-navbar .arco-menu-selected .arco-menu-item-content {
  color: #222 !important;
}
.arco-navbar .arco-menu-selected::after,
.arco-navbar .arco-menu-item.arco-menu-selected::after {
  background: #222 !important;
}
.arco-navbar .arco-menu-item::after {
  background: #222 !important;
}
.simple-home-wrapper {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
}
.main-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
}
.big-label {
  font-size: 2.1rem;
  font-weight: 700;
  margin: 0.2em 0;
  text-align: center;
}
.desc {
  margin: 32px 0 24px 0;
  color: #444;
  text-align: center;
  font-size: 1.1rem;
}
.social-row {
  display: flex;
  gap: 18px;
  margin-top: 18px;
  justify-content: center;
}
.social-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: #222;
  transition: background 0.2s, color 0.2s;
  border: none;
  text-decoration: none;
}
.social-btn:hover {
  background: #222;
  color: #fff;
}
.avatar-emoji {
  text-align: center;
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