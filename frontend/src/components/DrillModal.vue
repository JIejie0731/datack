<template>
  <a-modal
    v-model:visible="visible"
    :title="false"
    :width="width"
    :closable="false"
    :footer="false"
    @close="onModalClose"
    :body-style="{ height: height, position: 'relative', padding: 0, display: 'flex', flexDirection: 'column' }"
  >
    <!-- 标题区 -->
    <div class="drill-modal-header">
      <span class="drill-modal-title">{{ title }}</span>
      <a-button class="drill-modal-close" shape="circle" size="mini" @click="onModalClose" type="text">✕</a-button>
    </div>
    <!-- 内容区 -->
    <div class="drill-modal-content">
      <div class="el-table-wrapper">
        <el-table
          :data="pagedData"
          row-key="id"
          border
          style="width: 100%; height: 100%;"
          :row-class-name="() => 'drill-table-row'"
          :header-row-class-name="'drill-table-header-row'"
          :resizable="true"
          :fit="true"
          table-layout="auto"
        >
          <el-table-column
            v-for="col in columns"
            :key="col.prop"
            :prop="col.prop"
            :label="col.label"
            :show-overflow-tooltip="true"
            sortable
            :filters="col.filters || getFilters(col.prop)"
            :filter-method="col.filterMethod || getFilterMethod(col.prop)"
            min-width="100"
          />
        </el-table>
      </div>
    </div>
    <!-- 功能区 -->
    <div class="drill-footer-flex">
      <span class="footer-count">共 {{ data.length }} 条数据</span>
      <el-button type="primary" size="small" style="min-width: 64px;" @click="exportExcel">导出为Excel</el-button>
      <el-pagination
        :total="data.length"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="sizes, prev, pager, next, jumper"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </a-modal>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed } from 'vue'
import { ElTable, ElTableColumn, ElPagination, ElButton } from 'element-plus'
import * as XLSX from 'xlsx'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '下钻数据' },
  width: { type: [String, Number], default: '80%' },
  height: { type: [String, Number], default: '65vh' },
  closable: { type: Boolean, default: true },
  data: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue', 'close'])

const visible = ref(props.modelValue)
watch(() => props.modelValue, val => visible.value = val)
watch(visible, val => emit('update:modelValue', val))

const pageSize = ref(10)
const currentPage = ref(1)

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return props.data.slice(start, end).map((row, idx) => ({
    ...row,
    id: row.id ?? `row-${currentPage.value}-${idx}`
  }))
})

function handlePageChange(val) {
  currentPage.value = val
}
function handleSizeChange(val) {
  pageSize.value = val
  currentPage.value = 1
}
function exportExcel() {
  const data = props.data.map(row =>
    props.columns.reduce((acc, col) => {
      acc[col.label] = row[col.prop]
      return acc
    }, {})
  )
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, '下钻数据.xlsx')
}
function onModalClose() {
  visible.value = false
  emit('update:modelValue', false)
  emit('close')
}

// 生成唯一值筛选项
function getFilters(prop) {
  const values = Array.from(new Set(props.data.map(row => row[prop]))).filter(v => v !== undefined && v !== null)
  return values.length > 0 ? values.map(v => ({ text: String(v), value: v })) : []
}
// 筛选方法
function getFilterMethod(prop) {
  return (value, row) => row[prop] === value
}
</script>

<style scoped>
.drill-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  font-size: 1.18rem;
  font-weight: bold;
  background: #fff;
  box-sizing: border-box;
  padding: 0 16px;
}
.drill-modal-title {
  color: #222;
}
.drill-modal-close {
  color: #888;
  font-size: 1.1rem;
  border: none;
  background: none;
  cursor: pointer;
}
.drill-modal-content {
  flex: 1 1 auto;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  padding: 0px 16px;
  background: #fafcff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.el-table-wrapper {
  flex: 1 1 auto;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.el-table {
  flex: 1 1 auto;
  height: 100% !important;
  min-height: 0 !important;
  max-height: none !important;
}
.drill-table-row {
  height: calc((100% - 40px) / 10) !important;
}
.drill-table-header-row {
  height: 40px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.drill-footer-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  height: 48px;
  min-height: 48px;
  box-sizing: border-box;
  padding: 0 16px;
}
.footer-count {
  flex: 1;
  text-align: left;
}
.drill-footer-flex > .el-button {
  flex: 1;
  display: flex;
  justify-content: center;
}
.drill-footer-flex > .el-pagination {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
::v-deep(.el-table th .cell) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
::v-deep(.el-table td .cell) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style> 