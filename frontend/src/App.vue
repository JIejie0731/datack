<template>
  <router-view />
</template>

<script setup>
</script>

<style>
html, body, #app {
  width: 100%;
  min-height: 100vh;

  overflow-x: hidden !important;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  position: relative;
}
#app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
body, #app, .dashboard-grid {
  font-family: 'HarmonyOS_Sans_TC_Medium', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}
</style>
