<template>
  <DrillModal v-model="showDrill" title="下钻示例" :data="pagedData">
    <div class="el-table-wrapper">
      <el-table
        :data="pagedData"
        row-key="id"
        border
        style="width: 100%; height: 100%;"
        :row-class-name="() => 'drill-table-row'"
        :header-row-class-name="'drill-table-header-row'"
        :resizable="true"
      >
        <el-table-column
          v-for="col in columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :min-width="col.minWidth"
          :show-overflow-tooltip="true"
        />
      </el-table>
    </div>
    <template #footer>
      <div class="drill-footer-flex">
        <span class="footer-count">共 {{ drillData.length }} 条数据</span>
        <el-button type="primary" size="small" style="min-width: 64px;" @click="exportExcel">导出</el-button>
        <el-pagination
          :total="drillData.length"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          layout="sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </template>
  </DrillModal>
  <a-layout-header class="livedata-header">
    <div class="livedata-logo">数据求索</div>
    <div class="header-icons-group">
      <el-button class="header-icon-btn" circle size="large" @click="goHome">
        <el-icon><House /></el-icon>
      </el-button>
      <el-button class="header-icon-btn" circle size="large" @click="goProfile">
        <el-icon><UserIcon /></el-icon>
      </el-button>
      <el-button class="header-icon-btn" circle size="large" @click="toggleFullScreen">
        <el-icon><component :is="isFullScreen ? Close : FullScreen" /></el-icon>
      </el-button>
    </div>
  </a-layout-header>
  <a-layout class="livedata-layout">
    <a-layout-sider
      class="livedata-sider"
      :width="150"
      :collapsed-width="56"
      :collapsed="collapsed"
      collapsible
      style="position: fixed; top: 56px; left: 0; height: calc(100vh - 56px); z-index: 99;"
      :trigger="null"
    >
      <a-menu
        :default-selected-keys="[selectedMenuKey]"
        :style="{height: '100%', borderRight: 0}"
        @menu-item-click="handleMenuClick"
        :collapsed="collapsed"
      >
        <a-menu-item key="dashboard">
          <el-icon><MenuIcon /></el-icon>
          <span class="menu-text" v-show="!collapsed">数据大屏</span>
        </a-menu-item>
        <a-menu-item key="query">
          <el-icon><Search /></el-icon>
          <span class="menu-text" v-show="!collapsed">数据查询</span>
        </a-menu-item>
        <a-menu-item key="manage">
          <el-icon><Document /></el-icon>
          <span class="menu-text" v-show="!collapsed">数据管理</span>
        </a-menu-item>
        <a-menu-item key="mapping">
          <el-icon><LinkIcon /></el-icon>
          <span class="menu-text" v-show="!collapsed">数据映射</span>
        </a-menu-item>
        <a-menu-item key="upload">
          <el-icon><UploadFilled /></el-icon>
          <span class="menu-text" v-show="!collapsed">数据上传</span>
        </a-menu-item>
        <a-menu-item key="profile">
          <el-icon><UserFilled /></el-icon>
          <span class="menu-text" v-show="!collapsed">个人中心</span>
        </a-menu-item>
      </a-menu>
      <el-button
        class="sider-toggle-btn"
        circle
        size="large"
        @click="toggleSider"
        style="position: absolute; left: 50%; bottom: 24px; transform: translateX(-50%); z-index: 120; background: #fff; box-shadow: 0 2px 8px #0001;"
      >
        <el-icon>
          <component :is="collapsed ? ArrowRight : ArrowLeft" />
        </el-icon>
      </el-button>
    </a-layout-sider>
    <a-layout-content
      class="livedata-content"
      :style="{ marginLeft: collapsed ? '56px' : '150px', marginTop: '56px', minHeight: 'calc(100vh - 56px)' }"
    >
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
// 引入Arco Design Vue组件
import { Layout as ALayout, LayoutHeader as ALayoutHeader, LayoutSider as ALayoutSider, LayoutContent as ALayoutContent, Menu as AMenu, MenuItem as AMenuItem } from '@arco-design/web-vue'
import { ref, computed, h, onMounted } from 'vue'
import { Modal as AModal, InputPassword as AInputPassword, Button as AButton } from '@arco-design/web-vue'
import { useRouter, useRoute } from 'vue-router'
import DrillModal from '@/components/下钻组件/DrillModal.vue'
import { ElTable, ElTableColumn, ElPagination, ElButton } from 'element-plus'
import * as XLSX from 'xlsx'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { Menu as MenuIcon, Search, Document, Link as LinkIcon, UploadFilled, UserFilled } from '@element-plus/icons-vue'
import { FullScreen, Close, House, User as UserIcon } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const showDrill = ref(false)
const pageSize = ref(10)
const currentPage = ref(1)
const collapsed = ref(false)
const isFullScreen = ref(false)

// 路由 path 到菜单 key 的映射
const menuKeyMap = {
  '/livedata/main/dashboard': 'dashboard',
  '/livedata/main/query': 'query',
  '/livedata/main/manage': 'manage',
  '/livedata/main/mapping': 'mapping',
  '/livedata/main/upload': 'upload',
  '/livedata/main/profile': 'profile'
}
const selectedMenuKey = computed(() => menuKeyMap[route.path] || 'dashboard')

