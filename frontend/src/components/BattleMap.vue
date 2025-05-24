<template>
    <div class="hr-dashboard" ref="dashboardRef">
      <!-- 顶部导航栏，仿照示例图片风格 -->
      <div class="hr-section section-1 nav-bar-fixed">
        <div class="nav-bar-flex">
          <div class="logo-title-group shrinkable">
            <span class="logo-double-circle">
              <span class="circle circle-blue"></span>
              <span class="circle circle-purple"></span>
            </span>
            <span class="nav-title ellipsis">HR Dashboard</span>
            <span class="nav-overview">Overview</span>
          </div>
  
          <div style="display: flex; align-items: center; gap: 10px; margin-left: 16px;">
            <button :class="{active: activeBtn==='overview'}" @click="setActiveBtn('overview')">人力概览</button>
            <button :class="{active: activeBtn==='map'}" @click="setActiveBtn('map')">作战地图</button>
          </div>
        
          <!-- 新增省市筛选器 -->
          <a-space class="nav-selectors">
            <a-select :style="{width:'120px'}" v-model="province">
              <a-option v-for="value in Object.keys(data)" :key="value">{{value}}</a-option>
            </a-select>
            <a-select :style="{width:'120px'}" :options="(data[province]||[]).map(v=>({label:v,value:v}))" v-model="city" />
          </a-space>
          <div class="nav-icons-user">
            <icon-home class="nav-icon" style="cursor:pointer;" @click="router.push('/portfolio')" />
            
            <icon-download class="nav-icon" @click="downloadDashboardPDF" style="cursor:pointer;" />
            <icon-user class="nav-icon" />
            <div class="user-info">
              <a-tooltip :content="dbStatus==='connected' ? '数据库已连接' : '数据库未连接'" position="top">
                <span class="user-name ellipsis">PGSQL</span>
              </a-tooltip>
              <span class="user-role">
                <span class="user-dot" :style="{background: dbStatus==='connected' ? '#00d26a' : '#ff3b3b'}"></span>
                {{ dbStatus==='connected' ? 'Succeed Connect' : (dbStatus==='checking' ? 'Checking...' : 'Not Connected') }}
              </span>
            </div>
          </div>
        </div>
      </div>
  
    
      <!-- 新增人力概览和作战地图按钮 -->
     
  
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import { IconSettings, IconDownload, IconUser, IconHome } from '@arco-design/web-vue/es/icon';
  import { useRouter } from 'vue-router';
  import { Tooltip as ATooltip } from '@arco-design/web-vue';
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  
  const router = useRouter();
  
  const province = ref('Sichuan');
  const city = ref('Chengdu');
  const data = {
    Beijing: ['Haidian', 'Chaoyang', 'Changping'],
    Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
    Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou']
  };
  
  const activeBtn = ref('map'); // 默认激活“作战地图”
