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
                    <button :class="{ active: activeBtn === 'overview' }" @click="setActiveBtn('overview')">人力概览</button>
                    <button :class="{ active: activeBtn === 'map' }" @click="setActiveBtn('map')">作战地图</button>
                </div>

                <!-- 新增省市筛选器 -->
                <a-space class="nav-selectors">
                    <a-tree-select v-model="selectedDept" :data="treeData" placeholder="请选择部门" style="width: 220px" />
                </a-space>
                <div class="nav-icons-user">
                    <icon-home class="nav-icon" style="cursor:pointer;" @click="router.push('/portfolio')" />

                    <icon-download class="nav-icon" @click="downloadDashboardPDF" style="cursor:pointer;" />
                    <icon-user class="nav-icon" />
                    <div class="user-info">
                        <a-tooltip :content="dbStatus === 'connected' ? '数据库已连接' : '数据库未连接'" position="top">
                            <span class="user-name ellipsis">PGSQL</span>
                        </a-tooltip>
                        <span class="user-role">
                            <span class="user-dot"
                                :style="{ background: dbStatus === 'connected' ? '#00d26a' : '#ff3b3b' }"></span>
                            {{ dbStatus === 'connected' ? 'Succeed Connect' : (dbStatus === 'checking' ? 'Checking...' :
                            'Not Connected') }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 新增人力概览和作战地图按钮 -->

        <div class="hr-section section-2">
            <div class="card-list">
                <div class="card-item">卡片1</div>
                <div class="card-item">卡片2</div>
                <div class="card-item">卡片3</div>
                <div class="card-item">卡片4</div>
            </div>
        </div>

        <div class="hr-section section-3">
            <div class="section3-card-list">
                <div class="section3-card">
                    <div class="cardA-inner">


                        <div class="cardA-row1">
                            <div class="a1-title">
                                <h3>月度趋势</h3>
                            </div>

                            <div ref="chartA1Ref" class="chart-container"
                                style="width: 100%; height: calc(100% - 40px);"></div>
                        </div>





                        <div class="cardA-row2">
                            <div class="cardA-row2-item">
                                <div class="a2-title">
                                    <h3>年龄分布</h3>
                                </div>
                                <div class="a2-chart">
                                    <div ref="agePieRef" style="width: 100%; height: 260px;"></div>
                                </div>



                            </div>





                            <div class="cardA-row2-item">


                                <div class="a3-title">
                                    <h3>职级分布</h3>
                                </div>
                                <div class="a3-chart">
                                    <div ref="levelBarRef" style="width: 100%; height: 100%;"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>






                <div class="section3-card">
                    <div class="cardB-table">表格</div>
                </div>
            </div>
        </div>
        <div class="hr-section section-4">区域4</div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { IconSettings, IconDownload, IconUser, IconHome } from '@arco-design/web-vue/es/icon';
import { useRouter } from 'vue-router';
import { Tooltip as ATooltip } from '@arco-design/web-vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as echarts from 'echarts';

const router = useRouter();

// 动态部门树数据
const treeData = ref([]);
const selectedDept = ref([]);

onMounted(async () => {
    try {
        const res = await fetch('/api/dept-tree');
        const data = await res.json();
        treeData.value = data;
        // 默认选中第一个一级部门
        if (treeData.value.length > 0) {
            selectedDept.value = [treeData.value[0].key];
        }
    } catch (e) {
        treeData.value = [];
    }

    // 初始化图表
    initChart();
});

const activeBtn = ref('overview');
function setActiveBtn(name) {
    activeBtn.value = name;
    if (name === 'map') {
        router.push('/battle-map');
    }
    if (name === 'overview') {
        router.push('/hr-dashboard');
    }
}

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

const chartA1Ref = ref(null);

// 初始化图表函数
function initChart() {
    nextTick(() => {
        if (chartA1Ref.value) {
            const chartA1 = echarts.init(chartA1Ref.value);

            const entryData = [12, 18, 15, 20, 25, 22, 30, 28, 26, 32, 35, 31]; // 入职
            const leaveData = [3, 5, 4, 6, 7, 5, 8, 7, 6, 9, 10, 8]; // 离职
            const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];


            chartA1.setOption({
                title: { text: '', left: 'left', top: 0 },
                tooltip: { trigger: 'axis' },
                legend: { data: ['在职', '离职'], right: 20, top: 10, textStyle: { fontSize: 15, color: '#222' }, itemWidth: 30 },
                grid: { left: 50, right: 30, top: 40, bottom: 40 },
                xAxis: {
                    type: 'category', data: months,
                    axisLabel: { fontSize: 15 },
                    splitLine: { show: false },
                    axisLine: { show: false },
                    axisTick: { show: false }
                },
                yAxis: { type: 'value', name: '人数', axisLabel: { fontSize: 15 }, splitLine: { show: false } },
                series: [
                    {
                        name: '在职',
                        type: 'line',
                        data: entryData,
                        itemStyle: { color: '#222' }, // 黑色
                        lineStyle: { color: '#222', width: 3 },
                        symbol: 'circle',
                        symbolSize: 8
                    },
                    {
                        name: '离职',
                        type: 'line',
                        data: leaveData,
                        itemStyle: { color: '#2257f4' }, // 蓝色
                        lineStyle: { type: 'dashed', color: '#2257f4', width: 3 },
                        symbol: 'circle',
                        symbolSize: 8
                    }
                ]
            });

            // 窗口大小变化时重新渲染图表
            window.addEventListener('resize', () => {
                chartA1.resize();
            });
        }
    });
}





