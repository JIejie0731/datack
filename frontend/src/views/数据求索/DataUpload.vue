<template>
  <div class="upload-page">
    <!-- 上部区域 - 标签页 -->
    <div class="top-section">
      <el-tabs v-model="activeTab" class="upload-tabs">
        <el-tab-pane label="数据上传" name="file-upload">
          <template #label>
            <el-icon><Upload /></el-icon>
            <span>数据上传</span>
          </template>
        </el-tab-pane>
        <el-tab-pane label="数据目录" name="manual-input">
          <template #label>
            <el-icon><Edit /></el-icon>
            <span>数据目录</span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    
    <!-- 进度弹框 -->
    <el-dialog v-model="showProgressDialog" width="400px" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" class="progress-dialog-modal">
      <div class="progress-dialog-content">
        <div class="progress-info">
          <span class="progress-status">{{ progressText || '等待上传...' }}</span>
          <span class="progress-percentage">{{ progress }}%</span>
        </div>
        <el-progress 
          :percentage="progress"
          :status="progress === 100 ? 'success' : ''"
          :stroke-width="12"
          :show-text="false"
          :color="progressBarColor"
        />
      </div>
    </el-dialog>

    <!-- 下部区域 - 内容 -->
    <div class="bottom-section">
      <!-- 文件上传页面 -->
      <div v-if="activeTab === 'file-upload'" class="file-upload-content">
        <!-- 上传区域 -->
        <div v-if="!showConfig" class="upload-area">
          <el-upload
            class="upload-demo"
            drag
            action="#"
            :auto-upload="false"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :file-list="fileList"
            accept=".xlsx,.xls,.csv"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <template #tip>
              <div class="el-upload__tip">支持扩展名：.csv, .xlsx, .xls</div>
            </template>
          </el-upload>
          <el-button type="primary" @click="handlePreview" :disabled="fileList.length === 0">
            预览并配置
          </el-button>
        </div>

        <!-- 配置表单区域 -->
        <div v-if="showConfig" class="config-area">
          <div class="config-header">
            <h3>数据配置</h3>
            <el-button @click="showConfig = false">返回</el-button>
          </div>
          
          <!-- 基本信息配置 -->
          <div class="config-section">
            <h4>基本信息</h4>
            <el-form :model="tableConfig" label-width="100px">
              <el-form-item label="表名">
                <el-input v-model="tableConfig.tableName" placeholder="请输入表名（英文）"></el-input>
              </el-form-item>
              <el-form-item label="中文名称">
                <el-input v-model="tableConfig.tableComment" placeholder="请输入表的中文名称"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="tableConfig.description" type="textarea" placeholder="请输入备注信息"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <!-- 数据预览 -->
          <div class="config-section">
            <h4>数据预览</h4>
            <el-table :data="previewData" border style="width: 100%" height="200px">
              <el-table-column
                v-for="(col, index) in columns"
                :key="index"
                :prop="col"
                :label="col"
              />
            </el-table>
          </div>

          <!-- 字段映射配置 -->
          <div class="config-section">
            <h4>字段映射</h4>
            <el-table :data="fieldMappings" border style="width: 100%">
              <el-table-column label="Excel列名" prop="originalName" width="180" />
              <el-table-column label="数据库字段名" width="200">
                <template #default="{ row }">
                  <el-input v-model="row.fieldName" placeholder="请输入字段名（英文）" />
                </template>
              </el-table-column>
              <el-table-column label="字段类型" width="180">
                <template #default="{ row }">
                  <el-select v-model="row.fieldType" placeholder="请选择">
                    <el-option label="VARCHAR" value="VARCHAR" />
                    <el-option label="INT" value="INT" />
                    <el-option label="DECIMAL" value="DECIMAL" />
                    <el-option label="DATETIME" value="DATETIME" />
                    <el-option label="TEXT" value="TEXT" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="长度/精度" width="150">
                <template #default="{ row }">
                  <el-input v-model="row.length" placeholder="长度" v-if="row.fieldType === 'VARCHAR'" />
                  <el-input-number v-model="row.precision" :min="1" :max="20" v-if="row.fieldType === 'DECIMAL'" />
                </template>
              </el-table-column>
              <el-table-column label="描述">
                <template #default="{ row }">
                  <el-input v-model="row.comment" placeholder="请输入字段描述" />
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 操作按钮 -->
          <div class="config-footer">
            <el-button @click="showConfig = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确认创建</el-button>
          </div>
        </div>
      </div>

      <!-- 手工数据输入区域 -->
      <div v-if="activeTab === 'manual-input'" class="manual-input-area">
        <div class="manual-sider">
          <div class="sider-header">
            <span class="sider-title">数据源</span>
            <div class="sider-actions">
              <el-button :icon="FolderAdd" circle size="small" @click="addFolder" title="新建文件夹" />
              <el-button :icon="DocumentAdd" circle size="small" style="margin-left: 6px;" title="新建数据源" />
            </div>
          </div>
          <div class="sider-search-row">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索"
              size="small"
              prefix-icon="Search"
              class="sider-search-input"
            />
            <el-button :icon="Sort" circle size="small" class="sider-sort-btn" style="margin-left: 6px;" title="排序" />
          </div>
          <el-tree
            :data="manualTreeData"
            node-key="id"
            :default-expand-all="true"
            :expand-on-click-node="false"
            highlight-current
            class="manual-tree"
            @node-contextmenu="handleNodeContextMenu"
            draggable
            :allow-drop="allowDrop"
            @node-drop="handleNodeDrop"
          >
            <template #default="{ data }">
              <span v-if="renamingNodeId !== data.id">
                <el-icon v-if="data.icon === 'folder'" style="color:#e6a23c"><Folder /></el-icon>
                <el-icon v-else style="color:#409EFF"><Grid /></el-icon>
                {{ data.label }}
              </span>
              <el-input
                v-else
                v-model="renamingValue"
                size="small"
                class="rename-input"
                style="width: 120px; margin-left: 2px;"
                @blur="handleRenameConfirm(data)"
                @keyup.enter="handleRenameConfirm(data)"
              />
            </template>
          </el-tree>
          <!-- 右键菜单 -->
          <div v-if="showContextMenu" :style="{ position: 'fixed', zIndex: 9999, ...contextMenuStyle }" class="context-menu">
            <ul>
              <li @click="handleRename">重命名</li>
              <li @click="handleDelete">删除</li>
            </ul>
          </div>
        </div>
        <div class="manual-content">
          <div class="content-title">内容区</div>
          <div class="content-placeholder">请在此录入或编辑手工数据...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick, onMounted } from 'vue'
