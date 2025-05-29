<template>
  <div style="padding: 40px; text-align: center;">
    <h2>数据库连接测试</h2>
    <div style="margin-top: 32px;">
      <span :style="{
        display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', marginRight: '8px',
        background: dbStatus === 'connected' ? '#00d26a' : (dbStatus === 'checking' ? '#ffb300' : '#ff3b3b')
      }"></span>
      <span>
        {{ dbStatus === 'connected' ? '连接成功' : (dbStatus === 'checking' ? '检测中...' : '连接失败') }}
      </span>
    </div>
    <button @click="checkDb" style="margin-top: 24px; padding: 8px 24px;">重新检测</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dbStatus = ref('checking');

async function checkDb() {
  dbStatus.value = 'checking';
  try {
    const res = await fetch('/api/db-status');
    const data = await res.json();
    dbStatus.value = data.status === 'connected' ? 'connected' : 'error';
  } catch (e) {
    dbStatus.value = 'error';
  }
}

checkDb();
</script>

<style scoped>
button {
  background: #2257f4;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #1a3fa0;
}
</style>