function setActiveBtn(name) {
  activeBtn.value = name;
  if(name === 'map') {
    router.push('/battle-map');
  }
  if(name === 'overview') {
    router.push('/hr-dashboard');
  }
}
  
  watch(province, () => {
    city.value = ''
  });
  
  // 数据库连接状态逻辑
  const dbStatus = ref('checking'); // checking, connected, error
  onMounted(async () => {
    try {
      const res = await fetch('/api/db-status');
      const data = await res.json();
      dbStatus.value = data.status === 'connected' ? 'connected' : 'error';
    } catch (e) {
      dbStatus.value = 'error';
    }
  });
  
  // 截图转PDF逻辑
  const dashboardRef = ref(null);
  async function downloadDashboardPDF() {
    const el = dashboardRef.value;
    if (!el) return;
    const canvas = await html2canvas(el, { useCORS: true, backgroundColor: null });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('HR-Dashboard.pdf');
  }
  </script>
  
  <style scoped>
  .hr-dashboard {
    background: linear-gradient(to bottom, #1f2125 0%, #1f2125 8.2%, #f7f7f7 8.2%, #f7f7f7 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  
    
  }
  .section-1 {
    height: 70px;
    color: #fff;
  
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
  }
  .section-1.nav-bar-fixed {

    border-radius: 4px;
  }
  .custom-nav-row {
    width: 100%;
    height: 100%;
  }
  .logo-title-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .logo-double-circle {
    position: relative;
    width: 40px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .circle {
    position: absolute;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    opacity: 0.9;
  }
  .circle-blue {
    left: 0;
    background: #6ee0ff;
    z-index: 1;
  }
  .circle-purple {
    left: 12px;
    background: #7c3aed;
    z-index: 2;
  }
  .nav-title {
    font-size: 1.15rem;
    font-weight: 500;
    color: #fff;
  }
  .nav-overview {
    font-size: 1.05rem;
    color: #4e7fff;
    margin-left: 4px;
    cursor: pointer;
  }
  .custom-menu {
    background: transparent;
    border: none;
    color: #fff;
    font-size: 1.08rem;
  }
  .custom-menu .arco-menu-item {
    background: transparent;
    color: #fff;
    font-size: 1.08rem;
    padding: 0 32px;
    height: 56px;
    display: flex;
    align-items: center;
    border: none;
  }
  .custom-menu .menu-selected,
  .custom-menu .arco-menu-item-selected {
    color: #4e7fff !important;
    background: #23242a !important;
    border-bottom: 3px solid #4e7fff !important;
  }
  .nav-icons-user {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex-shrink: 0;
    border: 2px solid #ff3b3b;
    padding: 0 16px;
  }
  .nav-icon {
    font-size: 22px;
    color: #fff;
    cursor: pointer;
  }
  .user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8px;
  min-width: 80px;   /* 固定最小宽度，防止抖动 */
  max-width: 100px;  /* 可选，防止过宽 */
}
  .user-name {
    font-size: 10px;
    color: #fff;
    min-width: 0;
  }
  .user-role {
  font-size: 8px;
  color: #bdbdbd;
  display: flex;
  align-items: center;
  min-width: 0;
  white-space: nowrap;
  text-align: left;
  width: 80px;       /* 固定宽度，保证状态切换时宽度不变 */
  overflow: hidden;
  text-overflow: ellipsis;
}
  .user-dot {
    width: 8px;
    height: 8px;
    background: #00d26a;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
  }
  .custom-nav-row.no-collapse {
    flex-wrap: nowrap !important;
  }
  .no-collapse-menu {
    min-width: 420px;
    overflow-x: auto;
    flex: none !important;
    white-space: nowrap;
  }
  .custom-menu.no-collapse-menu {
    flex-wrap: nowrap !important;
    min-width: 420px;
    overflow-x: auto;
    white-space: nowrap;
  }
  .nav-bar-fixed {
    padding: 0 32px;
    background: transparent;
    border: none;
    box-shadow: none;
    height: 70px;
    display: flex;
    align-items: center;
  }
  .nav-bar-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 18px;
    min-width: 0;
  }
  .shrinkable {
    display: flex;
    align-items: center;
    min-width: 0;
    flex-shrink: 1;
  }
  .logo-title-group {
    gap: 12px;
    min-width: 0;
    max-width: 320px;
  }
  .nav-title {
    font-size: 1.15rem;
    font-weight: 500;
    color: #fff;
    min-width: 0;
    max-width: 180px;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: bottom;
    font-size: 5x;
  }
  .nav-overview {
    font-size: 1.05rem;
    color: #4e7fff;
    margin-left: 4px;
    cursor: pointer;
    min-width: 0;
  }
  .custom-menu {
    background: transparent;
    border: none;
    color: #fff;
    font-size: 1.08rem;
    min-width: 0;
    flex-shrink: 1;
    max-width: 420px;
  }
  .custom-menu .arco-menu-item {
    background: transparent;
    color: #fff;
    font-size: 1.08rem;
    padding: 0 24px;
    height: 56px;
    display: flex;
    align-items: center;
    border: none;
  }
  .custom-menu .menu-selected,
  .custom-menu .arco-menu-item-selected {
    color: #4e7fff !important;
    background: #23242a !important;
    border-bottom: 3px solid #4e7fff !important;
  }
  .nav-icons-user {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex-shrink: 0;
  }
  .nav-icon {
    font-size: 22px;
    color: #fff;
    cursor: pointer;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 8px;
    min-width: 0;
    max-width: 100px;
  }
  .user-name {
    font-size: 10px;
    color: #fff;
    min-width: 0;
  }
  .user-role {
    font-size: 8px;
    color: #bdbdbd;
    display: flex;
    align-items: center;
    min-width: 0;
  }
  .user-dot {
    width: 8px;
    height: 8px;
    background: #00d26a;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
  }
  .nav-selectors {
     border: 2px solid #ff3b3b;
    
    flex-shrink: 0;
  }
  .nav-selectors :deep(.arco-select-view) {
    background: #23242a !important;
    border: 1.5px solid #000 !important;
    color: #fff !important;
  }
  .nav-selectors :deep(.arco-select-view-input) {
    color: #fff !important;
  }
  .nav-selectors :deep(.arco-select-dropdown) {
    background: #23242a !important;
    color: #fff !important;
    border: 1.5px solid #000 !important;
  }
  .nav-selectors :deep(.arco-select-option) {
    color: #fff !important;
    background: #23242a !important;
  }
  .nav-selectors :deep(.arco-select-option-active),
  .nav-selectors :deep(.arco-select-option[aria-selected='true']) {
    background: #333 !important;
    color: #4e7fff !important;
  }
  .nav-action-btns {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 16px;
  }
  .nav-red-btn {
    border: 1.5px solid #ff3b3b !important;
    color: #ff3b3b !important;
    background: transparent !important;
    font-size: 13px;
    padding: 0 16px;
    height: 32px;
    border-radius: 4px;
  }
  /* 按钮基础样式 */
  button {
    background: #1f2125;
    color: #fff;
    border: 1.5px solid #1f2125;
    border-radius: 4px;
    padding: 6px 18px;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s;
    position: relative;
    outline: none;
  }
  button::after {
    content: '';
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: -6px;
    height: 3px;
    background: #4e7fff;
    /* 直角 */
    border-radius: 0;
    display: block;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(.4,0,.2,1);
    pointer-events: none;
  }
  button:hover::after {
    transform: scaleX(1);
  }
  button.active::after {
    transform: scaleX(1);
  }
  button:hover {
    background: #1f2125;
    color: #fff;
  }
  
  

  
  
  
  </style> 