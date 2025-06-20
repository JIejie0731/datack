<template>
  <Header />
  <a-modal v-model:visible="visible" title="请输入访问密码" :closable="true" :mask-closable="false" @ok="handleOk" @close="handleClose">
    <a-input-password v-model="password" placeholder="请输入密码" @pressEnter="handleOk" />
    <template #footer>
      <a-button @click="handleOk" type="primary">确定</a-button>
    </template>
    <div v-if="error" style="color: #f53f3f; margin-top: 8px;">密码错误，请重试。</div>
  </a-modal>
  <div v-if="authed" class="database-main">
    <div class="database-header">
      <div class="database-actions">
        <span
          class="db-type"
          :class="dbConnected ? 'db-type-success' : 'db-type-fail'"
          @mouseenter="showDbTooltip = true"
          @mouseleave="showDbTooltip = false"
        >PGSQL</span>
        <span v-if="showDbTooltip" class="db-tooltip">
          {{ dbConnected ? '数据库连接成功' : '数据库连接失败' }}
        </span>
        <div class="btn-group">
          <a-button type="primary" size="small" class="db-action-btn" @click="onQuery" :loading="loading">查询</a-button>
          <a-button size="small" class="db-action-btn" @click="onExport">导出</a-button>
        </div>
      </div>
    </div>
    <div class="database-content">
      <div class="db-panel">
        <MonacoEditor
          v-model:value="sql"
          language="sql"
          theme="vs"
          :options="{
            fontSize: 16,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbers: 'on',
            fixedOverflowWidgets: true,
            scrollbar: { vertical: 'auto' }
          }"
          style="height: 710px; width: 100%; border-radius: 6px; border: 1px solid #e0e7ff; background: #fff;"
        />
      </div>
      <div class="db-panel">
        <div class="table-scroll-x">
          <a-table
            :columns="columns"
            :data="tableData"
            :pagination="false"
            :scroll="{ x: 'max-content' }"
            size="small"
            column-resizable
            row-class="table-row"
            v-if="columns.length > 0"
          />
          <div v-else class="table-placeholder">暂无数据</div>
        </div>
      </div>
    </div>
    <div class="database-footer">
      <div
        class="db-info"
        :class="errorMsg ? 'db-error' : 'db-count'"
      >
        {{ errorMsg ? errorMsg : `数据量：${total}条` }}
      </div>
      <a-pagination
        :total="total"
        :page-size="pageSize"
        :current="currentPage"
        size="small"
        simple
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup>
import Header from '../components/公共导航栏组件/Header.vue'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { Message } from '@arco-design/web-vue'
import * as XLSX from 'xlsx'
import MonacoEditor from 'monaco-editor-vue3'
import { useRouter, useRoute } from 'vue-router'
import { Modal as AModal, InputPassword as AInputPassword, Button as AButton } from '@arco-design/web-vue'

const router = useRouter()
const route = useRoute()

const keyMap = {
  '/': 'home',
  '/portfolio': 'portfolio',
  '/dashboard': 'dashboard',
  '/database': 'database',
}

const selectedKey = ref(keyMap[route.path] || 'database')

watch(
  () => route.path,
  (val) => {
    selectedKey.value = keyMap[val] || 'database'
  }
)

function onMenuClick(key) {
  if (key === 'home') router.push('/')
  else if (key === 'portfolio') router.push('/portfolio')
  // 暂不处理数据求索跳转
  else if (key === 'database') router.push('/database')
}

// PGSQL连接状态
const dbConnected = ref(false)
const showDbTooltip = ref(false)
let dbTimer = null

const apiBase = import.meta.env.VITE_API_BASE

async function fetchDbStatus() {
  try {
    const res = await axios.get(`${apiBase}/db-status`)
    dbConnected.value = res.data.status === 'connected'
  } catch (e) {
    dbConnected.value = false
  }
}

onMounted(() => {
  fetchDbStatus()
  dbTimer = setInterval(fetchDbStatus, 5000)
})
onUnmounted(() => {
  clearInterval(dbTimer)
})

// SQL查询相关
const sql = ref('SELECT * FROM your_table LIMIT 20')
const tableData = ref([])
const columns = ref([])
const total = ref(0)
const pageSize = ref(20)
const currentPage = ref(1)
const errorMsg = ref('')
const loading = ref(false)

