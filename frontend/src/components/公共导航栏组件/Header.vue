<template>
  <div class="fixed bottom-5 left-0 w-full z-50 flex justify-center pointer-events-none">
    <div class="flex flex-row items-center bg-white rounded-full px-4 pt-2 h-16 shadow-lg border border-gray-200 transition-all duration-300 group pointer-events-auto"
         :class="isAnyHovered ? 'scale-x-105' : ''">
      <!-- 左侧2个主导航 -->
      <div
        v-for="(item, idx) in navbarLeft"
        :key="item.label"
        class="group/item relative"
        @mouseenter="hoveredIndex = 'nav-left-' + idx; isAnyHovered = true"
        @mouseleave="hoveredIndex = null; isAnyHovered = false"
      >
        <button
          class="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 focus:outline-none"
          :aria-label="item.label"
          @click="idx === 0 ? router.push('/') : (idx === 1 ? router.push('/portfolio') : null)"
        >
          <img :src="item.icon" class="navbar-icon-img text-xl group-hover/item:scale-125 transition-transform duration-300" />
        </button>
        <!-- Tooltip -->
        <div v-if="hoveredIndex === 'nav-left-' + idx" class="navbar-tooltip">
          {{ item.label }}
        </div>
      </div>
      <div class="w-px h-8 bg-gray-200 mx-2"></div>
      <!-- 右侧3个主导航 -->
      <div
        v-for="(item, idx) in navbarRight"
        :key="item.label"
        class="group/item relative"
        @mouseenter="hoveredIndex = 'nav-right-' + idx; isAnyHovered = true"
        @mouseleave="hoveredIndex = null; isAnyHovered = false"
      >
        <button
          class="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 focus:outline-none"
          :aria-label="item.label"
          @click="handleNavRightClick(idx)"
        >
          <img :src="item.icon" class="navbar-icon-img text-xl group-hover/item:scale-125 transition-transform duration-300" />
        </button>
        <!-- Tooltip -->
        <div v-if="hoveredIndex === 'nav-right-' + idx" class="navbar-tooltip">
          {{ item.label }}
        </div>
      </div>
      <div class="w-px h-8 bg-gray-200 mx-2"></div>
      <!-- 主题切换 -->
      <div class="group/item relative" @mouseenter="hoveredIndex = 'theme'; isAnyHovered = true" @mouseleave="hoveredIndex = null; isAnyHovered = false">
        <button class="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 focus:outline-none" aria-label="Theme">
          <component :is="isDark ? IconSun : IconMoon" class="navbar-icon-img text-xl group-hover/item:scale-125 transition-transform duration-300" />
        </button>
        <div v-if="hoveredIndex === 'theme'" class="navbar-tooltip">
          适配中...
        </div>
      </div>
    </div>
  </div>
  <a-modal v-model:visible="passwordVisible" title="请输入访问密码" :closable="true" :mask-closable="false" @ok="handlePasswordOk" @close="handlePasswordClose">
    <a-input-password v-model="password" placeholder="请输入密码" @pressEnter="handlePasswordOk" />
    <template #footer>
      <a-button @click="handlePasswordOk" type="primary">确定</a-button>
    </template>
    <div v-if="error" style="color: #f53f3f; margin-top: 8px;">密码错误，请重试。</div>
  </a-modal>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IconHome, IconFolderDelete, IconDesktop, IconBarChart, IconPalette, IconMoon, IconSun } from '@arco-design/web-vue/es/icon';
import homeIcon from '@/assets/主页.png'
import projectIcon from '@/assets/作品集.png'
import dataIcon from '@/assets/大数据系统.png'
import dbIcon from '@/assets/服务器_数据库_jurassic.png'
import blogIcon from '@/assets/博客.png'
import testIcon from '@/assets/测试.png'
import toolboxIcon from '@/assets/工具箱.png'

const router = useRouter()
const route = useRoute()
const isAnyHovered = ref(false)
const hoveredIndex = ref(null)
const isDark = ref(false)
const passwordVisible = ref(false)
const password = ref('')
const error = ref(false)
const showPasswordModalOnRoute = ref(false)

const navbarLeft = [
  { icon: homeIcon, label: '主页' },
  { icon: projectIcon, label: '作品集' },
];
const navbarRight = [
  { icon: toolboxIcon, label: '工具箱' },
  { icon: blogIcon, label: '博客' },
  { icon: dataIcon, label: '数据求索' },
  { icon: dbIcon, label: '数据库' },
  { icon: testIcon, label: '测试' },
];

function handleNavRightClick(idx) {
  if (idx === 0) router.push('/toolbox')
  else if (idx === 1) router.push('/blog')
  else if (idx === 2) {
    // 数据求索：检查登录状态
    const token = localStorage.getItem('token')
    if (token) {
      // 已登录，直接跳转到数据大屏
      router.push('/livedata/main/dashboard')
    } else {
      // 未登录，显示密码弹窗并跳转到登录页
      showPasswordModalOnRoute.value = true
      router.push('/livedata')
    }
  }
  else if (idx === 3) router.push('/database')
  else if (idx === 4) router.push('/test')
}

function handlePasswordOk() {
  if (password.value === '1005') {
    passwordVisible.value = false
    error.value = false
    password.value = ''
    router.push('/livedata')
  } else {
    error.value = true
  }
}
function handlePasswordClose() {
  password.value = ''
  error.value = false
}

watch(
  () => route.path,
  (val) => {
    if (val === '/livedata' && showPasswordModalOnRoute.value) {
      passwordVisible.value = true
      showPasswordModalOnRoute.value = false
    }
  }
)

// const isDark = ref(false)
// function setTheme(dark) {
//   isDark.value = dark
//   if (dark) {
//     document.body.classList.add('dark')
//   } else {
//     document.body.classList.remove('dark')
//   }
// }
// function toggleTheme() {
//   setTheme(!isDark.value)
//   localStorage.setItem('custom-theme', isDark.value ? 'dark' : 'light')
// }
// onMounted(() => {
//   const saved = localStorage.getItem('custom-theme')
//   if (saved === 'dark') {
//     setTheme(true)
//   } else if (saved === 'light') {
//     setTheme(false)
//   } else {
//     const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
//     setTheme(prefersDark)
//   }
// })
</script>

<style scoped>
.navbar-icon-img {
  max-width: 22px;
  max-height: 22px;
  display: block;
  margin: 0 auto;
}

.navbar-tooltip {
  position: absolute;
  left: 50%;
  top: -38px;
  transform: translateX(-50%);
  background: #161616;
  color: #fff;
  font-size: 0.95rem;
  white-space: nowrap;
  padding: 4px 14px;
  z-index: 20;
  opacity: 1;
  pointer-events: none;
  box-shadow: 0 2px 8px #0002;
  transition: opacity 0.2s;
}
</style>