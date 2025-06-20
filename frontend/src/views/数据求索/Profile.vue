<template>
  <div class="profile-root">
    <div class="profile-box">
      <img v-if="user && user.avatar" :src="user.avatar" class="profile-avatar" alt="avatar" />
      <div v-else class="profile-avatar profile-avatar-default"></div>
      <div class="profile-name">{{ user ? user.name : '未登录' }}</div>
      <div v-if="user && user.email" class="profile-info">邮箱：{{ user.email }}</div>
      <div v-if="user && user.open_id" class="profile-info">OpenID：{{ user.open_id }}</div>
      <div v-if="user && user.mobile" class="profile-info">手机号：{{ user.mobile }}</div>
      <div v-if="user && user.department" class="profile-info">部门：{{ user.department }}</div>
      <button class="profile-logout" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const user = ref(null)
onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    const res = await axios.get('http://localhost:3001/api/feishu-auth/me', {
      headers: { Authorization: 'Bearer ' + token }
    })
    user.value = res.data
  } catch (e) {
    user.value = null
  }
})
function logout() {
  localStorage.removeItem('token')
  router.replace('/livedata')
}
</script>

<style scoped>
.profile-root {
  min-height: 83vh;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-box {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px #004dff11;
  padding: 48px 36px 36px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 90vw;
}
.profile-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  margin-bottom: 18px;
  object-fit: cover;
  background: linear-gradient(to top, #f1e1c1 0%, #fcbc97 100%);
}
.profile-avatar-default {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #bbb;
}
.profile-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2257f4;
  margin-bottom: 18px;
  letter-spacing: 2px;
}
.profile-info {
  color: #666;
  font-size: 1.05em;
  margin-bottom: 6px;
  word-break: break-all;
}
.profile-logout {
  margin-top: 24px;
  background: #2257f4;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 32px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.profile-logout:hover {
  background: #4e7fff;
}
</style> 