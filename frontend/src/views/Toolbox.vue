<template>
  <Header />
  <div class="toolbox-root">
    <h1 class="toolbox-title">工具箱</h1>
    <div class="toolbox-content">
      <!-- 这里可以放置各种工具组件 -->
      <p>这里是工具箱页面，后续可添加各种实用工具。</p>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/公共导航栏组件/Header.vue'
</script>

<style scoped>
.toolbox-root {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 80vh;
}
.toolbox-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: left;
}
.toolbox-content {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px #0001;
  padding: 2rem;
  min-height: 300px;
}
</style> 