const agePieRef = ref(null);

onMounted(() => {
  nextTick(() => {
    if (agePieRef.value) {
      const chart = echarts.init(agePieRef.value);
      chart.setOption({
        tooltip: { trigger: 'item' },
        legend: { show: false },
        series: [
          {
            name: '年龄分布',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['50%', '40%'], 
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}\n{c}人 ({d}%)', 
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 18,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true,
              length: 20,
              length2: 10
            },
            color: ['#2257f4', '#4e7fff', '#00d26a', '#ffb300', '#ff3b3b'],
            data: [
              { value: 120, name: '18-25岁' },
              { value: 200, name: '26-35岁' },
              { value: 150, name: '36-45岁' },
              { value: 80,  name: '46-55岁' },
              { value: 40,  name: '55岁以上' }
            ]
          }
        ]
      });
      window.addEventListener('resize', () => chart.resize());
    }
  });
});



// 职级分布柱状图

const levelBarRef = ref(null)
let chartInstance = null
const dataArr = [30, 50, 80, 120, 90, 60, 20]
const maxValue = Math.max(...dataArr) + 15
const option = {
    grid: {
    top: 10,
    bottom:20,
    left:30,
    right: 20
  },
  xAxis: {
     type: 'value',
     max: maxValue,
     splitLine: { show: false },
     axisLabel: { show: false }
  },
  yAxis: {
    type: 'category' ,
    
    data: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'],
    axisLabel: { fontSize: 13 },
                    splitLine: { show: false },
                    axisLine: { show: false },
                    axisTick: { show: false }
  },
  series: [
    {
      data: [30, 50, 80, 120, 90, 60, 20], // 这里填你的实际人数
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      },
      label: {
  show: true,           // 显示标签
  position: 'right',      // 标签显示在柱子顶部
  color: '#1d1e21',     // 标签颜色，可自定义
  fontSize: 14,     // 字体大小
  formatter: '{c}人'
},
itemStyle: {
  color: '#3044f2' // 你喜欢的颜色
}
    }
  ]
}

function renderChart() {
  if (!levelBarRef.value) return
  chartInstance = echarts.init(levelBarRef.value)
  chartInstance.setOption(option)
}