async function onQuery() {
  errorMsg.value = ''
  loading.value = true
  try {
    const res = await axios.post(`${apiBase}/sql-query`, {
      sql: sql.value,
      page: currentPage.value,
      pageSize: pageSize.value
    })
    if (res.data.error) {
      errorMsg.value = res.data.error
      tableData.value = []
      columns.value = []
      total.value = 0
    } else {
      tableData.value = res.data.data || []
      total.value = res.data.total || 0
      // 自动生成表头，设置minWidth
      if (tableData.value.length > 0) {
        columns.value = Object.keys(tableData.value[0]).map(key => ({
          title: key,
          dataIndex: key,
          ellipsis: true,
          minWidth: 120
        }))
      } else {
        columns.value = []
      }
    }
  } catch (e) {
    errorMsg.value = e.response?.data?.error || e.message || '查询失败'
    tableData.value = []
    columns.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

function onPageChange(page) {
  currentPage.value = page
  onQuery()
}

function onExport() {
  if (!tableData.value.length) {
    Message.warning('暂无数据可导出');
    return;
  }
  // 生成表头顺序
  const header = columns.value.map(col => col.title)
  const keys = columns.value.map(col => col.dataIndex)
  // 组装二维数组
  const data = [header, ...tableData.value.map(row => keys.map(k => row[k]))]
  const ws = XLSX.utils.aoa_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, '查询结果.xlsx')
}

const visible = ref(true)
const password = ref('')
const error = ref(false)
const authed = ref(false)

function handleOk() {
  if (password.value === '1005') {
    visible.value = false
    error.value = false
    authed.value = true
  } else {
    error.value = true
  }
}

function handleClose() {
  password.value = ''
  error.value = false
  if (!authed.value) {
    router.push('/')
  }
}
</script>

<style scoped>
.database-main {
  min-height: 100vh;
  background: #f4f7ff;
  display: flex;
  flex-direction: column;
}
.database-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 8px 0 8px;
  min-height: 48px;
  position: relative;
}
.database-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  position: relative;
}
.btn-group {
  display: flex;
  gap: 12px;
}
.db-type {
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 8px;
  transition: color 0.2s;
  cursor: pointer;
}
.db-type-success {
  color: #52c41a;
}
.db-type-fail {
  color: #b0b0b0;
}
.db-tooltip {
  position: absolute;
  left: 0;
  top: 120%;
  background: #222;
  color: #fff;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 0.95rem;
  white-space: nowrap;
  z-index: 100;
  box-shadow: 0 2px 8px #0003;
  pointer-events: none;
  margin-left: 0;
}
.db-action-btn {
  min-width: 56px;
}
.database-content {
  flex: 1;
  display: flex;
  gap: 8px;
  padding: 0 8px;
}
.db-panel {
  flex: 1;
  min-width: 0;
  min-height: 420px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px #0001;
  padding: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.sql-textarea {
  width: 100%;
  border-radius: 6px;
  border: 1px solid #e0e7ff;
  background: #fff;
  font-size: 1.08rem;
  margin-bottom: 0;
}
.sql-textarea.fixed-height {
  height: 710px;
  min-height: 120px;
  max-height: 710px;
  overflow-y: auto;
  resize: none;
}
.table-scroll-x {
  width: 100%;
  min-width: 600px;
  overflow-x: auto;
}
:deep(.arco-table) {
  min-width: 1200px;
}
:deep(.arco-table-th) {
  background: #f4f7ff;
  font-weight: bold;
  color: #333;
  text-align: left;
  border: 1px solid #e0e7ff;
}
:deep(.arco-table-td) {
  text-align: left;
}
:deep(.arco-table-tr:hover) {
  background: #e3edff !important;
}
.table-placeholder {
  color: #b0bec5;
  font-size: 1.1rem;
  text-align: center;
  margin: auto;
}
.database-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 8px 8px;
  margin-top: 8px;
}
.db-count {
  color: #3b5cff;
  font-size: 1.08rem;
}
.db-error {
  color: #ff4d4f;
  font-size: 1.05rem;
  background: #fff0f0;
  border-radius: 8px;
  padding: 8px 24px;
  min-width: 260px;
  margin-left: 0;
}
:deep(.monaco-editor .margin) {
  width: 32px !important;
  min-width: 32px !important;
  max-width: 32px !important;
  padding-left: 0 !important;
  background: #fff;
  border: none !important;
}
:deep(.monaco-editor .margin-view-overlays) {
  left: 0 !important;
}
:deep(.monaco-editor .line-numbers) {
  left: 0 !important;
  padding-left: 0 !important;
  text-align: center !important;
}
:deep(.monaco-editor .monaco-editor-background) {
  border-left: none !important;
  background: #fff;
}
</style> 