import { ElUpload, ElButton, ElMessage, ElTabs, ElTabPane, ElTable, ElTableColumn, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElInputNumber, ElProgress, ElCard, ElDialog, ElTree, ElMessageBox } from 'element-plus'
import { Upload, Edit, UploadFilled, CircleCheckFilled, CircleCloseFilled, Close, Folder, Grid, FolderAdd, DocumentAdd, Search, Sort } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx'
import axios from 'axios'
import { useRouter } from 'vue-router'
import 'element-plus/dist/index.css'

const router = useRouter()
const activeTab = ref('file-upload')
const fileList = ref([])
const showConfig = ref(false)
const loading = ref(false)
const loadingText = ref('')
const uploadStatus = ref('') // 'success' | 'error' | ''

const progress = ref(0)
const showProgress = ref(false)
const progressStatus = ref('')
const progressText = ref('')
const showProgressDialog = ref(false)

// 表配置信息
const tableConfig = reactive({
  tableName: '',
  tableComment: '',
  description: ''
})

// 预览数据
const previewData = ref([])
const columns = ref([])
const fieldMappings = ref([])

// 手工数据目录树（数据库管理工具风格，支持拖拽分组）
const manualTreeData = ref([
  {
    id: 1,
    label: '未分组',
    icon: 'folder',
    children: []
  }
])

const searchKeyword = ref('')

