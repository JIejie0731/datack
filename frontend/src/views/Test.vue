<template>
  <div class="test-dashboard-bg">
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
        <a-space class="nav-selectors">
          <a-tree-select v-model="selectedDept" :data="treeData" placeholder="请选择部门" style="width: 220px" />
        </a-space>
        <div class="nav-icons-user">
          <IconHome class="nav-icon" style="cursor:pointer;" @click="goPortfolio" />
          <IconDownload class="nav-icon" @click="downloadDashboardPDF" style="cursor:pointer;" />
          <IconUser class="nav-icon" />
          <div class="user-info">
            <a-tooltip :content="dbStatus === 'connected' ? '数据库已连接' : '数据库未连接'" position="top">
              <span class="user-name ellipsis">PGSQL</span>
            </a-tooltip>
            <span class="user-role">
              <span class="user-dot" :style="{ background: dbStatus === 'connected' ? '#00d26a' : (dbStatus === 'checking' ? '#ffb300' : '#ff3b3b') }"></span>
              {{ dbStatus === 'connected' ? 'Succeed Connect' : (dbStatus === 'checking' ? 'Checking...' : 'Not Connected') }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="content-area area-a">
        <div class="mini-card-list">
          <div v-for="(item, index) in 4" :key="index" class="mini-card card1-flex">
            <div class="card1-indicator">
              <div class="indicator-content">
                <span class="indicator-icon">
                  <template v-if="index === 1">
                    <!-- 离职人数icon -->
                    <svg t="1748451155797" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="38088" width="40" height="40"><path d="M896 962.56h-768c-51.2 0-93.866667-42.666667-93.866667-93.866667v-614.4c0-51.2 42.666667-93.866667 93.866667-93.866666h310.613333c13.653333 0 25.6 11.946667 25.6 25.6s-11.946667 25.6-25.6 25.6H128c-23.893333 0-42.666667 18.773333-42.666667 42.666666v614.4c0 23.893333 18.773333 42.666667 42.666667 42.666667h768c23.893333 0 42.666667-18.773333 42.666667-42.666667v-614.4c0-23.893333-18.773333-42.666667-42.666667-42.666666H585.386667c-13.653333 0-25.6-11.946667-25.6-25.6s11.946667-25.6 25.6-25.6h310.613333c51.2 0 93.866667 42.666667 93.866667 93.866666v614.4c0 52.906667-42.666667 93.866667-93.866667 93.866667z" fill="#333333" p-id="38089"></path><path d="M348.16 535.893333c-54.613333 0-97.28-44.373333-97.28-98.986666 0-54.613333 44.373333-97.28 97.28-97.28s97.28 44.373333 97.28 97.28c1.706667 56.32-42.666667 98.986667-97.28 98.986666z m0-145.066666c-25.6 0-46.08 20.48-46.08 46.08 0 25.6 20.48 47.786667 46.08 47.786666s46.08-20.48 46.08-47.786666c1.706667-23.893333-18.773333-46.08-46.08-46.08zM512 783.36H186.026667c-13.653333 0-25.6-11.946667-25.6-25.6 0-104.106667 85.333333-189.44 189.44-189.44s189.44 85.333333 189.44 189.44c-1.706667 15.36-13.653333 25.6-27.306667 25.6z m-298.666667-51.2h269.653334c-11.946667-63.146667-68.266667-112.64-134.826667-112.64s-122.88 49.493333-134.826667 112.64zM788.48 663.893333c-6.826667 0-13.653333-1.706667-18.773333-6.826666l-151.893334-151.893334c-10.24-10.24-10.24-25.6 0-35.84s25.6-10.24 35.84 0l151.893334 151.893334c10.24 10.24 10.24 25.6 0 35.84-5.12 3.413333-10.24 6.826667-17.066667 6.826666z" fill="#333333" p-id="38090"></path><path d="M636.586667 663.893333c-6.826667 0-13.653333-1.706667-18.773334-6.826666-10.24-10.24-10.24-25.6 0-35.84l151.893334-151.893334c10.24-10.24 25.6-10.24 35.84 0s10.24 25.6 0 35.84l-151.893334 151.893334c-3.413333 3.413333-10.24 6.826667-17.066666 6.826666z" fill="#333333" p-id="38091"></path><path d="M512 317.44c-54.613333 0-98.986667-44.373333-98.986667-98.986667V160.426667c0-54.613333 44.373333-98.986667 98.986667-98.986667s98.986667 44.373333 98.986667 98.986667v58.026666c0 54.613333-44.373333 98.986667-98.986667 98.986667z m0-204.8c-25.6 0-47.786667 22.186667-47.786667 47.786667v58.026666c0 25.6 22.186667 47.786667 47.786667 47.786667s47.786667-22.186667 47.786667-47.786667V160.426667c0-27.306667-22.186667-47.786667-47.786667-47.786667z" fill="#333333" p-id="38092"></path></svg>
                  </template>
                  <template v-else-if="index === 2">
                    <!-- 入职人数icon -->
                    <svg t="1748451785961" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="63303" width="40" height="40"><path d="M119.13216 820.096V263.36256a13.2864 13.2864 0 0 1 13.27616-13.26592h276.736c6.8864 47.34976 47.744 83.85024 96.9728 83.85024s90.10176-36.49536 96.98816-83.85024h285.23008a13.2864 13.2864 0 0 1 13.26592 13.26592v470.45632h56.00768V263.36256c0-38.19008-31.06816-69.2736-69.2736-69.2736h-284.20096V123.91424a27.99616 27.99616 0 0 0-28.0064-28.0064H436.1216a28.0064 28.0064 0 0 0-28.0064 28.0064v70.17472H132.40832c-38.20544 0-69.28384 31.08352-69.28384 69.2736v556.73856c0 38.19008 31.08352 69.2736 69.28384 69.2736h450.66752v-56.00768H132.40832a13.29664 13.29664 0 0 1-13.27616-13.27104zM464.128 151.91552h83.99872V235.9296c0 23.16288-18.8416 42.00448-42.00448 42.00448s-41.99424-18.8416-41.99424-42.00448V151.91552z" fill="#3E3A39" p-id="63304"></path><path d="M559.03744 637.57824l-103.20896-51.57888 26.69056-38.8352a28.02688 28.02688 0 0 0 4.92032-15.86176V449.32608c0-60.86144-48.64-108.544-110.7456-108.544-62.09536 0-110.7456 47.68256-110.7456 108.544v81.97632c0 5.81632 1.80736 11.48928 5.18144 16.2304l27.19744 38.2464-107.73504 51.58912a27.98592 27.98592 0 0 0-15.90272 25.25696v52.0448a28.0064 28.0064 0 0 0 28.0064 28.0064h343.81824a28.00128 28.00128 0 0 0 28.0064-28.0064v-52.0448a28.0064 28.0064 0 0 0-15.48288-25.04704z m-40.52992 49.09056H230.69696v-6.4l121.83552-58.34752a27.97568 27.97568 0 0 0 15.01184-18.24256 28.04224 28.04224 0 0 0-4.29568-23.2448l-41.2928-58.07616V449.32608c0-29.45536 24.0384-52.53632 54.73792-52.53632s54.73792 23.08096 54.73792 52.53632v73.27744l-39.99744 58.19904a28.04224 28.04224 0 0 0-4.03456 22.8608 27.97568 27.97568 0 0 0 14.592 18.048l116.51584 58.22464v6.7328zM737.15712 592.2048c15.47776 0 28.0064-12.53888 28.0064-28.0064s-12.52352-28.0064-28.0064-28.0064H623.36c-15.47776 0-28.0064 12.53888-28.0064 28.0064s12.52352 28.0064 28.0064 28.0064h113.79712zM623.36 417.47968c-15.47776 0-28.0064 12.53888-28.0064 28.0064s12.52352 28.0064 28.0064 28.0064h178.19648a28.00128 28.00128 0 0 0 28.0064-28.0064 27.99616 27.99616 0 0 0-28.0064-28.0064H623.36z" fill="#3E3A39" p-id="63305"></path><path d="M683.40736 830.60224m-58.76736 0a58.76736 58.76736 0 1 0 117.53472 0 58.76736 58.76736 0 1 0-117.53472 0Z" fill="#3E3A39" p-id="63306"></path><path d="M820.51072 830.60224m-58.76736 0a58.76736 58.76736 0 1 0 117.53472 0 58.76736 58.76736 0 1 0-117.53472 0Z" fill="#3E3A39" p-id="63307"></path><path d="M957.60896 830.60224m-58.76736 0a58.76736 58.76736 0 1 0 117.53472 0 58.76736 58.76736 0 1 0-117.53472 0Z" fill="#3E3A39" p-id="63308"></path></svg>
                  </template>
                  <template v-else-if="index === 3">
                    <!-- 转正人数icon -->
                    <svg t="1748452547151" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="71215" width="40" height="40"><path d="M502.4 313.6c35.2 0 67.2-28.8 67.2-67.2V144h-131.2v105.6c-3.2 35.2 25.6 64 64 64z" p-id="71216" fill="#2c2c2c"></path><path d="M889.6 240h-275.2v6.4c0 64-51.2 115.2-115.2 115.2S384 313.6 384 249.6v-9.6H134.4c-22.4 0-41.6 19.2-41.6 41.6v556.8c0 22.4 19.2 41.6 41.6 41.6h755.2c22.4 0 41.6-19.2 41.6-41.6V281.6c0-22.4-19.2-41.6-41.6-41.6zM524.8 732.8H179.2v-51.2l137.6-67.2-44.8-64v-83.2c0-44.8 38.4-80 83.2-80 44.8 0 83.2 35.2 83.2 80v83.2l-44.8 64 131.2 67.2v51.2z m105.6-300.8H800c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6h-166.4c-12.8 0-25.6-12.8-25.6-25.6-3.2-16 9.6-25.6 22.4-25.6z m0 112H736c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6h-105.6c-12.8 0-25.6-12.8-25.6-25.6 0-16 12.8-25.6 25.6-25.6z m169.6 153.6h-166.4c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6H800c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6z" p-id="71217" fill="#2c2c2c"></path></svg>
                  </template>
                  <template v-else>
                    <!-- 在职人数icon -->
                    <svg t="1748449437076" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34389" width="40" height="40"><path d="M966.464 619.712a26.176 26.176 0 0 1-26.176-26.176V273.184c0-23.264-18.912-42.144-42.144-42.144H589.12a26.176 26.176 0 1 1 0-52.32h309.024a94.624 94.624 0 0 1 94.528 94.496v320.352a26.176 26.176 0 0 1-26.208 26.144zM587.712 923.072H127.2a94.624 94.624 0 0 1-94.528-94.56V273.184A94.624 94.624 0 0 1 127.2 178.688h313.184a26.144 26.144 0 1 1 0 52.32h-313.184c-23.264 0-42.176 18.912-42.176 42.144V828.48a42.24 42.24 0 0 0 42.176 42.208h460.544a26.144 26.144 0 1 1-0.032 52.384z" fill="#231815" p-id="34390"></path><path d="M512.64 341.344a98.016 98.016 0 0 1-97.92-97.92v-128.672c0-14.432 11.744-26.176 26.176-26.176h143.456c14.464 0 26.176 11.744 26.176 26.176v128.544a97.984 97.984 0 0 1-97.888 98.048zM467.072 140.96v102.336c0 25.216 20.448 45.696 45.568 45.696 25.12 0 45.536-20.48 45.536-45.568V140.96H467.072zM837.984 479.872h-201.856a26.176 26.176 0 0 1 0-52.384h201.856a26.208 26.208 0 0 1 0 52.384zM758.944 606.976h-122.816a26.176 26.176 0 0 1 0-52.352h122.816a26.144 26.144 0 0 1 0 52.352zM789.888 938.016a25.696 25.696 0 0 1-15.904-5.472l-132.384-101.376a26.176 26.176 0 1 1 31.84-41.568l113.024 86.592 158.944-179.264a26.176 26.176 0 1 1 39.2 34.72l-175.168 197.504a25.92 25.92 0 0 1-19.552 8.864zM458.976 807.68a26.144 26.144 0 0 1-26.176-26.144v-103.2c0-18.048-14.688-32.704-32.736-32.704H295.52c-18.016 0-32.704 14.656-32.704 32.704v103.2a26.176 26.176 0 0 1-52.352 0v-103.2a85.152 85.152 0 0 1 85.088-85.056h104.512a85.184 85.184 0 0 1 85.12 85.056v103.2a26.24 26.24 0 0 1-26.208 26.144zM347.776 551.744c-56.032 0-101.664-45.632-101.664-101.696s45.6-101.696 101.664-101.696 101.664 45.632 101.664 101.696-45.632 101.696-101.664 101.696z m0-151.008a49.344 49.344 0 1 0 0.032 98.56 49.344 49.344 0 0 0-0.032-98.56z" fill="#231815" p-id="34391"></path></svg>
                  </template>
                </span>
                <span class="indicator-number">{{ index === 1 ? '200人' : (index === 2 ? '198人' : (index === 3 ? '134人' : '500人')) }}</span>
                <span class="indicator-label">{{ index === 1 ? '离职人数' : (index === 2 ? '入职人数' : (index === 3 ? '转正人数' : '在职人数')) }}</span>
              </div>
            </div>
            <div class="card1-chart">
              <div :ref="el => cardBarRefs[index] = el" class="card1-bar-chart" style="width: 100%; height: 100%;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-area area-b">
        <div class="b-card-list">
          <div class="b-card b-chart-card">
            <div class="b-charts-grid">
              <BaseCard name="a1" class="b-chart-a1">a1</BaseCard>
              <div class="b-charts-row">
                <BaseCard name="a2" class="b-chart-a2">a2</BaseCard>
                <BaseCard name="a3" class="b-chart-a3">a3</BaseCard>
              </div>
            </div>
          </div>
          <div class="b-card b-table-card">
            <!-- 表格区内容（如el-table） -->
            <div class="b-table-placeholder">表格区</div>
          </div>
        </div>
      </div>
      <div class="content-area area-c">C区内容</div>
      <div class="content-area area-d">D区内容</div>
    </div>
  </div>
</template>

<script setup>
import { IconHome, IconDownload, IconUser } from '@arco-design/web-vue/es/icon';
import { Space as ASpace, TreeSelect as ATreeSelect, Tooltip as ATooltip } from '@arco-design/web-vue';
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as echarts from 'echarts';
import BaseCard from '../components/BaseCard.vue';

const router = useRouter();

// 按钮激活与路由跳转
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

// 首页图标点击
function goPortfolio() {
  router.push('/portfolio');
}

// 下载PDF逻辑
async function downloadDashboardPDF() {
  const el = document.body; // 可根据实际需求替换为主内容ref
  if (!el) return;
  const canvas = await html2canvas(el, { useCORS: true, backgroundColor: null });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('HR-Dashboard.pdf');
}

// 数据库状态逻辑
const dbStatus = ref('checking');
onMounted(async () => {
  try {
    // 可用mock接口或实际接口
    const res = await fetch('/api/db-status');
    const data = await res.json();
    dbStatus.value = data.status === 'connected' ? 'connected' : 'error';
  } catch (e) {
    dbStatus.value = 'error';
  }
});

// 部门筛选器
const selectedDept = ref([]);
const treeData = [
  { key: '1', title: '技术部', children: [ { key: '1-1', title: '前端组' }, { key: '1-2', title: '后端组' } ] },
  { key: '2', title: '产品部' },
  { key: '3', title: '设计部' }
];

// 小卡片图表数据和ref
const cardBarRefs = ref([]);
const card1BarData = [12, 18, 15, 20, 25, 22, 30, 28, 26, 32, 35, 31];
const card1BarMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

onMounted(() => {
  nextTick(() => {
    cardBarRefs.value.forEach((el, idx) => {
      if (el) {
        const chart = echarts.init(el);
        chart.setOption({
          grid: { left: 24, right: 16, top: 24, bottom: 28 },
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function(params) {
              const p = params[0];
              return `${p.axisValue}：${p.data}人`;
            }
          },
          xAxis: {
            type: 'category',
            data: card1BarMonths,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          },
          yAxis: {
            type: 'value',
            name: '',
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          },
          series: [{
            data: card1BarData,
            type: 'bar',
            itemStyle: { color: '#2257f4' },
            barWidth: '60%'
          }]
        });
        window.addEventListener('resize', () => chart.resize());
      }
    });
  });
});
</script>

