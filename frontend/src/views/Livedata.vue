<template>
  <a-modal v-model:visible="visible" title="请输入访问密码" :closable="true" :mask-closable="false" @ok="handleOk" @close="handleClose">
    <a-input-password v-model="password" placeholder="请输入密码" @pressEnter="handleOk" />
    <template #footer>
      <a-button @click="handleOk" type="primary">确定</a-button>
    </template>
    <div v-if="error" style="color: #f53f3f; margin-top: 8px;">密码错误，请重试。</div>
  </a-modal>
  <div v-if="authed">
    <a-layout class="livedata-layout">
      <a-layout-header class="livedata-header">
        <div class="livedata-logo">数据求索后台</div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider class="livedata-sider" width="200">
          <a-menu :default-selected-keys="['overview']" :style="{height: '100%', borderRight: 0}">
            <a-menu-item key="overview">数据总览</a-menu-item>
            <a-menu-item key="analysis">数据分析</a-menu-item>
            <a-menu-item key="manage">数据管理</a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content class="livedata-content">
          <div class="livedata-welcome">
            <h2>欢迎使用数据求索后台管理系统</h2>
            <p>请选择左侧菜单进行数据操作与分析。</p>
          </div>
          <!-- 这里预留后续功能插槽 -->
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup>
// 引入Arco Design Vue组件
import { Layout as ALayout, LayoutHeader as ALayoutHeader, LayoutSider as ALayoutSider, LayoutContent as ALayoutContent, Menu as AMenu, MenuItem as AMenuItem } from '@arco-design/web-vue'
import { ref } from 'vue'
import { Modal as AModal, InputPassword as AInputPassword, Button as AButton } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

const visible = ref(true)
const password = ref('')
const error = ref(false)
const authed = ref(false)
const router = useRouter()

function handleOk() {
  if (password.value === '1005') {
    visible.value = false
    error.value = false
    authed.value = true
  } else {
    error.value = true
  }
}

function handleClose() {
  password.value = ''
  error.value = false
  if (!authed.value) {
    router.push('/')
  }
}
</script>

<style scoped>
.livedata-layout {
  min-height: 100vh;
}
.livedata-header {
  background: #232b3a;
  color: #00eaff;
  font-size: 1.3rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-left: 32px;
  height: 56px;
}
.livedata-logo {
  font-size: 1.25rem;
  letter-spacing: 2px;
  color: #00eaff;
}
.livedata-sider {
  background: #1a2233;
  color: #fff;
}
.livedata-content {
  padding: 36px 48px;
  background: #f7f9fa;
  min-height: 600px;
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
</style> 