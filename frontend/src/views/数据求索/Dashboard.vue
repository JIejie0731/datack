<template>
  <div class="dashboard-layout">
    <!-- 左侧数据源目录区 -->
    <div class="dashboard-sider">
      <div class="sider-header">
        <span class="sider-title">数据源</span>
        <div class="sider-actions">
          <el-button :icon="FolderAdd" circle size="small" title="新建文件夹" />
          <el-button :icon="DocumentAdd" circle size="small" style="margin-left: 6px;" title="新建数据源" />
        </div>
      </div>
      <div class="sider-search-row">
        <el-button :icon="Sort" circle size="small" class="sider-sort-btn" style="margin-left: 6px;" title="排序" />
      </div>
      <div v-if="savedConfigs.length === 0" class="sider-empty">暂无数据</div>
      <div v-else class="sider-list">
        <div
          v-for="(item, idx) in savedConfigs"
          :key="item.name + idx"
          class="sider-list-item"
        >
          {{ item.name || '未命名连接' }}
        </div>
      </div>
    </div>
    <!-- 右侧内容区 -->
    <div class="dashboard-content">
      <div class="empty-box">
        <el-icon class="empty-icon"><Box /></el-icon>
        <div class="empty-text">暂无数据源</div>
        <el-button type="primary" class="empty-btn" @click="showDrawer = true">新建数据源</el-button>
      </div>
    </div>
    <!-- 新建数据源弹框 -->
    <el-drawer
      v-model="showDrawer"
      direction="btt"
      size="720px"
      :with-header="false"
      custom-class="create-datasource-drawer"
    >
      <div class="drawer-step-row">
        <div class="step-bar-flex">
          <div class="step-bar-text">创建数据源</div>
          <div class="step-bar-steps" style="flex:1;height:100%;"></div>
          <div class="step-bar-icon" style="width:5%;height:100%;display:flex;align-items:center;justify-content:center;">
            <icon-close 
              style="font-size: 22px; cursor: pointer;" 
              @click="showDrawer = false"
            />
          </div>
        </div>
      </div>
      <div class="drawer-main-row">
        <div class="drawer-sider">
          <div class="sider-menu-list">
            <div class="sider-menu-item" :class="{ active: selectedMenu === 'PostgreSQL' }" @click="selectedMenu = 'PostgreSQL'">PostgreSQL</div>
            <div class="sider-menu-item" :class="{ active: selectedMenu === 'MySQL' }" @click="selectedMenu = 'MySQL'">MySQL</div>
            <div class="sider-menu-item" :class="{ active: selectedMenu === 'API' }" @click="selectedMenu = 'API'">API</div>
          </div>
        </div>
        <div class="drawer-content">
          <div class="content-title-bar">{{ selectedMenu }}</div>
          <div class="content-main-area">
            <div v-if="selectedMenu === 'MySQL'" class="mysql-form-center">
              <div class="mysql-form-icons">
                <el-icon style="font-size:48px;"><User /></el-icon>
                <div class="mysql-form-line"></div>
                <el-icon style="font-size:48px;"><Coin /></el-icon>
              </div>
              <div class="mysql-form-icons-label">
                <span>Navicat</span>
                <span>数据库</span>
              </div>
              <el-form
                :model="mysqlForm"
                :rules="mysqlRules"
                ref="mysqlFormRef"
                label-width="90px"
                style="width: 400px; margin-top: 24px;"
              >
                <el-form-item label="连接名称">
                  <el-input v-model="mysqlForm.name" placeholder="请输入连接名称" />
                </el-form-item>
                <el-form-item label="主机">
                  <el-input v-model="mysqlForm.host" placeholder="请输入主机" />
                </el-form-item>
                <el-form-item label="端口">
                  <el-input v-model="mysqlForm.port" placeholder="请输入端口" />
                </el-form-item>
                <el-form-item label="用户名">
                  <el-input v-model="mysqlForm.user" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="mysqlForm.password" type="password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                  <el-checkbox v-model="mysqlForm.savePwd">保存密码</el-checkbox>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <div class="drawer-footer-row">
        <div class="footer-bar">
          <el-button class="footer-btn" plain @click="handleCancel">取消</el-button>
          <el-button class="footer-btn" plain @click="handleValidate">校验</el-button>
          <el-button class="footer-btn" type="primary" @click="handleSave">保存</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FolderAdd, DocumentAdd, Sort, Box, User, Coin } from '@element-plus/icons-vue'
import { IconClose } from '@arco-design/web-vue/es/icon'
import { Steps as ASteps, Step as AStep, Divider as ADivider } from '@arco-design/web-vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const showDrawer = ref(false)
const activeStep = ref(0) // 0:选择数据源, 1:配置信息
const selectedMenu = ref('全部')
const oltpList = [
  { name: 'Db2', brand: 'IBM', brandColor: '#1F70C1' },
  { name: 'MySQL' },
  { name: 'MariaDB' },
  { name: 'Mongodb-BI' },
  { name: 'Oracle', brand: 'ORACLE', brandColor: '#F80000' },
  { name: 'PostgreSQL' },
  { name: 'SQL Server' },
  { name: 'TiDB' }
]

const mysqlForm = ref({
  name: '',
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  savePwd: true
})

const mysqlRules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  host: [{ required: true, message: '请输入主机名/IP地址', trigger: 'blur' }],
  port: [{ required: true, message: '请输入端口', trigger: 'blur' }],
  dbName: [{ required: true, message: '请输入数据库名称', trigger: 'blur' }]
}
const mysqlFormRef = ref()

const savedConfigs = ref([])