// 页面加载时获取所有表
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/data-upload/tables')
    // 适配返回的 data 字段
    manualTreeData.value[0].children = (res.data.data || []).map((row, idx) => ({
      id: 1000 + idx,
      label: row.table_name,
      icon: 'table'
    }))
  } catch (e) {
    ElMessage.error('获取表失败')
  }
})

// 进度条颜色
const progressBarColor = computed(() => {
  if (progress.value === 0) return '#909399'  // 灰色
  if (progress.value === 100) return '#67c23a'  // 绿色
  return '#409EFF'  // 蓝色
})

// 状态消息
const statusMessage = computed(() => {
  if (uploadStatus.value === 'success') {
    return '数据上传成功！表已创建并导入完成。'
  } else if (uploadStatus.value === 'error') {
    return '数据上传失败，请检查数据格式后重试。'
  }
  return ''
})

// 重置状态
function resetStatus() {
  progress.value = 0
  showProgress.value = false
  progressStatus.value = ''
  progressText.value = ''
  uploadStatus.value = ''
}

// 更新进度
function updateProgress(step, total = 100) {
  progress.value = Math.round((step / total) * 100)
}

// 监听文件列表变化
watch(fileList, (newVal) => {
  if (newVal.length === 0) {
    // 当文件被移除时，重置进度条状态
    progress.value = 0
    progressText.value = '等待上传...'
    progressStatus.value = ''
  }
})

// 处理文件移除
const handleRemove = () => {
  fileList.value = []
  progress.value = 0
  progressText.value = '等待上传...'
  progressStatus.value = ''
}

// 处理文件变化
const handleChange = async (uploadFile) => {
  if (!uploadFile) {
    handleRemove()
    return
  }
  fileList.value = [uploadFile]
  // 打开进度弹框
  showProgressDialog.value = true
  // 开始读取文件
  progress.value = 30
  progressText.value = '正在读取文件...'
  try {
    const reader = new FileReader()
    reader.onload = async function(e) {
      try {
        progress.value = 60
        progressText.value = '正在解析Excel...'
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
        columns.value = jsonData[0]
        fieldMappings.value = columns.value.map(col => ({
          originalName: col,
          fieldName: col.toLowerCase().replace(/\s+/g, '_'),
          fieldType: 'VARCHAR',
          length: '255',
          precision: 2,
          comment: ''
        }))
        previewData.value = jsonData.slice(1, 6).map(row => {
          const obj = {}
          columns.value.forEach((col, index) => {
            obj[col] = row[index]
          })
          return obj
        })
        progress.value = 100
        progressText.value = 'Excel解析完成'
        // 1秒后自动关闭弹框
        setTimeout(() => { showProgressDialog.value = false }, 1000)
      } catch (err) {
        handleRemove()
        showProgressDialog.value = false
        ElMessage.error('Excel解析失败：' + err.message)
      }
    }
    reader.onerror = () => {
      handleRemove()
      showProgressDialog.value = false
      ElMessage.error('文件读取失败')
    }
    reader.readAsArrayBuffer(uploadFile.raw)
  } catch (err) {
    handleRemove()
    showProgressDialog.value = false
    ElMessage.error('操作失败：' + err.message)
  }
}

// 预览Excel数据
async function handlePreview() {
  if (fileList.value.length === 0) return
  
  loading.value = true
  loadingText.value = '正在解析Excel...'
  
  try {
    const file = fileList.value[0].raw
    const reader = new FileReader()
    
    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
        
        // 获取列名
        columns.value = jsonData[0]
        
        // 生成字段映射配置
        fieldMappings.value = columns.value.map(col => ({
          originalName: col,
          fieldName: col.toLowerCase().replace(/\s+/g, '_'),
          fieldType: 'VARCHAR',
          length: '255',
          precision: 2,
          comment: ''
        }))
        
        // 预览数据（前5行）
        previewData.value = jsonData.slice(1, 6).map(row => {
          const obj = {}
          columns.value.forEach((col, index) => {
            obj[col] = row[index]
          })
          return obj
        })
        
        showConfig.value = true
        loading.value = false
      } catch (err) {
        ElMessage.error('Excel解析失败：' + err.message)
        loading.value = false
      }
    }
    
    reader.readAsArrayBuffer(file)
  } catch (err) {
    ElMessage.error('文件读取失败：' + err.message)
    loading.value = false
  }
}