function handleMenuClick(key) {
  if (key === 'dashboard') {
    router.push('/livedata/main/dashboard')
  } else if (key === 'manage') {
    router.push('/livedata/main/manage')
  } else if (key === 'mapping') {
    router.push('/livedata/main/mapping')
  } else if (key === 'query') {
    router.push('/livedata/main/query')
  } else if (key === 'upload') {
    router.push('/livedata/main/upload')
  } else if (key === 'profile') {
    router.push('/livedata/main/profile')
  }
  // 其它菜单项可按需跳转
}

function toggleSider() {
  collapsed.value = !collapsed.value
}

function goHome() {
  router.push('/')
}

function goProfile() {
  router.push('/profile')
}

function toggleFullScreen() {
  if (!isFullScreen.value) {
    const el = document.documentElement
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.webkitRequestFullScreen) {
      el.webkitRequestFullScreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    }
    isFullScreen.value = true
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    isFullScreen.value = false
  }
}

document.addEventListener('fullscreenchange', () => {
  isFullScreen.value = !!document.fullscreenElement
})

const authed = ref(true) // 直接允许访问，无需密码

onMounted(() => {
  // 先移除一次
  const removeTrigger = () => {
    const triggers = document.querySelectorAll('.arco-layout-sider-trigger')
    triggers.forEach(el => el.parentNode && el.parentNode.removeChild(el))
  }
  removeTrigger()
  // 监听 DOM 变化，发现有 trigger 就移除
  const observer = new MutationObserver(removeTrigger)
  observer.observe(document.body, { childList: true, subtree: true })
})
</script>

<style scoped>
.livedata-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: auto;
  height: 56px;
  z-index: 100;
  background: #fff;
  color: #232b3a;
  font-size: 1.3rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-left: 32px;
  box-shadow: 0 2px 8px #0001;
  border-top: 0.8px solid #e0e0e0;
  border-bottom: 0.8px solid #e0e0e0;
}
.livedata-sider {
  position: fixed !important;
  top: 56px !important;
  left: 0;
  height: calc(100vh - 56px) !important;
  min-height: calc(100vh - 56px) !important;
  z-index: 99;
  color: #fff;
  overflow: hidden !important;
}
.livedata-layout {
  min-height: 100vh;
  /* 不要设置height: 100vh; 不要flex布局 */
}
.livedata-content {
  padding: 32px 40px;
  background: #f2f3f5;
  box-sizing: border-box;
  margin-left: 150px;
  margin-top: 56px;
  min-height: calc(100vh - 56px);
  /* 其它样式保持不变 */
}
.livedata-welcome {
  background: #fff;
  border-radius: 10px;
  padding: 48px 32px;
  box-shadow: 0 2px 16px #00eaff11;
  text-align: center;
}
.livedata-welcome h2 {
  color: #232b3a;
  font-size: 2rem;
  margin-bottom: 18px;
}
.livedata-welcome p {
  color: #888;
  font-size: 1.1rem;
}
.el-table-wrapper {
  height: calc(100% - 56px); /* 56px为footer高度 */
  display: flex;
  flex-direction: column;
}
.el-table {
  flex: 1 1 0;
  height: 100%;
}
.drill-table-row {
  height: calc((100% - 40px) / 10) !important;
}
.drill-table-header-row {
  height: 40px !important;
}
.drill-footer-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
}
.footer-count {
  flex: 1;
  text-align: left;
}
.drill-footer-flex > .el-button {
  flex: 1;
  display: flex;
  justify-content: center;
}
.drill-footer-flex > .el-pagination {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.livedata-logo {
  font-size: 1.25rem;
  letter-spacing: 2px;
  color: #232b3a;
  display: inline-block;
}
.header-icons-group {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 14px;
  z-index: 20;
}
.header-icon-btn {
  background: #f4f8ff !important;
  border: none !important;
  color: #232b3a !important;
  box-shadow: none !important;
  outline: none !important;
  vertical-align: middle;
  transition: background 0.2s, color 0.2s;
}
.header-icon-btn:hover {
  background: #e6f0ff !important;
  color: #4e7fff !important;
}
/* 菜单图标与文字对齐优化 */
.arco-menu-item .el-icon {
  vertical-align: middle;
  margin-right: 8px;
  font-size: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.arco-menu-item {
  display: flex;
  align-items: center;
}
.arco-layout-sider-trigger {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  min-height: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  background: none !important;
  box-shadow: none !important;
  position: absolute !important;
  left: -9999px !important;
  top: -9999px !important;
  pointer-events: none !important;
  opacity: 0 !important;
  z-index: -1 !important;
}
.arco-layout-sider {
  padding-bottom: 0 !important;
}
.arco-menu {
  height: 100% !important;
  overflow: auto !important;
}
/* 全局建议：可加到 main.css 或 App.vue 的 <style> 中 */
html, body, #app {
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  overflow-x: hidden;
}
.sider-toggle-btn {
  border: none !important;
  color: #232b3a !important;
  box-shadow: 0 2px 8px #0001 !important;
  outline: none !important;
  background: #fff !important;
  transition: background 0.2s, color 0.2s;
}
.sider-toggle-btn:hover {
  background: #e6f0ff !important;
  color: #4e7fff !important;
}
.livedata-sider[aria-collapsed="true"] .menu-text {
  display: none !important;
}
</style> 