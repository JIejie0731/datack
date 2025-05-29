<template>
  <div class="base-card" :data-card-id="cardId" :data-card-name="name">
    <div class="base-card-header">
      <div class="header-left">
        <slot name="header">{{ name }}</slot>
      </div>
      <button class="zoom-btn" @click="openZoom">
        <icon-zoom-in style="font-size:20px;color:#888;" />
      </button>
    </div>
    <div class="base-card-content">
      <slot />
    </div>
    <teleport to="body">
      <div v-if="zoom" class="zoom-mask" @click="closeZoom">
        <div class="zoom-card" @click.stop :data-card-id="cardId" :data-card-name="name">
          <div class="base-card-header">
            <div class="header-left">
              <slot name="header">{{ name }}</slot>
            </div>
            <button class="zoom-btn" @click="closeZoom">
              <icon-zoom-out style="font-size:20px;color:#888;" />
            </button>
          </div>
          <div class="base-card-content">
            <slot />
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { IconZoomIn, IconZoomOut } from '@arco-design/web-vue/es/icon'
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  cardId: {
    type: [String, Number],
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: undefined
  }
})
const emit = defineEmits(['update:zoom'])
const zoom = ref(false)

function openZoom() {
  zoom.value = true
  emit('update:zoom', true)
}
function closeZoom() {
  zoom.value = false
  emit('update:zoom', false)
}
// 支持外部 v-model:zoom 控制
watch(() => props.modelValue, (val) => {
  if (typeof val === 'boolean') zoom.value = val
})
</script>

<style scoped>
.base-card,
.base-card:hover,
.base-card:active,
.base-card:focus {
  transition: none !important;
  box-shadow: none !important;
  transform: none !important;
}
.base-card {
  background: #fff;
  border-radius: 0;
  box-shadow: 0 2px 16px #0001;
  transition: box-shadow 0.2s;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
 
}
.base-card-header {
  padding: 0.3rem 0.3rem 0.3rem 0.6rem;

  border-bottom: 1px solid #f2eeee;
  font-size: 1.15rem;
  font-weight: bold;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  color: #222;
  text-align: left;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.base-card-header h3, .base-card-header .header-left {
  font-size: 1.15rem;
  font-weight: bold;
  font-family: 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  color: #222;
  margin: 0;
  text-align: left;
}
.header-left {
  flex: 1;
}
.zoom-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 0 0 0;
  display: flex;

  align-items: center;
}
.zoom-btn:hover svg {
  color: #3b82f6;
}
.base-card-content {

  flex: 1;
}
.zoom-mask {
  position: fixed;
  inset: 0;
  
  background: rgba(0,0,0,0.7);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zoom-card {
  background: #fff;
  border-radius: 0;
  box-shadow: 0 8px 32px #0008;
  width: 90vw;
  height: 80vh;
  min-width: 320px;
  min-height: 200px;
 
  padding: 20px 30px 40px 30px;
  transform: scale(1.0);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
}
</style> 