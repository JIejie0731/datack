<template>
  <nav class="card-navbar">
    <div class="card-logo">LOGO</div>
    <div class="card-menu">
      <span class="card-nav-item active">首页</span>
      <span class="card-nav-item">项目</span>
      <span class="card-nav-item">系统</span>
    </div>
  </nav>
  <div class="home-container">
    <h1>欢迎来到健康数据大屏</h1>
    <p>本系统可实时监控和展示各类健康指标。</p>
    <router-link to="/dashboard">
      <button class="go-dashboard-btn">进入大屏</button>
    </router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.card-navbar {
  width: 100%;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  padding: 0 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.card-logo {
  font-weight: bold;
  font-size: 1.5rem;
  letter-spacing: 2px;
  color: #3b5cff;
  background: #fff;
  border-radius: 14px;
  padding: 8px 28px;
  box-shadow: 0 2px 12px #3b5cff22;
  border: 2px solid #e0e7ff;
}
.card-menu {
  display: flex;
  gap: 28px;
}
.card-nav-item {
  font-size: 1.1rem;
  color: #3b5cff;
  background: #fff;
  border-radius: 12px;
  padding: 8px 32px;
  box-shadow: 0 2px 12px #3b5cff22;
  border: 2px solid #e0e7ff;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  position: relative;
}
.card-nav-item.active,
.card-nav-item:hover {
  background: #3b5cff;
  color: #fff;
  box-shadow: 0 4px 16px #3b5cff44;
  border-color: #3b5cff;
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