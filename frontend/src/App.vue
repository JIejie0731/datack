<script setup>

</script>

<template>
  <div>


    <!-- 原有路由视图容器 -->
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<style>
.amap-marker-label {
  color: #fff !important;
  background: #8d4fff !important;
  border-radius: 6px !important;
  padding: 4px 14px !important;
  font-size: 15px !important;
  font-weight: bold !important;
  border: 1.5px solid #fff !important;
  box-shadow: 0 2px 8px #8d4fff44 !important;
  white-space: nowrap !important;
  pointer-events: none !important;
  z-index: 9999 !important;
  opacity: 0.98 !important;
}
</style>
