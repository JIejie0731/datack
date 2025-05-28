<template>
    <img
      class="icon-title-bar-img"
      :src="imgSrc"
      :style="{
        width: width,
        height: height,
        marginRight: marginRight
      }"
      alt="icon"
    />
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import imgSrc from '@/assets/运输车辆管理.png'
  defineProps({
    width: { type: String, default: '18px' },
    height: { type: String, default: '18px' },
    marginRight: { type: String, default: '6px' }
  })
  </script>
  
  <style scoped>
  .icon-title-bar-img {
    display: inline-block;
    vertical-align: middle;
  }
  </style> 