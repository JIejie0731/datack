<script setup>
import { ref, computed, onMounted } from 'vue'

const status = ref('loading')

const statusText = computed(() => {
  if (status.value === 'connected') return '已连接'
  if (status.value === 'error') return '连接失败'
  return '检测中...'
})

const statusColor = computed(() => {
  if (status.value === 'connected') return 'green'
  if (status.value === 'error') return 'red'
  return 'gray'
})

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3001/api/db-status')
    const data = await res.json()
    status.value = data.status
  } catch {
    status.value = 'error'
  }
})
</script>

<template>
  <div style="padding: 40px; max-width: 500px; margin: auto;">
    <h2>数据库连接状态检测</h2>
    <p>
      当前数据库连接状态：
      <span :style="{ color: statusColor }">{{ statusText }}</span>
    </p>
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 20px;
}
p {
  font-size: 18px;
}
</style>
