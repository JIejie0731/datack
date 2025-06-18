<template>
  <div class="data-manage-root">
    <!-- 区域1：数据集表单 -->
    <div class="data-manage-form-area">
      <el-form :inline="true" style="padding: 16px 0;">
        <el-form-item label="数据集名称">
          <el-input v-model="formDatasetName" placeholder="请输入数据集名称" style="width: 180px" />
        </el-form-item>
        <el-form-item label="数据集内容">
          <el-input v-model="formDatasetContent" placeholder="请输入SQL或描述" style="width: 350px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSaveDataset" :disabled="!formDatasetName || !formDatasetContent">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 搜索区 -->
    <div class="data-manage-search-area">
      <el-input v-model="searchText" placeholder="搜索数据集名称/内容" clearable style="width: 320px; margin: 16px 0;" />
    </div>
    <!-- 区域2：表格 -->
    <div class="data-manage-table-area">
      <el-table :data="pagedList" border style="width: 100%;">
        <el-table-column prop="name" label="数据集名称" min-width="180" sortable>
          <template #default="scope">
            <el-input v-if="editRowId === scope.row.id" v-model="editCache.name" size="small" style="width: 100%;" />
            <span v-else class="ellipsis-cell">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sql_text" label="数据集内容" min-width="350" sortable>
          <template #default="scope">
            <el-input v-if="editRowId === scope.row.id" v-model="editCache.sql_text" size="small" style="width: 100%;" />
            <span v-else class="ellipsis-cell">{{ scope.row.sql_text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button v-if="editRowId !== scope.row.id" size="small" @click="startEdit(scope.row)">编辑</el-button>
            <el-button v-else size="small" type="primary" :loading="editLoading" @click="saveEdit(scope.row)">保存</el-button>
            <el-button v-if="editRowId === scope.row.id" size="small" @click="cancelEdit">取消</el-button>
            <el-button size="small" type="danger" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="data-manage-pagination">
        <el-pagination
          background
          layout="prev, pager, next, jumper, ->, total, sizes"
          :total="filteredList.length"
          :page-size="pageSize"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const formDatasetName = ref('')
const formDatasetContent = ref('')
const datasetList = ref([])

const searchText = ref('')
const filteredList = computed(() => {
  if (!searchText.value) return datasetList.value
  const s = searchText.value.trim().toLowerCase()
  return datasetList.value.filter(item =>
    (item.name && item.name.toLowerCase().includes(s)) ||
    (item.sql_text && item.sql_text.toLowerCase().includes(s))
  )
})

const currentPage = ref(1)
const pageSize = ref(10)
const pagedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredList.value.slice(start, start + pageSize.value)
})

const editRowId = ref(null)
const editCache = ref({})
const editLoading = ref(false)

function startEdit(row) {
  editRowId.value = row.id
  editCache.value = { ...row }
}
function cancelEdit() {
  editRowId.value = null
  editCache.value = {}
}
async function saveEdit(row) {
  if (!editCache.value.name || !editCache.value.sql_text) {
    ElMessage.error('数据集名称和内容不能为空')
    return
  }
  editLoading.value = true
  try {
    await axios.put('/api/sql-datasets', editCache.value)
    ElMessage.success('编辑成功')
    editRowId.value = null
    editCache.value = {}
    fetchDatasetList()
  } catch (e) {
    ElMessage.error('保存失败')
  } finally {
    editLoading.value = false
  }
}
async function deleteRow(row) {
  await ElMessageBox.confirm('确定要删除该数据集吗？', '提示', { type: 'warning' })
  await axios.delete('/api/sql-datasets', { data: { id: row.id } })
  ElMessage.success('删除成功')
  fetchDatasetList()
}

function handleSizeChange(val) {
  pageSize.value = val
  currentPage.value = 1
}
function handleCurrentChange(val) {
  currentPage.value = val
}

async function handleSaveDataset() {
  if (!formDatasetName.value || !formDatasetContent.value) return
  await axios.post('/api/sql-datasets', {
    name: formDatasetName.value,
    sql_text: formDatasetContent.value
  })
  await fetchDatasetList()
  formDatasetName.value = ''
  formDatasetContent.value = ''
}

async function fetchDatasetList() {
  const res = await axios.get('/api/sql-datasets')
  datasetList.value = res.data.data || []
}

onMounted(() => {
  fetchDatasetList()
})
</script>

<style scoped>
.data-manage-root {
  border: 2px dashed #4e7fff;
  min-height: 83vh;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  height: 83vh;
  margin: 0;
  padding: 0;
}
.data-manage-form-area {
  border: 2px solid #4e7fff;
  margin: 0;
  padding: 16px 32px;
  background: #f8fafc;
  flex: 0 0 20%;
  height: 20%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.data-manage-search-area {
  padding: 0 32px;
  background: #f8fafc;
}
.data-manage-table-area {
  border: 2px solid #4e7fff;
  padding: 0 32px;
  background: #fff;
  flex: 1 1 80%;
  height: 80%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}
.data-manage-pagination {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  margin-top: auto;
  padding-bottom: 8px;
}
.ellipsis-cell {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
</style>