function resizeChart() {
  if (chartInstance) {
    chartInstance.resize()
  }
}

onMounted(() => {
  renderChart()
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
  window.removeEventListener('resize', resizeChart)
})

</script>



<style scoped>
.hr-dashboard {
    background: linear-gradient(to bottom, #1f2125 0%, #1f2125 20%, #f3f0f0 20%, #f3f0f0 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 70px;
    /* 顶部导航栏高度，避免内容被遮挡 */
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 100;
    background: #1f2125;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    height: 70px;
    display: flex;
    align-items: center;
}

.custom-nav-row {
    width: 100%;
    height: 100%;
}

.logo-title-group {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: 80px;
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
    margin-right: 80px;
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
}

.user-name {
    font-size: 10px;
    color: #fff;
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

.nav-bar-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 18px;
    min-width: 0;
    height: 70px;
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
    min-width: 80px;
    /* 固定最小宽度，防止抖动 */
    max-width: 100px;
    /* 可选，防止过宽 */
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
    width: 80px;
    /* 固定宽度，保证状态切换时宽度不变 */
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

.nav-selectors {
    border: 2px solid #597ef7;
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
    transition: transform 0.3s cubic-bezier(.4, 0, .2, 1);
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

.section-2 {
    height: 230px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 80px;
    margin-right: 80px;
    margin-top: 20px;
}

.card-list {
    display: flex;
    gap: 16px;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}

.card-item {
    flex: 1;
    min-width: 0;
    height: 190px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #ff3b3b;
}

.section-3 {
    min-height: 510px;
    margin: 0px 80px 0 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #597ef7;
    font-size: 1.2rem;
}

.section-4 {
    border: 2px dashed #ff3b3b;
    min-height: 180px;
    margin: 32px 80px 0 80px;
    border-radius: 8px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff3b3b;
    font-size: 1.2rem;
}

/* 区域3卡片布局与样式 */
.section3-card-list {
    display: flex;
    gap: 16px;
    width: 100%;
    height: 100%;
    justify-content: stretch;
    align-items: stretch;
}

.section3-card {
    flex: 1 1 0;
    min-width: 0;
    max-width: none;
    height: 510px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7c3aed;
    font-size: 1.1rem;
    font-weight: 500;
}

/* 卡片A内部布局 */
.cardA-inner {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 16px;
}

.cardA-row1 {
    background-color: #fff;
    height: 50%;
    overflow: hidden;
}

.cardA-row2 {
    display: flex;
    overflow: hidden;
    gap: 12px;
    height: 50%;
   
}

.cardA-row2-item {
    flex: 1;
    
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.05rem;
    color: #597ef7;
    background: #fff;
}

.cardB-table {
    background-color: #fff;
    height: 100%;
    width: 100%;
}

.a1-title {

    margin-left: 20px;
    margin-top: 10px;

    width: 100%;
    display: flex;


    font-size: 1.0rem;
    color: #394ca2;

}

/* 图表容器样式 */
.chart-container {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    margin-bottom: 0;


}


/* 区域3 a2部分样式 */

.cardA-row2-item {
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  height: 100%; /* 确保容器占满高度 */
}

.a2-title {
    width: 100%;
    padding-left: 20px;
    padding-top: 5px;
    color: #3b4399;
  flex: 0 0 auto; /* 标题不伸缩，保持内容高度 */

}

.a2-chart {
    width: 100%;
  flex: 1 1 auto; /* 图表区域填充剩余空间 */
  min-height: 200px; /* 设置最小高度防止内容溢出 */

  
}


/* 区域3 a3部分样式 */


.a3-title {

    padding-left: 20px;
    padding-top: 5px;
    width: 100%;
    display: flex;
    color: #3b4399;
    
}

.a3-chart {
    width: 100%;
  flex: 1 1 auto; /* 图表区域填充剩余空间 */
  min-height: 200px; /* 设置最小高度防止内容溢出 */

}
</style>