// 提交配置
async function handleSubmit() {
  if (!tableConfig.tableName) {
    ElMessage.error('请输入表名')
    return
  }
  // 打开进度弹框
  showProgressDialog.value = true
  progress.value = 30
  progressText.value = '正在创建数据表...'
  try {
    progress.value = 60
    progressText.value = '正在导入数据...'
    const response = await axios.post('http://localhost:3001/api/data-upload/create-table', {
      tableConfig,
      fieldMappings: fieldMappings.value,
      data: previewData.value
    })
    if (response.data.success) {
      progress.value = 100
      progressText.value = '数据导入完成！'
      ElMessage({
        message: `数据导入成功！共导入 ${previewData.value.length} 条数据`,
        type: 'success',
        duration: 3000
      })
      setTimeout(() => {
        showConfig.value = false
        fileList.value = []
        showProgressDialog.value = false
      }, 1000)
    } else {
      showProgressDialog.value = false
      throw new Error(response.data.message)
    }
  } catch (err) {
    progressText.value = '数据导入失败'
    showProgressDialog.value = false
    ElMessage({
      message: '数据导入失败：' + err.message,
      type: 'error',
      duration: 5000
    })
  }
}

// 新建文件夹，默认加到根节点
function addFolder() {
  manualTreeData.value.push({
    id: Date.now(),
    label: '新文件夹',
    icon: 'folder',
    children: []
  })
}

// 拖拽分组相关
function allowDrop(draggingNode, dropNode, type) {
  // 只允许拖到文件夹（icon: 'folder'）下
  return dropNode.data.icon === 'folder'
}
function handleNodeDrop(draggingNode, dropNode, dropType, ev) {
  // 拖拽后el-tree会自动更新manualTreeData
  // 可选：保存到localStorage或后端
}

// 右键菜单相关
const showContextMenu = ref(false)
const contextMenuStyle = ref({ left: '0px', top: '0px' })
const contextMenuNode = ref(null)
const renamingNodeId = ref(null)
const renamingValue = ref('')

function handleNodeContextMenu(event, data, node, tree) {
  event.preventDefault()
  contextMenuNode.value = data
  showContextMenu.value = true
  contextMenuStyle.value = {
    left: event.clientX + 'px',
    top: event.clientY + 'px'
  }
}
function handleRename() {
  renamingNodeId.value = contextMenuNode.value.id
  renamingValue.value = contextMenuNode.value.label
  showContextMenu.value = false
  nextTick(() => {
    // 自动聚焦输入框
    const input = document.querySelector('.rename-input')
    if (input) input.focus()
  })
}
function handleRenameConfirm(node) {
  if (renamingValue.value.trim() === '') {
    ElMessage.error('名称不能为空')
    return
  }
  node.label = renamingValue.value
  renamingNodeId.value = null
}
function handleDelete() {
  showContextMenu.value = false
  ElMessageBox.confirm('确定要删除该节点及其所有子节点吗？', '删除确认', {
    type: 'warning',
    confirmButtonText: '删除',
    cancelButtonText: '取消'
  }).then(() => {
    deleteNodeById(manualTreeData.value, contextMenuNode.value.id)
    ElMessage.success('删除成功')
  })
}
function deleteNodeById(tree, id) {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === id) {
      tree.splice(i, 1)
      return true
    } else if (tree[i].children && tree[i].children.length) {
      if (deleteNodeById(tree[i].children, id)) return true
    }
  }
  return false
}
// 点击空白处关闭菜单
window.addEventListener('click', () => { showContextMenu.value = false })
</script>

<style scoped>
.upload-page {
  width: 100%;
  height: 100%;
  min-height: 83vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  border: 2px solid #409EFF;
}

.top-section {
  flex: 0 0 auto;

  background: white;

}

.bottom-section {
  flex: 1;

  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed #e6a23c;

 
}

.file-upload-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}