<style scoped>
.test-dashboard-bg {
  background: linear-gradient(to bottom, #1f2125 0%, #1f2125 20%, #f3f0f0 20%, #f3f0f0 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 70px;
}
.hr-section.section-1.nav-bar-fixed {
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
  border: 2px solid red;
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

.nav-selectors {
  border: 2px solid #597ef7;
  flex-shrink: 0;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 4px;
  padding: 0 8px;
  background: #23242a;
  display: flex;
  align-items: center;
}

/* Arco TreeSelect深色适配 */
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
.user-role {
  font-size: 8px;
  color: #bdbdbd;
  display: flex;
  align-items: center;
  min-width: 0;
  white-space: nowrap;
  text-align: left;
  width: 80px;
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
.main-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 2.575rem;
  margin-left: 4.375rem;
  margin-right: 4.375rem;
  border: 2px solid blue;
}


.area-a {
  border: 2px solid #2257f4;
  height: 11rem;
  width: 100%;
}
.area-b { 
border: 2px solid #00d26a; 
height: 32rem;


}
.area-c { border: 2px solid #ffb300; }
.area-d { border: 2px solid #ff3b3b; }

.mini-card-list {
  display: flex;
  gap: 16px;
  width: 100%;
  height: 100%;
  align-items: stretch;
}
.mini-card {
  flex: 1 1 0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  padding: 0;
}
.card1-flex {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
}
.card1-indicator {
  flex: 1 1 0;
  min-width: 0;
  max-width: none;
  border-right: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #394ca2;
}
.card1-chart {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.card1-bar-chart {
  width: 100%;
  height: 100%;
  min-height: 120px;
}
.indicator-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.indicator-icon {
  margin-bottom: 0.5rem;
}
.indicator-number {
  font-size: 1.6rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 0.2rem;
}
.indicator-label {
  font-size: 1rem;
  color: #666;
}
.b-card-list {
  display: flex;
  flex-direction: row;
  gap: 16px;
  height: 100%;
  margin: 0;
  padding: 0;
}
.b-card {
  flex: 1 1 0;
  background: #fff;
  border-radius: 0;
  box-shadow: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}
.b-chart-placeholder, .b-table-placeholder {
  width: 100%;
  height: 100%;
  color: #bbb;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #fff;
}
.b-charts-grid {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
  width: 100%;
  margin: 0;
  padding: 0;
}
.b-chart-a1 {
  flex: 1 1 0;
  background: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  box-shadow: none;
  border: none;
  width: 100%;
  margin: 0;
  padding: 0;
}
.b-charts-row {
  display: flex;
  flex: 1 1 0;
  gap: 16px;
  height: 0;
  width: 100%;
  margin: 0;
  padding: 0;
}
.b-chart-a2, .b-chart-a3 {
  flex: 1 1 0;
  background: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  box-shadow: none;
  border: none;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>