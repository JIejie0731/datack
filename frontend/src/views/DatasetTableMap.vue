<template>
  <div class="dataset-table-map-root">
    <!-- 新增表单区 -->
    <div class="dataset-table-map-form-area">
      <el-form :model="addForm" label-width="90px" style="max-width: 1000px; display: flex; flex-direction: row; align-items: center; gap: 16px;">
        <el-form-item label="数据集名" style="margin-bottom: 0;">
          <el-input v-model="addForm.dataset_name" style="width: 150px;" />
        </el-form-item>
        <el-form-item label="表名" style="margin-bottom: 0;">
          <el-input v-model="addForm.table_name" style="width: 150px;" />
        </el-form-item>
        <el-form-item label="别名" style="margin-bottom: 0;">
          <el-input v-model="addForm.table_alias" style="width: 120px;" />
        </el-form-item>
        <el-form-item label="备注" style="margin-bottom: 0;">
          <el-input v-model="addForm.remark" style="width: 200px;" />
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <el-button type="primary" :loading="addLoading" @click="submitAddForm">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 搜索区 -->
    <div class="dataset-table-map-search-area">
      <el-input v-model="searchText" placeholder="搜索数据集名/表名/别名/备注" clearable style="width: 320px; margin: 16px 0;" />
    </div>
    <!-- 表格区 -->
    <div class="dataset-table-map-table-area">
      <el-table :data="filteredList" style="width: 100%; flex: 1;">
        <el-table-column prop="dataset_name" label="数据集名" width="180" sortable>
          <template #default="scope">
            <el-input v-if="editRowId === scope.row.id" v-model="editCache.dataset_name" size="small" />
            <span v-else>{{ scope.row.dataset_name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="table_name" label="表名" width="180" sortable>
          <template #default="scope">
            <el-input v-if="editRowId === scope.row.id" v-model="editCache.table_name" size="small" />
            <span v-else>{{ scope.row.table_name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="table_alias" label="别名" width="120" sortable>
          <template #default="scope">
            <el-input v-if="editRowId === scope.row.id" v-model="editCache.table_alias" size="small" />
            <span v-else>{{ scope.row.table_alias }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" sortable>
          <template #default="scope">
            <el-input v-if="editRowId === scope.row.id" v-model="editCache.remark" size="small" />
            <span v-else>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button v-if="editRowId !== scope.row.id" size="small" @click="startEdit(scope.row)">编辑</el-button>
            <el-button v-else size="small" type="primary" :loading="editLoading" @click="saveEdit(scope.row)">保存</el-button>
            <el-button v-if="editRowId === scope.row.id" size="small" @click="cancelEdit">取消</el-button>
            <el-button size="small" type="danger" @click="deleteMap(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="dataset-table-map-pagination">
        <el-pagination
          background
          layout="prev, pager, next, jumper, ->, total"
          :total="filteredList.length"
          :page-size="10"
          style="margin-top: 16px;"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const list = ref([])
// 新增表单相关
const addForm = ref({ dataset_name: '', table_name: '', table_alias: '', remark: '' })
const addLoading = ref(false)

// 行内编辑相关
const editRowId = ref(null)
const editCache = ref({})
const editLoading = ref(false)

const searchText = ref('')

async function fetchList() {
  const res = await axios.get('/api/dataset-table-map')
  list.value = res.data.data || []
}

// 新增提交
async function submitAddForm() {
  if (!addForm.value.dataset_name || !addForm.value.table_name) {
    ElMessage.error('数据集名和表名不能为空')
    return
  }
  addLoading.value = true
  try {
    await axios.post('/api/dataset-table-map', addForm.value)
    ElMessage.success('保存成功')
    addForm.value = { dataset_name: '', table_name: '', table_alias: '', remark: '' }
    fetchList()
  } catch (e) {
    ElMessage.error('保存失败')
  } finally {
    addLoading.value = false
  }
}

// 行内编辑
function startEdit(row) {
  editRowId.value = row.id
  editCache.value = { ...row }
}

function cancelEdit() {
  editRowId.value = null
  editCache.value = {}
}

async function saveEdit(row) {
  if (!editCache.value.dataset_name || !editCache.value.table_name) {
    ElMessage.error('数据集名和表名不能为空')
    return
  }
  editLoading.value = true
  try {
    await axios.put('/api/dataset-table-map', editCache.value)
    ElMessage.success('编辑成功')
    editRowId.value = null
    editCache.value = {}
    fetchList()
  } catch (e) {
    ElMessage.error('保存失败')
  } finally {
    editLoading.value = false
  }
}

async function deleteMap(row) {
  await ElMessageBox.confirm('确定要删除该映射吗？', '提示', { type: 'warning' })
  await axios.delete('/api/dataset-table-map', { data: { id: row.id } })
  ElMessage.success('删除成功')
  fetchList()
}

// 支持筛选和排序的列表
const filteredList = computed(() => {
  if (!searchText.value) return list.value
  const s = searchText.value.trim().toLowerCase()
  return list.value.filter(item =>
    (item.dataset_name && item.dataset_name.toLowerCase().includes(s)) ||
    (item.table_name && item.table_name.toLowerCase().includes(s)) ||
    (item.table_alias && item.table_alias.toLowerCase().includes(s)) ||
    (item.remark && item.remark.toLowerCase().includes(s))
  )
})

fetchList()
</script>

<style scoped>
.dataset-table-map-root {
  border: 2px dashed #4e7fff;
  min-height: 83vh;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  height: 83vh;
  margin: 0;
  padding: 0;
}
.dataset-table-map-form-area {
  background: #fff;
  font-size: 1.1rem;
  color: #222;
  flex: 0 0 20%;
  height: 20%;
  border-bottom: 2px solid #bbb;
  box-sizing: border-box;
  margin: 0;
  padding: 0 32px;
  display: flex;
  align-items: center;
  min-height: 64px;
}
.dataset-table-map-search-area {
  padding: 0 32px;
  background: #fff;
}
.dataset-table-map-table-area {
  background: #fff;
  font-size: 1.1rem;
  color: #222;
  flex: 1 1 80%;
  height: 80%;
  box-sizing: border-box;
  margin: 0;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}
.dataset-table-map-pagination {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  margin-top: auto;
  padding-bottom: 8px;
}
</style> 