/* 进度条样式 */
.upload-progress-bar {
  width: 100%;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

:deep(.el-progress) {
  max-width: 600px;
  margin: 0 auto;
}

.progress-status {
  font-size: 14px;
  color: #606266;
}

.progress-percentage {
  font-size: 14px;
  color: #909399;
  font-weight: 500;
}

:deep(.el-progress-bar__outer) {
  background-color: #f0f2f5;
  border-radius: 4px;
}

:deep(.el-progress-bar__inner) {
  transition: all 0.3s ease;
  border-radius: 4px;
}

.upload-area {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 0;
  position: relative;
}

.config-area {
  width: 100%;
  max-width: 1200px;
  border: 2px dashed #909399;
  padding: 20px;
  border-radius: 8px;
  background: white;
}

.manual-input-area {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  background: #f5f7fa;
  margin-bottom: 20px;
}

.manual-sider {
  width: 200px;
  background: #e3f0ff;
  border-right: 2px solid #b3c6e0;
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.sider-title {
  font-weight: bold;
  font-size: 18px;
  color: #232b3a;
}

.sider-actions {
  display: flex;
  align-items: center;
}

.sider-search-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.sider-search-input {
  flex: 1;
}

.sider-sort-btn {
  background: #fff;
  border: 1px solid #dcdfe6;
}

.sider-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.sider-list li {
  padding: 8px 0 8px 8px;
  cursor: pointer;
  border-radius: 4px;
  color: #333;
  transition: background 0.2s;
}

.sider-list li:hover {
  background: #d0e6ff;
}

.manual-content {
  flex: 1;
  background: #fffbe6;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
}

.content-title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 16px;
  color: #e6a23c;
}

.content-placeholder {
  color: #999;
  font-size: 15px;
}

/* 进度条对话框样式 */
.progress-dialog {
  padding: 20px;
}

.progress-text {
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
  color: #606266;
}

:deep(.el-dialog) {
  margin-top: 15vh !important;
}

:deep(.el-dialog__header) {
  display: none;
}

:deep(.el-dialog__body) {
  padding: 0;
}

:deep(.upload-progress-modal) {
  background: rgba(0, 0, 0, 0.5);
}

/* 标签页样式 */
.upload-tabs {
  padding: 0 20px;
}

:deep(.el-tabs__nav-wrap::after) {
  height: 1px;
}

:deep(.el-tabs__item) {
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}

:deep(.el-tabs__item .el-icon) {
  margin-right: 6px;
  vertical-align: middle;
}

:deep(.el-tabs__item span) {
  vertical-align: middle;
}

/* 状态栏样式 */
.status-bar {
  position: fixed;
  top: 0;
  left: 200px;  /* 调整左边距，避免被侧边栏遮挡 */
  right: 0;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;  /* 提高层级 */
  transition: all 0.3s ease;
}

.status-bar.success {
  background-color: #f0f9eb;
  color: #67c23a;
  border-bottom: 1px solid #c2e7b0;
}

.status-bar.error {
  background-color: #fef0f0;
  color: #f56c6c;
  border-bottom: 1px solid #fbc4c4;
}

.status-icon {
  font-size: 20px;
  margin-right: 8px;
}

.status-text {
  font-size: 14px;
  font-weight: 500;
}

.close-icon {
  position: absolute;
  right: 24px;
  cursor: pointer;
  font-size: 16px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.close-icon:hover {
  opacity: 1;
}

.config-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  margin-bottom: 20px;
}

.config-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #dcdfe6;
}

.progress-dialog-modal {
  z-index: 3000;
}
.progress-dialog-content {
  padding: 24px 8px 8px 8px;
}

.manual-tree {
  width: 100%;
  background: transparent;
}

.context-menu {
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-shadow: 0 2px 8px #0002;
  min-width: 100px;
  padding: 4px 0;
}
.context-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.context-menu li {
  padding: 8px 16px;
  cursor: pointer;
  color: #333;
  transition: background 0.2s;
}
.context-menu li:hover {
  background: #f5f7fa;
}
.rename-input {
  font-size: 14px;
}
</style> 