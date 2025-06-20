<template>
  <div class="login-bg">
    <div class="login-header"><Header /></div>
    <div class="login-card">
      <h2 class="login-title">数据求索 · 飞书登录</h2>
      <button class="feishu-login-btn" @click="feishuLogin">
        使用飞书账号登录
      </button>
      <div class="login-tip">企业级数据安全 · 一键扫码登录</div>
    </div>
  </div>
</template>

<script setup>
import Header from '../../components/公共导航栏组件/Header.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function feishuLogin() {
  window.location.href = 'http://localhost:3001/api/feishu-auth/login'
}
onMounted(() => {
  const url = new URL(window.location.href)
  const token = url.searchParams.get('token')
  if (token) {
    localStorage.setItem('token', token)
    router.push('/livedata/main/dashboard')
  }
})
</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #e3eeff 0%, #f7faff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.login-header {
  width: 100%;
  margin-bottom: 32px;
}
.login-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px #004dff22;
  padding: 48px 36px 36px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
}
.login-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2257f4;
  margin-bottom: 32px;
  letter-spacing: 2px;
}
.feishu-login-btn {
  --c: #fff;
  background: linear-gradient(90deg, #0000 33%, #fff5, #0000 67%) var(--_p,100%)/300% no-repeat, #004dff;
  color: #0000;
  border: none;
  transform: perspective(500px) rotateY(calc(20deg*var(--_i,-1)));
  text-shadow: calc(var(--_i,-1)* 0.08em) -.01em 0   var(--c),
    calc(var(--_i,-1)*-0.08em)  .01em 2px #0004;
  outline-offset: .1em;
  transition: 0.3s;
  font-family: system-ui, sans-serif;
  font-weight: bold;
  font-size: 1.3rem;
  margin: 0;
  cursor: pointer;
  padding: .6em 1.2em .6em 1.2em;
  width: 100%;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
.feishu-login-btn:hover,
.feishu-login-btn:focus-visible {
  --_p: 0%;
  --_i: 1;
}
.feishu-login-btn:active {
  text-shadow: none;
  color: var(--c);
  box-shadow: inset 0 0 9e9q #0005;
  transition: 0s;
}
.login-tip {
  color: #888;
  font-size: 15px;
  margin-top: 6px;
  letter-spacing: 1px;
}
</style> 