const handleCancel = () => {
  mysqlForm.value = {
    name: '',
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    savePwd: true
  }
  ElMessage.info('表单已清空')
}

const handleSave = () => {
  mysqlFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        const res = await axios.post('/api/db/validate-mysql', mysqlForm.value)
        if (res.data.success) {
          savedConfigs.value.push({ ...mysqlForm.value })
          ElMessage.success('保存成功，数据库连接正常')
        } else {
          ElMessage.error(res.data.message || '数据库连接失败，未保存')
        }
      } catch (e) {
        ElMessage.error('网络或服务器错误，未保存')
      }
    }
  })
}

const handleValidate = () => {
  mysqlFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        const res = await axios.post('/api/db/validate-mysql', mysqlForm.value)
        if (res.data.success) {
          ElMessage.success('连接成功')
        } else {
          ElMessage.error(res.data.message || '连接失败')
        }
      } catch (e) {
        ElMessage.error('网络或服务器错误')
      }
    }
  })
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  width: 100%;
  height: 83vh;
  background: #f7f8fa;
}
.dashboard-sider {
  width: 280px;
  background: #fff;
  border-right: 1px solid #f0f0f0;
  padding: 32px 24px 0 24px;
  display: flex;
  flex-direction: column;
  min-width: 220px;
}
.sider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
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
  margin-bottom: 18px;
}
.sider-sort-btn {
  background: #fff;
  border: 1px solid #dcdfe6;
}
.sider-empty {
  color: #bfbfbf;
  font-size: 15px;
  text-align: center;
  margin-top: 48px;
}
.dashboard-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f8fa;
}
.empty-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -80px;
}
.empty-icon {
  font-size: 64px;
  color: #d3d7df;
  margin-bottom: 18px;
}
.empty-text {
  color: #bfbfbf;
  font-size: 17px;
  margin-bottom: 18px;
}
.empty-btn {
  font-size: 15px;
  padding: 0 28px;
}
.create-datasource-drawer {
  border-radius: 16px 16px 0 0;
  padding: 0;
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.drawer-step-row {
  width: 100%;
  padding: 0;
  margin: 0;
  flex: 0 0 8%;
  height: 8%;
  min-height: 0;
}
.drawer-main-row {
  display: flex;
  width: 100%;
  height: 82%;

}
.drawer-sider {
  width: 20%;
  min-width: 120px;
  height: 100%;
  background: #fafbfc;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  border-right: 2px solid #dededf;
  margin: 0;
}
.drawer-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
}
.content-title-bar {
  height: 56px;
  line-height: 56px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #ededed;
  padding-left: 8px;
  background: #fff;
}
.content-main-area {
  flex: 1;
  padding: 16px 8px 0 8px;
  background: #fff;
  overflow: auto;
}
.drawer-footer-row {
  width: 100%;
  padding: 0;
  margin: 0;
  border-top: 1px solid #ededed;
  box-sizing: border-box;
  flex: 0 0 10%;
  height: 10%;
  min-height: 0;
}
.footer-bar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  padding: 0 32px;
  margin: 0;
}
.footer-btn {
  min-width: 90px;
  font-size: 14px;
  height: 36px;
}
:deep(.el-drawer.create-datasource-drawer) {
  margin: 0 auto 32px auto;
  max-width: calc(100vw - 64px);
  max-height: calc(100vh - 64px);
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  border-radius: 16px 16px 0 0;
}
:deep(.el-drawer__body) {
  padding: 0 !important;
}
:deep(.el-drawer__content) {
  padding: 0 !important;
  margin: 0 !important;
}
.step-bar-flex {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.step-bar-text {
  width: 20%;
  min-width: 120px;
  font-weight: bold;
  font-size: 22px;
  padding-left: 20px;
 
  display: flex;
  align-items: center;
  height: 100%;
}
.step-bar-icon {
  width: 5%;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
:deep(.arco-steps-line),
:deep(.arco-steps-item-line),
:deep(.arco-steps-item__line) {
  height: 3px !important;
  min-height: 3px !important;
  background: #bfbfbf !important;
  opacity: 1 !important;
}
.sider-section-title {
  font-size: 15px;
  color: #666;
  margin-bottom: 8px;
  margin-top: 8px;
}
.sider-menu-list {
 
  border-radius: 4px;
  padding: 12px 0;
}
.sider-menu-item {
  padding: 8px 20px;
  font-size: 17px;
  color: #222;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 4px;
  transition: background 0.2s, color 0.2s;
}
.sider-menu-item.active,
.sider-menu-item:hover {
  background: #f5f7fa;
  color: #409EFF;
}
.db-card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 16px;
}
.db-card {
  width: 300px;
  height: 80px;
  background: #fff;
  border: 1.5px solid #e5e6eb;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0 24px;
  font-size: 20px;
  font-weight: 500;
  box-sizing: border-box;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.db-card:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
  border-color: #409EFF;
}
.db-name {
  font-size: 20px;
  font-weight: 500;
}
.mysql-form-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 480px;
  padding-top: 40px;
}
.mysql-form-icons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}
.mysql-form-line {
  width: 120px;
  height: 3px;
  background: #e0e0e0;
  margin: 0 18px;
  border-radius: 2px;
}
.mysql-form-icons-label {
  display: flex;
  width: 320px;
  justify-content: space-between;
  color: #222;
  font-size: 16px;
  margin-bottom: 8px;
}
.sider-list {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sider-list-item {
  font-size: 16px;
  color: #232b3a;
  padding: 8px 12px;
  border-radius: 4px;
  background: #f5f7fa;
  cursor: pointer;
  transition: background 0.2s;
}
.sider-list-item:hover {
  background: #e6f0ff;
}
</style> 