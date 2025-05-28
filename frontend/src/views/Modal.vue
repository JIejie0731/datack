<template>
    <div v-if="visible" class="modal-mask" @click.self="close">
      <div class="modal-container">
        <div class="modal-header">
          <span>{{ title }}</span>
          <button class="modal-close" @click="close">×</button>
        </div>
        <div class="modal-content">
          <a-table
            :columns="columns"
            :data="pagedData"
            :pagination="false"
            size="medium"
            :scroll="{ x: 'max-content', y: '100%' }"
            bordered
            class="modal-table"
            resizable
          />
        </div>
  
        <div class="modal-footer">
          <div class="modal-footer-bar">
            <span class="data-count">共 {{ data.length }} 条数据</span>
            <a-pagination
              :total="data.length"
              :page-size="pageSize"
              :page-size-options="[10, 20, 50, 100]"
              v-model:current="current"
              v-model:page-size="pageSize"
              size="small"
              class="custom-pagination"
              show-jumper
              show-page-size
          
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, computed, watch } from 'vue'
  import { Table as ATable, Pagination as APagination } from '@arco-design/web-vue'
  
  const props = defineProps({
    visible: Boolean,
    title: { type: String, default: '信息' },
    columns: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] },
    defaultPageSize: { type: Number, default: 10 }
  })
  const emit = defineEmits(['update:visible'])
  
  function close() {
    emit('update:visible', false)
  }
  
  const current = ref(1)
  const pageSize = ref(props.defaultPageSize)
  
  watch(() => props.visible, (val) => {
    if (val) {
      current.value = 1
      pageSize.value = props.defaultPageSize
    }
  })
  
  const pagedData = computed(() => {
    const start = (current.value - 1) * pageSize.value
    const end = start + pageSize.value
    return props.data.slice(start, end)
  })
  </script>
  
  <style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s;
  }
  
  .modal-container {
    background: #fff;
    border-radius: 12px;
    width: 80%;
    height: 65%;
    max-height: 80vh;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    display: flex;
    flex-direction: column;
    animation: popIn 0.2s;
    overflow: hidden;
    position: relative;
  }
  
  .modal-header {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 24px;
    font-size: 20px;
    font-weight: 600;
    color: #2257f4;
    border-bottom: 1px solid #f0f0f0;
    background: #f7faff;
  }
  
  .modal-close {
    font-size: 24px;
    line-height: 1;
    color: #666;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-close:hover {
    color: #2257f4;
  }
  
  .modal-content {
    flex: 1 1 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 0 8px;
  }
  
  .modal-table {
    flex: 1 1 auto;
    min-height: 0;
  }
  
  .modal-footer {
    flex: 0 0 auto;
    padding: 0;
    background: #f7faff;
    border-top: 1px solid #f0f0f0;
  }
  
  .modal-footer-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    border: 1px solid #f42020;
  }
  
  .data-count {
    padding-top: 5px;
    color: #888;
    font-size: 14px;
  }
  
  .custom-pagination {
    margin: 0;
    padding: 0;
  }
  
  
  
  
  
  /* 表格样式调整 */
  :deep(.arco-table-container) {
    border: none;
  }
  
  :deep(.arco-table-header) {
    background-color: #f7faff;
  }
  
  :deep(.arco-table-th) {
    white-space: nowrap;
    text-overflow: clip;
    overflow: visible;
    border: 1px solid #222 !important;
    text-align: left !important;
    font-weight: 600;
  }
  
  :deep(.arco-table-td) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border: 1px solid #222 !important;
    text-align: left !important;
  }
  
  :deep(.arco-table-header-cell-resizable-handle) {
    background-color: #222;
    width: 2px;
  }
  
  /* 滚动条样式 */
  :deep(.arco-table-body::-webkit-scrollbar) {
    height: 8px;
  }
  
  :deep(.arco-table-body::-webkit-scrollbar-track) {
    background: #f1f1f1;
  }
  
  :deep(.arco-table-body::-webkit-scrollbar-thumb) {
    background: #c1c1c1;
    border-radius: 4px;
  }
  
  :deep(.arco-table-body::-webkit-scrollbar-thumb:hover) {
    background: #a8a8a8;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes popIn {
    from { transform: scale(0.95); }
    to { transform: scale(1); }
  }
  
  /* 响应式调整 */
  @media (max-height: 600px) {
    .modal-container {
      max-height: 90vh;
      height: 85%;
    }
  }
  
  @media (max-width: 480px) {
    .modal-container {
      width: 95%;
      height: 70%;
    }
    
    .modal-footer-bar {
      flex-direction: column;
      align-items: stretch;
    }
    
    .data-count {
      margin-bottom: 8px;
    }
  }
  </style> 