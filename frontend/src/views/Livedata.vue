<template>
  <DrillModal v-model="showDrill" title="下钻示例" :data="pagedData">
    <div class="el-table-wrapper">
      <el-table
        :data="pagedData"
        row-key="id"
        border
        style="width: 100%; height: 100%;"
        :row-class-name="() => 'drill-table-row'"
        :header-row-class-name="'drill-table-header-row'"
        :resizable="true"
      >
        <el-table-column
          v-for="col in columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :min-width="col.minWidth"
          :show-overflow-tooltip="true"
        />
      </el-table>
    </div>
    <template #footer>
      <div class="drill-footer-flex">
        <span class="footer-count">共 {{ drillData.length }} 条数据</span>
        <el-button type="primary" size="small" style="min-width: 64px;" @click="exportExcel">导出</el-button>
        <el-pagination
          :total="drillData.length"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          layout="sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </template>
  </DrillModal>
  <div v-if="authed">
    <a-layout class="livedata-layout">
      <a-layout-header class="livedata-header">
        <div class="livedata-logo">数据求索后台</div>
        <a-button class="nav-icon-btn user-btn" shape="circle" size="small" @click="goHome" style="margin-left: 16px;">
          <icon-home />
        </a-button>
        <a-button class="nav-icon-btn user-btn" shape="circle" size="small" @click="goProfile" style="margin-left: 8px;">
          <icon-user />
        </a-button>
      </a-layout-header>
      <a-layout>
        <a-layout-sider class="livedata-sider" width="200" collapsed-width="56" :collapsed="collapsed" collapsible style="position: relative;">
          <a-menu
            :default-selected-keys="['dashboard']"
            :style="{height: '100%', borderRight: 0}"
            @menu-item-click="handleMenuClick"
            :collapsed="collapsed"
          >
            <a-menu-item key="dashboard">
              <icon-bar-chart />
              <span v-if="!collapsed">数据大屏</span>
            </a-menu-item>
            <a-menu-item key="query">
              <icon-search />
              <span v-if="!collapsed">数据查询</span>
            </a-menu-item>
            <a-menu-item key="manage">
              <icon-storage />
              <span v-if="!collapsed">数据管理</span>
            </a-menu-item>
            <a-menu-item key="mapping">
              <icon-link />
              <span v-if="!collapsed">数据映射</span>
            </a-menu-item>
            <a-menu-item key="profile">
              <icon-user />
              <span v-if="!collapsed">个人中心</span>
            </a-menu-item>
          </a-menu>
          <div style="padding: 12px; text-align: right; position: absolute; bottom: 0; left: 0; width: 100%;  z-index: 10;">
            <a-button
              class="sider-toggle-btn"
              shape="circle"
              size="small"
              @click="toggleSider"
              style="margin-bottom: 8px;"
            >
              <component :is="collapsed ? IconMenuUnfold : IconMenuFold" />
            </a-button>
          </div>
        </a-layout-sider>
        <a-layout-content class="livedata-content">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup>
// 引入Arco Design Vue组件
import { Layout as ALayout, LayoutHeader as ALayoutHeader, LayoutSider as ALayoutSider, LayoutContent as ALayoutContent, Menu as AMenu, MenuItem as AMenuItem } from '@arco-design/web-vue'
import { ref, computed, h } from 'vue'
import { Modal as AModal, InputPassword as AInputPassword, Button as AButton } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import DrillModal from '@/components/DrillModal.vue'
import { ElTable, ElTableColumn, ElPagination, ElButton } from 'element-plus'
import * as XLSX from 'xlsx'
import { IconBarChart, IconSearch, IconStorage, IconLink, IconUser, IconMenuFold, IconMenuUnfold, IconHome } from '@arco-design/web-vue/es/icon'

const router = useRouter()
const showDrill = ref(false)
const pageSize = ref(10)
const currentPage = ref(1)
const collapsed = ref(false)

// 生成25条模拟数据
const drillData = ref(Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  value: Math.floor(Math.random() * 1000),
  field4: 'A',
  field5: 'B',
  field6: 'C',
  field7: 'D',
  field8: 'E',
  field9: 'F',
  field10: 'G',
  field11: 'H',
  field12: 'I',
  field13: 'J',
  field14: 'K',
  field15: 'L'
})))

// 计算当前页数据，空行补齐到10行
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return drillData.value.slice(start, end).map((row, idx) => ({
    ...row,
    id: row.id ?? `row-${currentPage.value}-${idx}`
  }))
})

