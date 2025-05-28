<template>
  <header class="header-root">
    <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <div class="flex flex-row items-center bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200 transition-all duration-300 group pointer-events-auto"
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
            @click="idx === 0 ? router.push('/livedata') : (idx === 1 ? router.push('/database') : (idx === 2 ? router.push('/blog') : (idx === 3 ? router.push('/test') : null)))"
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
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { IconHome, IconFolderDelete, IconDesktop, IconBarChart, IconPalette, IconMoon, IconSun } from '@arco-design/web-vue/es/icon';
import homeIcon from '../assets/主页.png'
import projectIcon from '../assets/作品集.png'
import dataIcon from '../assets/大数据系统.png'
import dbIcon from '../assets/服务器_数据库_jurassic.png'
import blogIcon from '../assets/博客.png'
import testIcon from '../assets/测试.png'

const router = useRouter()
const isAnyHovered = ref(false)
const hoveredIndex = ref(null)
const isDark = ref(false)

const navbarLeft = [
  { icon: homeIcon, label: '主页' },
  { icon: projectIcon, label: '作品集' },
];
const navbarRight = [
  { icon: dataIcon, label: '数据求索' },
  { icon: dbIcon, label: '数据库' },
  { icon: blogIcon, label: '博客' },
  { icon: testIcon, label: '测试' },
];

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

/* 固定Header高度 */
.header-root {
  height: 64px;
  min-height: 64px;
  max-height: 64px;
  box-sizing: border-box;
}
</style>