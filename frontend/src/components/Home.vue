<template>
  <a-menu mode="horizontal" :selected-keys="[selectedKey]" class="arco-navbar" @menu-item-click="onMenuClick">
    <a-menu-item key="home">首页</a-menu-item>
    <a-menu-item key="portfolio">作品集</a-menu-item>
    <a-menu-item key="dashboard">数据求索</a-menu-item>
    <a-menu-item key="database">数据库</a-menu-item>
  </a-menu>
  <a-modal v-model:visible="showPwdModal" title="请输入数据密码" @ok="checkPwd">
    <a-input-password v-model="inputPwd" placeholder="请输入密码" />
    <template #footer>
      <a-button @click="showPwdModal = false">取消</a-button>
      <a-button type="primary" @click="checkPwd">确定</a-button>
    </template>
  </a-modal>
  <div class="home-container">
    <h1>欢迎来到数据求索</h1>
    <p>本系统可实时监控和展示各类指标。</p>
    <router-link to="/portfolio">
      <button class="go-dashboard-btn">进入大屏</button>
    </router-link>
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
.arco-navbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.home-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
  box-sizing: border-box;
  padding-top: 68px;
}
h1 {
  font-size: 2.5rem;
  color: #22223b;
  margin-bottom: 1rem;
}
p {
  color: #4a4e69;
  margin-bottom: 2rem;
}
.go-dashboard-btn {
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  background: #3b5cff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.go-dashboard-btn:hover {
  background: #283593;
}
</style> 