const columns = [
  { prop: 'id', label: 'ID', minWidth: 80 },
  { prop: 'name', label: '姓名', minWidth: 100 },
  { prop: 'value', label: '数值', minWidth: 100 },
  { prop: 'field4', label: '字段4', minWidth: 100 },
  { prop: 'field5', label: '字段5', minWidth: 100 },
  { prop: 'field6', label: '字段6', minWidth: 100 },
  { prop: 'field7', label: '字段7', minWidth: 100 },
  { prop: 'field8', label: '字段8', minWidth: 100 },
  { prop: 'field9', label: '字段9', minWidth: 100 },
  { prop: 'field10', label: '字段10', minWidth: 100 },
  { prop: 'field11', label: '字段11', minWidth: 100 },
  { prop: 'field12', label: '字段12', minWidth: 100 },
  { prop: 'field13', label: '字段13', minWidth: 100 },
  { prop: 'field14', label: '字段14', minWidth: 100 },
  { prop: 'field15', label: '字段15', minWidth: 100 }
]

function handlePageChange(val) {
  currentPage.value = val
}

function handleSizeChange(val) {
  pageSize.value = val
  currentPage.value = 1 // 切换每页条数时重置到第一页
}

function exportExcel() {
  // 导出所有数据
  const data = drillData.value.map(row =>
    columns.reduce((acc, col) => {
      acc[col.label] = row[col.prop]
      return acc
    }, {})
  )
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, '下钻数据.xlsx')
}

function handleMenuClick(key) {
  if (key === 'manage') {
    router.push('/livedata/manage')
  } else if (key === 'mapping') {
    router.push('/livedata/mapping')
  }
  // 其它菜单项可按需跳转
}

function toggleSider() {
  collapsed.value = !collapsed.value
}

function goHome() {
  router.push('/')
}

function goProfile() {
  router.push('/profile')
}

const authed = ref(true) // 直接允许访问，无需密码
</script>

<style scoped>
.livedata-layout {
  min-height: 100vh;
}
.livedata-header {
  background: #fff;
  color: #232b3a;
  font-size: 1.3rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-left: 32px;
  height: 56px;
  box-shadow: 0 2px 8px #0001;
  border-top: 0.8px solid #e0e0e0;
  border-bottom: 0.8px solid #e0e0e0;
  position: relative;
}
.livedata-logo {
  font-size: 1.25rem;
  letter-spacing: 2px;
  color: #232b3a;
  display: inline-block;
}
.livedata-sider {

  color: #fff;
}
.livedata-content {
  padding: 36px 48px;
  background: #f7f9fa;
  min-height: 600px;
}
.livedata-welcome {
  background: #fff;
  border-radius: 10px;
  padding: 48px 32px;
  box-shadow: 0 2px 16px #00eaff11;
  text-align: center;
}
.livedata-welcome h2 {
  color: #232b3a;
  font-size: 2rem;
  margin-bottom: 18px;
}
.livedata-welcome p {
  color: #888;
  font-size: 1.1rem;
}
.el-table-wrapper {
  height: calc(100% - 56px); /* 56px为footer高度 */
  display: flex;
  flex-direction: column;
}
.el-table {
  flex: 1 1 0;
  height: 100%;
}
.drill-table-row {
  height: calc((100% - 40px) / 10) !important;
}
.drill-table-header-row {
  height: 40px !important;
}
.drill-footer-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
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
.livedata-sider .arco-btn[type="button"] {
  background: #1a2233 !important;
  border: none !important;
  color: #fff !important;
  box-shadow: none !important;
}
.livedata-sider .arco-btn[type="button"]:hover,
.livedata-sider .arco-btn[type="button"]:active {
  background: #1a2233 !important;
  color: #4e7fff !important;
}
.sider-toggle-btn {
  border: none !important;
  color: #fff !important;
  box-shadow: none !important;
  outline: none !important;
}
.sider-toggle-btn:hover,
.sider-toggle-btn:active,
.sider-toggle-btn:focus {
  background: #1a2233 !important;
  color: #4e7fff !important;
  border: none !important;
  box-shadow: none !important;
}
.nav-icon-btn {
  background: #f4f8ff !important;
  border: none !important;
  color: #232b3a !important;
  box-shadow: none !important;
  outline: none !important;
  vertical-align: middle;
}
.nav-icon-btn:hover {
  background: #e6f0ff !important;
  color: #4e7fff !important;
}
.user-btn {
  position: absolute;
  right: 32px;
  top: 50%;
  transform: translateY(-50%);
}
.user-btn + .user-btn {
  right: 80px;
}
</style> 